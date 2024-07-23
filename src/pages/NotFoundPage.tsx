import { Link } from "react-router-dom";
import { FaSearchMinus } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <FaSearchMinus className="text-bue-700 text-5xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-2">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-blue-700 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;