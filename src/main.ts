import 'reflect-metadata';
import {Container} from 'inversify';
import {applicationContainer} from './app/application.container.js';
import Application from './app/application.js';
import {Component} from './types/component.types.js';
import {userContainer} from './modules/user/user.container.js';
import { movieCardContainer } from './modules/movie-card/movie-card.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import { favoriteFilmContainer } from './modules/favorite-film/favorite-film.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  movieCardContainer,
  commentContainer,
  favoriteFilmContainer);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}


bootstrap();
