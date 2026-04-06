/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) => {
            return comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {currentUser ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 my-5 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Signed in as:</p>
          <img
            className="h-6 w-6 object-cover rounded-full ring-2 ring-purple-500/30"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            @{currentUser.username}
          </Link>
        </motion.div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400 my-5 flex gap-1">
          You must be signed in to comment.{" "}
          <Link
            className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors hover:underline"
            to={"/sign-in"}
          >
            Sign in
          </Link>
        </div>
      )}

      {currentUser && (
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="border border-purple-200 dark:border-purple-800/50 rounded-xl p-4 bg-white dark:bg-gray-800/50 shadow-sm"
        >
          <Textarea
            placeholder="Share your thoughts..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="resize-none focus:ring-purple-500 focus:border-purple-500"
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              size="sm"
              className="font-medium"
            >
              Post comment
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-4">
              {commentError}
            </Alert>
          )}
        </motion.form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-6 text-gray-400 dark:text-gray-500 italic">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Comments
            </h3>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold">
              {comments.length}
            </span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-medium text-gray-700 dark:text-gray-300">
              Delete this comment?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, delete it
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
