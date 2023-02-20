import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createMovieCard, getErrorMessage } from '../utils/common.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { MovieCardServiceInterface } from '../modules/movie-card/movie-card-service.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import MovieCardService from '../modules/movie-card/movie-card.service.js';
import { MovieCardModel } from '../modules/movie-card/movie-card.entity.js';
import DatabaseService from '../common/database-client/database.service.js';
import { MovieCard } from '../types/movie-card.type.js';
import { getURI } from '../utils/db.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../const.js';

export default class ImportCommand implements CliCommandInterface {

  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private movieCardService!: MovieCardServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService;
    this.userService = new UserService(this.logger, UserModel);
    this.movieCardService = new MovieCardService(this.logger, MovieCardModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveMovieCard(movieCard: MovieCard){
    const user = await this.userService.findOrCreate({
      ...movieCard.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.movieCardService.create({
      ...movieCard,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const card = createMovieCard (line);
    await this.saveMovieCard(card);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
