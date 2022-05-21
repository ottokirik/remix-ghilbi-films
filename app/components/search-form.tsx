import { Form } from '@remix-run/react';

export const SearchForm = () => {
  return (
    <Form reloadDocument className="py-5" method="get">
      <label className="font-bold">
        Search&nbsp;
        <input type="text" name="title" placeholder="Type a title..." className="border-2 rounded py-2 px-3" />
      </label>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 transition-all"
        type="submit"
      >
        Search
      </button>
    </Form>
  );
};
