import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {totalUsers}
              </p>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp className="mr-1" />
                  {lastMonthUsers}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  Last month
                </span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
              <HiOutlineUserGroup className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Total Comments
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {totalComments}
              </p>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp className="mr-1" />
                  {lastMonthComments}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  Last month
                </span>
              </div>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full">
              <HiAnnotation className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Total Posts
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {totalPosts}
              </p>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp className="mr-1" />
                  {lastMonthPosts}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  Last month
                </span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
              <HiDocumentText className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Users
              </h2>
              <Button size="sm" gradientDuoTone="purpleToPink">
                <Link to="/dashboard?tab=users">See all</Link>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                >
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Comments
              </h2>
              <Button size="sm" gradientDuoTone="purpleToPink">
                <Link to="/dashboard?tab=comments">See all</Link>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <p className="text-gray-800 dark:text-gray-200 line-clamp-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center text-purple-600 dark:text-purple-400">
                      <HiAnnotation className="w-4 h-4 mr-1" />
                      {comment.numberOfLikes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Posts
              </h2>
              <Button size="sm" gradientDuoTone="purpleToPink">
                <Link to="/dashboard?tab=posts">See all</Link>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/post/${post.slug}`}
                  className="block group"
                >
                  <div className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
