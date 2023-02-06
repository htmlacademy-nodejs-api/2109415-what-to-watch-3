import chalk from 'chalk';
import { MovieCard } from '../types/movie-card.type';

export const printObjectWithChalk = (obj:MovieCard) => {

  console.log(`\n
      ${chalk.magentaBright(`title: ${obj.title}`)}
      ${chalk.red(`description: ${obj.description}`)}
      ${chalk.blue(`postDate: ${obj.postDate}`)}
      ${chalk.bgRed(`genres: ${obj.genre}`)}
      ${chalk.bgBlue(`released: ${obj.released}`)}
      ${chalk.bgYellow(`previewVideoLink: ${obj.previewVideoLink}`)}
      ${chalk.bgMagenta(`videoLink: ${obj.videoLink}`)}
      ${chalk.bgCyan(`staring: ${obj.staring}`)}
      ${chalk.bgWhite(`director: ${obj.director}`)}
      ${chalk.bgRedBright(`runTime: ${obj.runTime}`)}
      ${chalk.bgYellowBright(`posterImage: ${obj.posterImage}`)}
      ${chalk.cyanBright(`backgroundImage: ${obj.backgroundImage}`)}

`);

};
