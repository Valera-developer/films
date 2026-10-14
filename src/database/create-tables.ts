import { sqliteRun } from './db-connections';

export const createTables = async (): Promise<void> => {
  await sqliteRun(`
        CREATE TABLE IF NOT EXISTS films (
         id TEXT PRIMARY KEY,
         name TEXT NOT NULL,
         description TEXT NOT NULL,
         strubboness TEXT NOT NULL
        );
        `);
};
