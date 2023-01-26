import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ConfigInterface} from '../common/config/config.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {Component} from '../types/component.types.js';
import {getURI} from '../utils/db.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import { MovieCardServiceInterface } from '../modules/movie-card/movie-card-service.interface.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.MovieCardServiceInterface) private movieCardService: MovieCardServiceInterface,
  ) {}

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    await this.databaseClient.connect(uri);
    // const user = await UserModel.create({
    //   email: 'test@email.local',
    //   avatarPath: 'keks.jpg',
    //   name: 'Keks',
    //   pass: 'test'
    // });
    // const user = await UserModel.create({
    //   email: 'test2@email.local',
    //   avatarPath: 'keks.jpg',
    //   name: 'Kekd',
    //   pass: 'test'
    // });
    // console.log(user, 'user1');
    const card = await this.movieCardService.findById('63cc1f2a1a5a157a2b645cb9');
    console.log(card);
  }
}
