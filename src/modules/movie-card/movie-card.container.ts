import { Container } from 'inversify';
import { MovieCardServiceInterface } from './movie-card-service.interface';
import MovieCardService from './movie-card.service.js';
import { Component } from '../../types/component.types.js';
import { types } from '@typegoose/typegoose';
import { MovieCardEntity, MovieCardModel } from './movie-card.entity.js';

const movieCardContainer = new Container();

movieCardContainer.bind<MovieCardServiceInterface>(Component.MovieCardServiceInterface).to(MovieCardService);
movieCardContainer.bind<types.ModelType<MovieCardEntity>>(Component.MovieCardModel).toConstantValue(MovieCardModel);

export {movieCardContainer};
