import { card } from '../types/cards';
import { sqliteAll, sqliteGet, sqliteRun } from './db-connections';

// create
export const createCard = async (card: card): Promise<void> => {
  await sqliteRun(
    `
    INSERT INTO films (id, name, description, strubboness)
    VALUES (?,?,?,?);
    `,
    [card.id, card.name, card.description, card.strubboness],
  );
};

// update

export const updateCard = async (card: card): Promise<void> => {
  await sqliteRun(
    `
    UPDATE films SET name = ?, description = ?, strubboness = ?
    WHERE id = ?
    `,
    [card.name, card.description, card.strubboness, card.id],
  );
};

// delete

export const deleteCard = async (id: string): Promise<void> => {
  await sqliteRun(
    `
    DELETE FROM films
    WHERE id = ?;
    `,
    [id],
  );
};

// getOne

export const getOneCard = async (id: string): Promise<card | null> => {
  const data = await sqliteGet(
    `
    SELECT * FROM films
    WHERE id = ?;
    `,
    [id],
  );
  if (isCard(data)) {
    return data;
  }

  return null;
};

// getMany

export const getManyCards = async (): Promise<card[]> => {
  const data = await sqliteAll(`SELECT * FROM films`);
  if (!Array.isArray(data)) {
    console.error(`Unknown data format on getMany: ${data}`);
    throw new Error('Unknown data format on getMany');
  }

  return data
    .map((one) => {
      if (isCard(one)) {
        return one;
      }

      return undefined;
    })
    .filter((one) => one !== undefined);
};

const isCard = (data: unknown): data is card => {
  const card = data as card;
  return Boolean(
    card && typeof card === 'object' && card.id && card.description,
  );
};
