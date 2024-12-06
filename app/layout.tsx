import '../styles/globals.css'; // Import global styles
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="animated-background"></div> {/* Add the animated background */}
        {children} {/* Render child components */}
      </body>
    </html>
  );
};

export default Layout;
