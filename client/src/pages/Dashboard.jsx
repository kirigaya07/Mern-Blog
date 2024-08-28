/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSlidebar from "../components/DashSlidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import { Spinner } from "flowbite-react";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    setLoading(true); // Show spinner when tab changes
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("dash");
    }

    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSlidebar />
      </div>
      <div className="flex-1 p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            {/* Render the component based on the current tab */}
            {tab === "profile" && <DashProfile />}
            {tab === "posts" && <DashPosts />}
            {tab === "users" && <DashUsers />}
            {tab === "comments" && <DashComments />}
            {tab === "dash" && <DashboardComp />}
          </>
        )}
      </div>
    </div>
  );
}
