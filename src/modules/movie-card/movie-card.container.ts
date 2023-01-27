import { Container } from 'inversify';
import { MovieCardServiceInterface } from './movie-card-service.interface';
import MovieCardService from './movie-card.service.js';
import MovieCardController from './movie-card.controller.js';
import { Component } from '../../types/component.types.js';
import { types } from '@typegoose/typegoose';
import { MovieCardEntity, MovieCardModel } from './movie-card.entity.js';
import { ControllerInterface } from '../../common/controller/controller.interface';


const movieCardContainer = new Container();

movieCardContainer.bind<MovieCardServiceInterface>(Component.MovieCardServiceInterface).to(MovieCardService);
movieCardContainer.bind<types.ModelType<MovieCardEntity>>(Component.MovieCardModel).toConstantValue(MovieCardModel);
movieCardContainer.bind<ControllerInterface>(Component.MovieCardController).to(MovieCardController).inSingletonScope();
export {movieCardContainer};
