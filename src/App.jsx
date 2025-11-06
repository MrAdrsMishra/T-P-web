import React from "react";
import LandingPage from "./pages/Landing Page/LandingPage.jsx";
import { Suspense } from "react";
function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    </div>
  );
}

export default App;
