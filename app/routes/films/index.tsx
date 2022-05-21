import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { fetchAllFilms } from '~/api';

import { useLoaderData } from '@remix-run/react';

import type { Film } from '~/api';
import { SearchForm } from '~/components/search-form';

// SERVER SIDE
export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  const title = url.searchParams.get('title');

  return fetchAllFilms(title);
};

// CLIENT SIDE
const FilmsIndex = () => {
  const films = useLoaderData<Film[]>();

  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      <SearchForm />

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <div key={film.id} className="hover:shadow-2xl hover:scale-105 cursor-pointer transition-all">
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const meta: MetaFunction = () => ({ title: 'Films | Ghilbi Studio' });

export default FilmsIndex;
