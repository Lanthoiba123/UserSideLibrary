import { useState } from "react";
import { FaTh, FaBars, FaUserAlt } from "react-icons/fa";
import { BsBookFill } from "react-icons/bs";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 } from "uuid";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/books",
      name: "Books",
      icon: <BsBookFill />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/librarian",
      name: "Librarian",
      icon: <HiMiniBuildingLibrary />,
    },
    // {
    //   path: "/login",
    //   name: "Logout",
    //   icon: <IoLogOut />,
    //   position: 'bottom'
    // },
  ];
  return (
    // <div className="container">
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isOpen ? "180px" : "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="sidebar"
        >
          <div className="top_section">
            {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1> */}
            <img
              style={{ display: isOpen ? "block" : "none" }}
              className="logo"
              src="mtuLogo.png"
              alt="MTU Logo"
            />
            <div
              style={{ marginLeft: isOpen ? "40px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {menuItem.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={v4()}
                  className="link"
                  style={{
                    alignSelf:
                      item?.position === "bottom" ? "flex-end" : "flex-start",
                  }}
                  // activeclassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="flex justify-center text-2xl h-10">
              <button type="button">
                <IoLogOut />
              </button>
            </div>
          </nav>
        </div>
        <ScrollArea className="h-[100svh] flex-1  ">
          <Outlet />
        </ScrollArea>
      </div>
    </>

    // </div>
  );
};

export default Sidebar;
