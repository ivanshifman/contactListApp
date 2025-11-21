import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl md:text-7xl font-extrabold text-neutral-800 mb-4">
        404
      </h1>

      <p className="text-lg md:text-xl text-neutral-600 mb-8">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition-all"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFoundPage;
