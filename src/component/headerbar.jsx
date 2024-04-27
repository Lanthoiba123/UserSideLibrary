import { useState } from "react";
function Headerbar({ toggle, setIsOpen, isOpen }) {
  return (
    <div className="flex bg-blue-500 p-2  rounded z-10 fixed w-screen top-0 left-0">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="p-2 flex flex-col gap-1 "
      >
        <div className="w-7 h-1 bg-gray-600 rounded" />
        <div className="w-7 h-1 bg-gray-600 rounded" />
        <div className="w-7 h-1 bg-gray-600 rounded" />
      </div>
      <div className="ml-auto text-white text-2xl  font-medium flex items-center">
        LIBRARY MANAGEMENT SYSTEM
      </div>

      <img
        className=" ml-auto object-contain h-10"
        src="mtuLogo.png"
        alt="MTU LOGO"
      />
    </div>
  );
}

export default Headerbar;
