const BASE_URL = 'https://ghibliapi.herokuapp.com';
const FILMS_PATH = '/films';

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
};

export const fetchAllFilms = async (title?: string | null) => {
  const response = await fetch(`${BASE_URL}${FILMS_PATH}`);
  const films: Film[] = await response.json();

  return films.filter((film) => (title ? film.title.toLowerCase().includes(title?.toLowerCase()) : true));
};
