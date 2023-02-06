import { ReleasedYear, RunTime } from '../../const.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItems } from '../../utils/random.js';
import { getRandomItem } from '../../utils/random.js';
import { MovieCardGeneratorInterface } from './movie-card-generator.interface.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class MovieCardGenerator implements MovieCardGeneratorInterface{
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem<string>(this.mockData.genre);
    const released = generateRandomValue(ReleasedYear.Min, ReleasedYear.Max).toString();
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLink);
    const videoLink = getRandomItem<string>(this.mockData.videoLink);
    const staring = getRandomItems<string>(this.mockData.staring).join(';');
    const director = getRandomItem<string>(this.mockData.director);
    const runTime = generateRandomValue(RunTime.Min, RunTime.Max).toString();
    const posterImage = getRandomItem<string>(this.mockData.posterImage);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImage);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = 'user.jpg';
    const name = getRandomItem<string>(this.mockData.name);
    return [
      title, description, postDate, genre, released, previewVideoLink,
      videoLink, staring, director, runTime, posterImage,
      backgroundImage, backgroundColor, email, avatar, name
    ].join('\t');
  }
}
