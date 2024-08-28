/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 border-gray-200 bg-white dark:bg-gray-900 shadow-md">
      <Link
        to="/"
        className="flex items-center space-x-2 text-sm sm:text-xl font-semibold text-teal-500 dark:text-teal-300 transition-all hover:text-teal-600 dark:hover:text-teal-400"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-lg text-white shadow-lg">
          Zudo's
        </span>
        <span>Blog</span>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="relative flex-1 max-w-xs mx-4 hidden lg:flex"
      >
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-0 focus:border-teal-600 dark:focus:border-teal-300 shadow-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden"
        color="gray"
        pill
        onClick={() => navigate(`/search?searchTerm=${searchTerm}`)}
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex items-center gap-4 md:order-2">
        <Button
          className="w-12 h-10"
          color="gray"
          onClick={() => dispatch(toggleTheme())}
          pill
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="userAvatar"
                img={currentUser.profilePicture}
                rounded
                className="shadow-none"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                @{currentUser.username}
              </span>
              <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue">Sign In</Button>
            </Link>
            <Navbar.Toggle />
          </div>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          as={"div"}
          className={`text-sm ${
            path === "/"
              ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500"
              : "text-gray-800 dark:text-gray-200"
          } hover:text-teal-600 dark:hover:text-teal-400 transition-all`}
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          as={"div"}
          className={`text-sm ${
            path === "/about"
              ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500"
              : "text-gray-800 dark:text-gray-200"
          } hover:text-teal-600 dark:hover:text-teal-400 transition-all`}
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          as={"div"}
          className={`text-sm ${
            path === "/projects"
              ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500"
              : "text-gray-800 dark:text-gray-200"
          } hover:text-teal-600 dark:hover:text-teal-400 transition-all`}
        >
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
