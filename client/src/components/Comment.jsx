/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import { motion } from "framer-motion";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex p-5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-200"
    >
      <div className="flex-shrink-0 mr-4">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 rounded-full bg-gray-200 ring-2 ring-purple-500/20 object-cover"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-1.5">
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 mr-2 truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <Textarea
              value={editedContent}
              className="w-full resize-none text-sm focus:ring-purple-500 focus:border-purple-500"
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="xs"
                gradientDuoTone="purpleToPink"
                className="font-medium"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="xs"
                color="gray"
                className="font-medium"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 pb-2.5 leading-relaxed">
              {comment.content}
            </p>
            <div className="flex items-center pt-2 text-xs border-t border-gray-100 dark:border-gray-800 max-w-fit gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-xs" />
                {comment.numberOfLikes > 0 && (
                  <span>
                    {comment.numberOfLikes}{" "}
                    {comment.numberOfLikes === 1 ? "like" : "likes"}
                  </span>
                )}
              </motion.button>

              {currentUser &&
                (currentUser._id === comment.userId ||
                  currentUser.isAdmin) && (
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                      onClick={handleEdit}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </motion.button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
