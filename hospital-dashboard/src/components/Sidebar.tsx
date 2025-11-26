import React from 'react';
import logo from "../assets/images/logo.png"
import { MdDashboard } from "react-icons/md";
import { IoIosCard } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
// Sidebar items definition
const navItems = [
  { name: 'Dashboard', icon: <MdDashboard size={24}/>, active: false },
  { name: 'Hospitals', icon: <MdDashboard size={24}/>, active: true },
  { name: 'Billing', icon: <IoIosCard size={24}/>, active: false },
  { name: 'Profile', icon: <FaUser size={24}/>, active: false },
  { name: 'Settings', icon: <IoMdSettings size={24}/> , active: false },
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-[300px] bg-[#1f1f1f]  shadow-2xl z-20">

      <div className="my-10 mx-5 flex items-center">
    <img src={logo} className='h-35' alt="" />
      </div>


      <nav className="space-y-2">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 transition duration-150 cursor-pointer 
                        ${item.active ? 'bg-sidebar-active bg-[#2A2A2A] text-white  ' : 'text-[#807F7F]  hover:bg-surface-medium'}`
            }
          >
            <span className="text-lg mr-5">{item.icon}</span>
            <span className='mt-0.5 text-lg'>{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;