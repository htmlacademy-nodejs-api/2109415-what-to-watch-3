import { Container } from 'inversify';
import FavoriteFilmService from './favorite-film.service.js';
import { FavoriteFilmEntity, FavoriteFilmModel } from './favorite-film.entity.js';
import {Component} from '../../types/component.types.js';
import { types } from '@typegoose/typegoose';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import { FavoriteFilmController } from './favorite-film.controller.js';


const favoriteFilmContainer = new Container();

favoriteFilmContainer.bind<FavoriteFilmService>(Component.FavoriteFilmServiceInterface).to(FavoriteFilmService).inSingletonScope();
favoriteFilmContainer.bind<types.ModelType<FavoriteFilmEntity>>(Component.FavoriteFilmModel).toConstantValue(FavoriteFilmModel);
favoriteFilmContainer.bind<ControllerInterface>(Component.FavoriteFilmsController).to(FavoriteFilmController).inSingletonScope();

export {favoriteFilmContainer};
