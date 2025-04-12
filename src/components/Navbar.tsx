
import React from "react";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-indigo-600 font-bold text-2xl">SpeakSpace</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Faculty Portal
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
