import { readFileSync } from 'fs';
import { MovieCard} from '../../types/moviecard.type.js';
import { Staring} from '../../types/staring.type.js';
import { Genres} from '../../types/genres.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): MovieCard[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, genres, released, rating, previewVideoLink, videoLink, staring, director, runTime, posterImage, backgroundImage, backgroundColor]) => ({
        title,
        description,
        postDate: new Date(postDate),
        genres: <Genres[]>genres.split(';').map((genre) => ({ genre })),
        released: Number.parseInt(released, 10),
        rating: Number.parseInt(rating, 10),
        previewVideoLink,
        videoLink,
        staring: <Staring[]>staring.split(';').map((name) => ({name})),
        director,
        runTime: Number.parseInt(runTime, 10),
        posterImage,
        backgroundImage,
        backgroundColor
      }));
  }
}
