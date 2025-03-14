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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex p-5 border-b dark:border-gray-600/30 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
    >
      <div className="flex-shrink-0 mr-4">
        <motion.img
          whileHover={{ scale: 1.1 }}
          className="w-11 h-11 rounded-full bg-gray-200 ring-2 ring-teal-500/20 object-cover"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="font-bold mr-2 text-sm text-gray-800 dark:text-gray-200">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-400 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Textarea
              value={editedContent}
              className="w-full p-3 text-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-teal-500/20 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="tealToLime"
                className="transition-transform hover:scale-105"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="tealToLime"
                outline
                className="transition-transform hover:scale-105"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 dark:text-gray-300 pb-3 leading-relaxed"
            >
              {comment.content}
            </motion.p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700/30 max-w-fit gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={`flex items-center gap-1.5 text-gray-400 hover:text-teal-500 transition-colors ${currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-teal-500"
                  }`}
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
                <span>
                  {comment.numberOfLikes > 0 &&
                    comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
                </span>
              </motion.button>

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <div className="flex gap-3 ml-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="text-gray-400 hover:text-teal-500 transition-colors"
                      onClick={handleEdit}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="text-gray-400 hover:text-red-500 transition-colors"
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
