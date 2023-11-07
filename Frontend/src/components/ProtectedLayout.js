import React, { useState, useEffect, Suspense } from "react";
// import NavbarHeader from "./NavbarHeader";
import { useNavigate } from "react-router-dom";

// import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
// import useIdleTimer from "../../Common/customHooks/useIdleTimerHook";
// import Loader from "../../Common/Loader";
// import JiraIssueCollector from "../../Common/IssueCollector";

function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = window.localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    }
  }, []);
 

 
  return (
    <div >
    
      <div className="LayoutDiv">
   
       
        <div className="col main-Content">
          
          <Suspense fallback={<p>Loading....</p>}>
       

            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Layout;
