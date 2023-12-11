import { Outlet } from "react-router-dom";

import TopBar from "../components/topbar";
import SideBar from "../components/sidebar";

export default function Main() {
  return (
    <div id="app" className="w-full h-full flex flex-col text-slate-900">
      <TopBar />

      <div id="main" className="flex-grow flex flex-row">
        <SideBar />

        <div id="content" className="flex-grow h-full p-4 bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
