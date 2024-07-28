/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-row h-screen max-h-screen">
      <div className="w-[20%] h-screen max-h-screen">
        <Sidebar />
      </div>
      <div className="w-[80%] p-10 h-screen max-h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
