import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import { MdDashboard } from "react-icons/md";
import { IoIosCard } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

// Sidebar items definition
const navItems = [
  { name: 'Dashboard', icon: <MdDashboard size={24} />, active: false },
  { name: 'Hospitals', icon: <MdDashboard size={24} />, active: true },
  { name: 'Billing', icon: <IoIosCard size={24} />, active: false },
  { name: 'Profile', icon: <FaUser size={24} />, active: false },
  { name: 'Settings', icon: <IoMdSettings size={24} />, active: false },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Icon */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-[#1f1f1f] rounded-lg text-white"
      >
        <RxHamburgerMenu size={24} />
      </button>

      {/* Overlay (for mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-20"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 min-h-screen w-[260px] bg-[#1f1f1f] shadow-2xl z-30
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="my-10 mx-5 flex items-center">
          <img src={logo} className="h-30" alt="Logo" />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center p-3 transition duration-150 cursor-pointer 
                ${item.active
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-[#807F7F] hover:bg-[#2A2A2A]'
                }
              `}
            >
              <span className="text-lg mr-5">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
