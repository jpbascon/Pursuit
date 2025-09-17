import Sidebar from "../pages/Sidebar";
import GoalOverlay from "../pages/GoalOverlay";
import { Outlet } from "react-router-dom"

export default function AppLayout({ setIsLoggedIn, createGoal, setCreateGoal }) {
  return (
    <div className="flex">
      <Sidebar setIsLoggedIn={setIsLoggedIn} createGoal={createGoal} />
      <div className="flex-grow">
        <Outlet />
        {createGoal && (
          <GoalOverlay createGoal={createGoal} setCreateGoal={setCreateGoal} />
        )}
      </div>
    </div>
  );
}