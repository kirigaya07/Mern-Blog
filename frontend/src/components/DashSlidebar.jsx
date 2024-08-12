import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSlidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              {" "}
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={GoSignOut}> Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
