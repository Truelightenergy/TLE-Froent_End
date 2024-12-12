// page.tsx
"use client";

import React from "react";
import withAuth from "./auth"; 
import SomeComponent from "./authComponent"; 

// Wrap SomeComponent with the HOC
const ProtectedComponent = withAuth(SomeComponent);

// Render the wrapped component
const App: React.FC = () => {
  return (
    <div>
      <ProtectedComponent />
    </div>
  );
};

export default App;
