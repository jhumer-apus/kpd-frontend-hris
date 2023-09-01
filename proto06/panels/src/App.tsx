import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
// Authentication Related Imports
import useAuth from "./custom-hooks/use-auth";
import LoadingComponent from "./widgets/layout/custom-effects/LoadingComponent/LoadingComponent";

function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Navigate to="/home"/> : <Auth/>} />
      <Route path="/home/*" element={ isAuthenticated ? <Dashboard/> : <Auth/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
