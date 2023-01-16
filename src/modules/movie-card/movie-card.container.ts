import { Container } from 'inversify';
import { MovieCardServiceInterface } from './movie-card-service.interface';
import MovieCardService from './movie-card.service';
import { Component } from '../../types/component.types';
import { types } from '@typegoose/typegoose';
import { MovieCardEntity, MovieCardModel } from './movie-card.entity';

const movieCardContainer = new Container();

movieCardContainer.bind<MovieCardServiceInterface>(Component.MovieCardInterface).to(MovieCardService);
movieCardContainer.bind<types.ModelType<MovieCardEntity>>(Component.MovieCardModel).toConstantValue(MovieCardModel);

export {movieCardContainer};
