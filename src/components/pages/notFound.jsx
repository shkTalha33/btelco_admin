import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center flex items-center justify-center flex-col">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text_primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Page Not Found.
          </p>
          <p className="mb-4 text-lg font-light text_secondary">
            Sorry, we can't find that page. You'll find lots to explore on the dashboard page.
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg_primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-[1rem] py-[0.6rem] text-center dark:focus:ring-primary-900 my-4 no-underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
