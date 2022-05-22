import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { Film } from '~/api';
import { postComment } from '~/api';
import { fetchFilmById } from '~/api';
import Character from '~/components/characters';
import { Comments } from '~/components/comments';
import FilmBanner from '~/components/film-banner';

export const meta: MetaFunction = ({ data }) => ({ title: `${data.title} | Studio Ghibli Film` });

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.filmId, 'expected params.filmId');

  const body = await request.formData();

  const comment = {
    name: body.get('name') as string,
    message: body.get('message') as string,
    filmId: params.filmId,
  };

  const errors = { name: '', message: '' };

  if (!comment.name) {
    errors.name = 'Please provide your name';
  }

  if (!comment.message) {
    errors.message = 'Please provide a comment';
  }

  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    return { errors, values };
  }

  await postComment(comment);

  return redirect(`/films/${params.filmId}`);
};

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
          <Character characters={film.characters} />

          <div className="flex-1 flex flex-col justify-between">
            <Outlet />
            <Comments filmId={film.id} comments={film.comments || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
