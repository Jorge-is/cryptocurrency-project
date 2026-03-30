import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import "./AppLayout.css";

function AppLayout() {
  const { session } = useContext(UserContext);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
