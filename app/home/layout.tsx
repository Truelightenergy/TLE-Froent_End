"use client";

import Navbar from "./navbar";



import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
         return router.push("/login"); // Redirect if no token
      }
    }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      <div className="flex-1 flex flex-col ml-64">
        {/* Notification bar with fixed positioning */}
        <div className="notification-container fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg text-white px-4 z-50">
          <p className="notification-text">
            Breaking News: The floating notifications are now working! Stay tuned for more updates.
          </p>
        </div>

        {/* Scrollable content area */}
        <div className="mt-4 p-4 mx-8 bg-white shadow-md rounded-lg">
          {/* Main content that will scroll */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
