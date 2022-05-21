const BASE_URL = 'https://ghibliapi.herokuapp.com';
const FILMS_PATH = '/films';

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string | undefined;
  age?: string | undefined;
  eye_color?: string | undefined;
  hair_color?: string | undefined;
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
    film.people.filter((url) => url !== `${BASE_URL}/people`).map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters };
};
