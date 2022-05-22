const BASE_URL = 'https://ghibliapi.herokuapp.com';
const FILMS_PATH = '/films';
const CHARACTER_PATH = '/people';

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string | undefined;
  age?: string | undefined;
  eye_color?: string | undefined;
  hair_color?: string | undefined;
};

export type CommentEntry = {
  name: string;
  message: string;
  filmId: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters: FilmCharacter[];
  comments: CommentEntry[];
};

export const fetchAllFilms = async (title?: string | null): Promise<Film[]> => {
  const response = await fetch(`${BASE_URL}${FILMS_PATH}`);
  const films: Film[] = await response.json();

  return films.filter((film) => (title ? film.title.toLowerCase().includes(title?.toLowerCase()) : true));
};

export const fetchFilmById = async (filmId: string): Promise<Film> => {
  const response = await fetch(`${BASE_URL}${FILMS_PATH}/${filmId}`);
  const film: Film = await response.json();

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== `${BASE_URL}${CHARACTER_PATH}`)
      .map((url) => fetch(url).then((res) => res.json()))
  );

  const comments = await fetchCommentsByFilmId(filmId);

  return { ...film, characters, comments };
};

export const fetchFilmCharacter = async (characterId: string): Promise<FilmCharacter> => {
  const response = await fetch(`${BASE_URL}${CHARACTER_PATH}/${characterId}`);

  if (!response.ok) throw response;

  return response.json();
};

const COMMENTS_URL = 'http://localhost:4000/comments';

export const fetchCommentsByFilmId = async (filmId: string): Promise<CommentEntry[]> => {
  const response = await fetch(`${COMMENTS_URL}?filmId=${filmId}`);

  return response.json();
};

export const postComment = async (comment: CommentEntry): Promise<CommentEntry> => {
  const response = await fetch(COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
