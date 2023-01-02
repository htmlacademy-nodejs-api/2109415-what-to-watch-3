import { appendFile } from 'fs/promises';
import got from 'got';
import { MockData } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import MovieCardGenerator from '../common/movie-card-generator/movie-card-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const movieCardCount = Number.parseInt(count, 10);


    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const movieCardGeneratorString = new MovieCardGenerator(this.initialData);

    for (let i = 0; i < movieCardCount; i++) {
      await appendFile(filepath, `${movieCardGeneratorString.generate()}\n`, 'utf8');
    }
    console.log(`File ${filepath} was created`);
  }
}
