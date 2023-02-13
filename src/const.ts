export const textColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];

export const genres = ['Comedy', 'Crime', 'Documentary', 'Drama', 'Horror', 'Family', 'Romance', 'Scifi', 'Thriller'];

export const RATING_COUNT = 10;

export const MAXIMUM_FILMS_COUNT = 60;

export enum ReleasedYear {
  Min = 1880,
  Max = 2022,
}

export enum RunTime {
  Min = 30,
  Max = 200,
}

export enum UserName {
  Min = 1,
  Max = 15,
}

export enum UserPassword {
  Min = 6,
  Max = 12,
}

export enum FilmTitle {
  Min = 2,
  Max = 100,
}

export enum FilmDescription {
  Min = 20,
  Max = 1024,
}

export enum FilmDirector {
  Min = 2,
  Max = 50,
}

export const PosterFormats = ['.ipg'];

export const BackgroungFormats = ['.jpj'];

export enum CommentText {
  Min = 5,
  Max = 1024,
}
