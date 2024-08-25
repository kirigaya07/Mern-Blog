/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);

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
          setRecentPost(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading post.</div>
      ) : (
        <>
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
          <div className="max-w-4xl mx-auto w-full ">
            <CallToAction />
          </div>
          <CommentSection postId={post && post._id} />

          <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="flex flex-wrap justify-center gap-5 mt-5 w-full">
              {recentPost &&
                recentPost.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
