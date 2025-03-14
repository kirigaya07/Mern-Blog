/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 20px 80px rgba(0, 128, 128, 0.15)",
        transition: { duration: 0.4 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative w-full h-[400px] overflow-hidden rounded-xl border-2 border-teal-500/30 sm:w-[430px] shadow-xl bg-gradient-to-br from-white via-teal-50/30 to-white dark:from-gray-800 dark:via-teal-900/10 dark:to-gray-900"
    >
      <Link to={`/post/${post.slug}`} className="block h-full">
        {/* Image Section with Enhanced Parallax and Fade */}
        <motion.div
          className="relative h-[260px] w-full overflow-hidden rounded-t-xl"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            src={post.image}
            alt="post cover"
            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
        </motion.div>

        {/* Content Section with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-5 flex flex-col gap-4 relative"
        >
          {/* Category Tag with Glass Effect */}
          <motion.span
            className="self-start px-4 py-1.5 text-xs font-semibold text-white bg-teal-500/90 rounded-full shadow-lg backdrop-blur-sm dark:bg-teal-600/90"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {post.category}
          </motion.span>

          {/* Title with Enhanced Typography */}
          <motion.h2
            className="text-xl font-bold line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {post.title}
          </motion.h2>

          {/* Animated Divider */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-teal-500 to-teal-300 group-hover:from-teal-600 group-hover:to-teal-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
