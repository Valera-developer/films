import express, { Request, Response } from 'express';
import { card, CreateCardRequest, GetCardsResponse } from '../types/cards';
import { IdParams } from '../types/cards/common';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  (request: Request<{}, {}>, response: Response<GetCardsResponse>) => {},
);

cardsRouter.get(
  '/:id',
  (request: Request<IdParams, {}>, response: Response<card>) => {
    // TODO return cards
  },
);

cardsRouter.post('/', (request: Request<{}, CreateCardRequest>) => {
  // TODO create cards
});

cardsRouter.put(
  '/:id',
  (request: Request<IdParams, card>, response: Response<card>) => {
    // TODO update cards
  },
);

cardsRouter.delete(
  '/:id',
  (request: Request<IdParams>, response: Response<void>) => {
    // TODO delete cards
  },
);
