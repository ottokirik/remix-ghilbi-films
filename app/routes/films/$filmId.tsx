import type { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { Film } from '~/api';
import { fetchFilmById } from '~/api';
import CharacterList from '~/components/characters';
import FilmBanner from '~/components/film-banner';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, 'expected params.filmId');

  const film = await fetchFilmById(params.filmId);

  return film;
};

const FilmDetails = () => {
  const film = useLoaderData<Film>();

  return (
    <div>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>

        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />

          <div className="flex-1 flex flex-col justify-between">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
