import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Element is considered in view when 10% is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      ref={ref}
      variants={containerVariants}
      className="flex flex-col gap-6 p-28 px-3"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl font-bold lg:text-6xl"
      >
        Welcome to my Blog
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-gray-500 text-xs sm:text-sm"
      >
        Here you will find a variety of articles and tutorials on topics such as
        web development, software engineering, and programming languages.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="p-3 bg-amber-100 dark:bg-slate-700"
      >
        <CallToAction />
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7"
      >
        {posts && posts.length > 0 && (
          <div>
            <h1 className="text-2xl font-semibold text-center">Recent Posts</h1>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
