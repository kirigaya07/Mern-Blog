/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const modules = {
    toolbar: false,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Error loading post
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We couldn't load the post you're looking for.
          </p>
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/10 dark:from-purple-600/20 dark:to-blue-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <Link
              to={`/search?category=${post?.category}`}
              className="inline-block mb-6"
            >
              <Button
                gradientDuoTone="purpleToPink"
                size="sm"
                className="rounded-full"
              >
                {post?.category}
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post?.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{(post?.content.length / 1000).toFixed(0)} mins read</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <motion.div
        variants={itemVariants}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <ReactQuill
            value={post?.content}
            readOnly={true}
            theme="snow"
            modules={modules}
            className="post-content text-lg leading-relaxed text-gray-900 dark:text-gray-100"
          />
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <CallToAction />
      </motion.div>

      {/* Comments Section */}
      <motion.div
        variants={itemVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <CommentSection postId={post?._id} />
      </motion.div>

      {/* Recent Articles */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover more interesting content
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </motion.div>
    </motion.main>
  );
}
