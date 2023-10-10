import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix tutorial 2023" },
    { name: "description", content: "Welcome to my tutorial" },
  ];
};

export const loader = async () => {
  const url = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  return json(await url.json());
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Moves
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((movie: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-lg  border bg-white"
            >
              <Link
                prefetch="intent"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                to={`movie/${movie.id}/comments`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <Link
                    to={`movie/${movie.id}/comments`}
                    prefetch="intent"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    {movie.title}
                  </Link>
                </h2>

                <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
