
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <div className={`h-full fixed top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300`}>
      <aside className="w-64 h-full flex flex-col items-center justify-start shadow-md p-4 bg-white">
        <button
          className="lg:hidden p-2 text-black hover:text-gray-700 self-end"
          onClick={toggle}
        >
          ✕
        </button>
        <nav className="space-y-7 w-full mt-10 pt-10 h-full">
          <NavLink to='/subscription' className="flex items-center text-gray-700 hover:text-orange-500 hover:bg-gray-100 p-2 pr-10 rounded-md rounded-r-none">
            <i className="fas fa-bookmark mr-2"></i> My Subscription
          </NavLink>
          <NavLink to="/favourites" className="flex items-center text-gray-700 hover:text-orange-500 hover:bg-gray-100 p-2 pr-3 rounded-md rounded-r-none">
            <i className="fas fa-heart mr-2"></i> My Videos
          </NavLink>
          {/* <NavLink to="/account-info" className="flex items-center text-gray-700 w-full hover:text-orange-500 hover:bg-gray-100 p-2 pr-3 rounded-md rounded-r-none">
            <i className="fas fa-user mr-2"></i> Account Information
          </NavLink> */}
          <hr />
          <NavLink to="/logout" className="flex items-center text-gray-700 hover:text-orange-500 hover:bg-gray-100 p-2 pr-3 rounded-md rounded-r-none">
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
