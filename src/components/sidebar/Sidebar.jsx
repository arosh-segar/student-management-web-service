import {
  faBook,
  faClock,
  faCoffee,
  faLineChart,
  faPieChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  return (
    <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-full w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          Student Management
        </h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <Link
          to="/subjects"
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer ${
            location.pathname.includes("subjects") && "text-blue-900 bg-blue-50"
          }`}
        >
          <div className="grid place-items-center mr-4">
            <FontAwesomeIcon
              className="text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"
              icon={faBook}
            />
          </div>
          Subjects
        </Link>
        <Link
          to="/sessions"
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer ${
            location.pathname.includes("sessions") && "text-blue-900 bg-blue-50"
          }`}
        >
          <div className="grid place-items-center mr-4">
            <i className="fa fa-clock-o text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"></i>
            <FontAwesomeIcon
              className="text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"
              icon={faClock}
            />
          </div>
          Sessions
        </Link>
        <Link
          to="/breaks"
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer ${
            location.pathname.includes("breaks") && "text-blue-900 bg-blue-50"
          }`}
        >
          <div className="grid place-items-center mr-4">
            <i className="fa fa-coffee text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"></i>
            <FontAwesomeIcon
              className="text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"
              icon={faCoffee}
            />
          </div>
          Breaks
        </Link>
        <Link
          to="/report"
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer ${
            location.pathname.includes("reports") && "text-blue-900 bg-blue-50"
          }`}
        >
          <div className="grid place-items-center mr-4">
            <i className="fa fa-pie-chart text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"></i>
            <FontAwesomeIcon
              className="text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"
              icon={faPieChart}
            />
          </div>
          Reports
        </Link>
        <Link
          to="/prediction"
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer ${
            location.pathname.includes("predictions") &&
            "text-blue-900 bg-blue-50"
          }`}
        >
          <div className="grid place-items-center mr-4">
            <i className="fa fa-line-chart text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"></i>
            <FontAwesomeIcon
              className="text-lg mt-1 hover:text-blue-900 focus:text-blue-900 active:text-blue-900"
              icon={faLineChart}
            />
          </div>
          Predictions
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none cursor-pointer"
        >
          <div className="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
