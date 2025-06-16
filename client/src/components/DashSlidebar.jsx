import { Sidebar } from "flowbite-react";
import {
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { motion } from "framer-motion";

export default function DashSlidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Sidebar className="h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={
                  currentUser.profilePicture ||
                  "https://ui-avatars.com/api/?name=User&background=8B5CF6&color=fff"
                }
                alt={currentUser.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentUser.username}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser.isAdmin ? "Administrator" : "User"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            <div className="space-y-1">
              {currentUser && currentUser.isAdmin && (
                <Link to="/dashboard?tab=dash">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div
                      className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg ${
                        tab === "dash" || !tab
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : ""
                      }`}
                    >
                      <HiChartPie className="w-6 h-6 mr-3" />
                      <span>Dashboard</span>
                    </div>
                  </motion.div>
                </Link>
              )}

              <Link to="/dashboard?tab=profile">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div
                    className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg ${
                      tab === "profile"
                        ? "bg-purple-100 dark:bg-purple-900/30"
                        : ""
                    }`}
                  >
                    <HiUser className="w-6 h-6 mr-3" />
                    <span>Profile</span>
                  </div>
                </motion.div>
              </Link>

              {currentUser.isAdmin && (
                <>
                  <Link to="/dashboard?tab=posts">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div
                        className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg ${
                          tab === "posts"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : ""
                        }`}
                      >
                        <HiDocumentText className="w-6 h-6 mr-3" />
                        <span>Posts</span>
                      </div>
                    </motion.div>
                  </Link>

                  <Link to="/dashboard?tab=users">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div
                        className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg ${
                          tab === "users"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : ""
                        }`}
                      >
                        <HiOutlineUserGroup className="w-6 h-6 mr-3" />
                        <span>Users</span>
                      </div>
                    </motion.div>
                  </Link>

                  <Link to="/dashboard?tab=comments">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div
                        className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg ${
                          tab === "comments"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : ""
                        }`}
                      >
                        <HiAnnotation className="w-6 h-6 mr-3" />
                        <span>Comments</span>
                      </div>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button
                onClick={handleSignOut}
                className="flex items-center w-full p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg"
              >
                <GoSignOut className="w-6 h-6 mr-3" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </div>
        </div>
      </Sidebar>
    </motion.div>
  );
}
