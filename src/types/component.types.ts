export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  MovieCardServiceInterface: Symbol.for('MovieCardServiceInterface'),
  MovieCardModel: Symbol.for('MovieCardModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  MovieCardController: Symbol.for('MovieCardController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  UserController: Symbol.for('UserController'),
  FavoriteFilmServiceInterface: Symbol.for('FavoriteFilmServiceInterface'),
  FavoriteFilmModel: Symbol.for('FavoriteFilmModel'),
  FavoriteFilmsController: Symbol.for('FavoriteFilmsController'),
  CommentController: Symbol.for('CommentController'),
} as const;
