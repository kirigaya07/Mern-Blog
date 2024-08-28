/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-lg hover:shadow-xl">
      <Link to={`/post/${post.slug}`} className="block h-full">
        <div className="relative h-[260px] w-full overflow-hidden">
          <img
            src={post.image}
            alt="post cover"
            className="h-full w-full object-cover transition-transform duration-300 z-20 group-hover:scale-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>
        <div className="p-4 flex flex-col gap-3 bg-white dark:bg-gray-900 transition-all">
          <p className="text-lg font-semibold line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-teal-600 transition-colors duration-300">
            {post.title}
          </p>
          <hr className="border-t-2 border-teal-500 group-hover:border-teal-600 transition-colors duration-300" />
          <span className="italic text-sm text-gray-500 dark:text-gray-400">
            {post.category}
          </span>
        </div>
      </Link>
    </div>
  );
}
