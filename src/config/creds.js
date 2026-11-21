import fs from 'node:fs';
import path from 'node:path';

const CREDS_FILE = path.resolve(process.cwd(), '.auth', 'creds.json');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readStored() {
  if (fs.existsSync(CREDS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CREDS_FILE, 'utf8'));
    } catch {
      // битый файл — игнорируем
    }
  }
  if (process.env.VIKUNJA_USER && process.env.VIKUNJA_PASSWORD) {
    return {
      username: process.env.VIKUNJA_USER,
      email: process.env.VIKUNJA_EMAIL || '',
      password: process.env.VIKUNJA_PASSWORD,
    };
  }
  return null;
}

function freshUser() {
  const id = Date.now().toString(36) + Math.floor(Math.random() * 10000);
  return {
    username: `qa_${id}`,
    email: `qa_${id}@example.com`,
    password: process.env.VIKUNJA_FRESH_PASSWORD || 'Aa123456!',
  };
}

async function tryLogin(baseURL, creds) {
  try {
    const resp = await fetch(`${baseURL}/api/v1/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: creds.username, password: creds.password }),
    });
    return resp.status;
  } catch {
    return 0; // сетевая ошибка
  }
}

export async function ensureUser(baseURL) {
  // 1) пробуем существующие креды — вдруг ещё живы
  const stored = readStored();
  if (stored) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const status = await tryLogin(baseURL, stored);
      if (status === 200) return stored;
      if (status >= 400 && status < 500 && status !== 429) break; // юзер стёрся — регистрируем нового
      await sleep(20000 * attempt); // 429 или сеть — ждём
    }
  }

  // 2) старые не работают — регистрируем нового, с ретраями на 429
  for (let attempt = 1; attempt <= 5; attempt++) {
    const creds = freshUser();
    try {
      const resp = await fetch(`${baseURL}/api/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });
      if (resp.status === 429) {
        await sleep(30000 * attempt);
        continue;
      }
      if (resp.ok) {
        fs.mkdirSync(path.dirname(CREDS_FILE), { recursive: true });
        fs.writeFileSync(CREDS_FILE, JSON.stringify(creds, null, 2));
        return creds;
      }
      if (resp.status === 409) continue; // имя занято — почти невероятно, берём следующее
      throw new Error(`Регистрация не удалась: HTTP ${resp.status} ${await resp.text()}`);
    } catch (e) {
      if (e.message.startsWith('Регистрация не удалась')) throw e;
      await sleep(20000 * attempt);
    }
  }
  throw new Error('Не удалось зарегистрировать пользователя: стенд отвечает 429. Подождите 30–60 минут и запустите снова.');
}

// для Page Object'ов и фасада: креды текущего прогона
export function getCreds() {
  if (fs.existsSync(CREDS_FILE)) {
    return JSON.parse(fs.readFileSync(CREDS_FILE, 'utf8'));
  }
  return {
    username: process.env.VIKUNJA_USER,
    password: process.env.VIKUNJA_PASSWORD,
  };
}
