import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Profile } from "./pages/dashboard";


function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(true);
  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Navigate to="/home"/> : <Auth />} />
      <Route path="/home/*" element={ isAuthenticated ? <Dashboard/> : <Auth />} />
      <Route path="/employee/*" element={<Dashboard />} />
      {/* <Route path="/profile/*" element={<Profile />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
