import express, { Request, Response } from 'express';
import { card, CreateCardRequest, GetCardsResponse } from '../types/cards';
import { IdParams } from '../types/cards/common';
import {
  createCard,
  deleteCard,
  getManyCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  async (request: Request<{}, {}>, response: Response<GetCardsResponse>) => {
    const cards = await getManyCards();
    response.send(cards);
  },
);

cardsRouter.get(
  '/:id',
  async (request: Request<IdParams, {}>, response: Response<card>) => {
    const card = await getOneCard(request.params.id);

    if (!card) {
      return response.sendStatus(404);
    }

    response.send(card);
  },
);

cardsRouter.post(
  '/',
  async (
    request: Request<{}, card, CreateCardRequest>,
    response: Response<card>,
  ) => {
    const card: card = {
      id: request.body.id,
      name: request.body.name,
      description: request.body.description,
      strubboness: request.body.strubboness,
    };

    await createCard(card);

    response.send(card);
  },
);

cardsRouter.put(
  '/:id',
  async (
    request: Request<IdParams, card, CreateCardRequest>,
    response: Response<card>,
  ) => {
    const card = {
      id: request.params.id,
      name: request.body.name,
      description: request.body.description,
      strubboness: request.body.strubboness,
    };

    await updateCard(card);

    response.send(card);
  },
);

cardsRouter.delete(
  '/:id',
  async (request: Request<IdParams>, response: Response<void>) => {
    await deleteCard(request.params.id);
    response.sendStatus(204);
  },
);
