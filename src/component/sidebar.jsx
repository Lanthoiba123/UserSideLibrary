import { useState } from "react";
import { FaTh, FaBars, FaUserAlt } from "react-icons/fa";
import { BsBookFill } from "react-icons/bs";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCodePullRequest } from "react-icons/fa6";
import { v4 } from "uuid";
import Headerbar from "./headerbar";

const Sidebar = ({ setIsOpen, isOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Books",
      icon: <BsBookFill size={27} />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh size={27} />,
    },
    {
      path: "/bookrequest",
      name: "Requisition",
      icon: <FaCodePullRequest size={27} />,
    },
    {
      path: "/librarian",
      name: "Librarian",
      icon: <HiMiniBuildingLibrary size={27} />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt size={27} />,
    },
  ];
  return (
    <>
      <div className="flex">
        <div
          // style={{
          //   width: isOpen ? "160px" : "55px",
          // }}
          className={`sidebar overflow-hidden  ${
            isOpen ? "w-[160px] flex items-start " : "w-[55px] hidden sm:flex"
          }  flex-col items-start `}
        >
          <nav className="flex flex-col gap-1 items-center text-[24px] flex-1">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={v4()}
                className={`link w-full items-center ${
                  !isOpen && "self-start"
                }`}

                // activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}

            <button
              className="mt-auto mb-5 link self-start items-center w-full"
              type="button"
            >
              <IoLogOut size={27} />
              <div className="link_text">Logout</div>
            </button>
          </nav>
        </div>
        <ScrollArea className="h-[100svh] flex-1  ">
          <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
          <Outlet />
        </ScrollArea>
      </div>
    </>

    // </div>
  );
};

export default Sidebar;
