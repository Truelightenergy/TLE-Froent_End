"use client"

import '../styles/globals.css'; // Import global styles
import { ReactNode } from 'react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  const router = useRouter();
  
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
         return router.push("/login"); 
      }
    }, [router]);

  return (
    <html lang="en">
      <body>
        <div className="animated-background"></div> 
        {children} 
      </body>
    </html>
  );
};

export default Layout;
