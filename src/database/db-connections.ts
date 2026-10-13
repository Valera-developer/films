import { Database, PROTOCOL } from 'sqlite3';
import { SQLITE_PATH } from '../config';

const db = new Database(SQLITE_PATH, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('database connected');
});

// run выполнить команду в бд
// get получить строку из таблицы
// all чтобы достать много строк таблицы

export const sqliteRun = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
};

export const sqliteGet = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
};

export const sqliteAll = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
};

db.run(
  `
    CREATE TABLE films (
         id TEXT PRIMARY KEY,
         name TEXT NOT NULL,
         description TEXT NOT NULL,
         strubboness TEXT NOT NULL
 );
`,
  [],
  (error: unknown, data: unknown) => {},
);
