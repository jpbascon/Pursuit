import { useGoal } from "../context/useGoals.jsx";
import { useStats } from "../context/useGoalStats.jsx";
import { getCategoryIcon } from "../hooks/getCategoryIcon";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import GoalNestedDonut from "../components/GoalNestedDonut.jsx";
import WeeklyTaskCompletion from "../components/WeeklyTaskCompletion.jsx";

export default function Dashboard({ createGoal, setCreateGoal, setExpandedGoalId }) {
  const { goals, refreshGoals } = useGoal();
  const { data, refreshStats } = useStats();
  const handleNavigate = (id) => {
    setTimeout(() => {
      const el = document.getElementById(`goal-${id}`);
      if (!el) return;
      const navbarHeight = 100;
      const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth", });
    }, 350)
    setTimeout(() => {
      setExpandedGoalId(id);
    }, 150)
  };
  useEffect(() => {
    refreshGoals();
    refreshStats();
  }, [createGoal]);
  useEffect(() => {
    setExpandedGoalId(null);
  }, [])
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0"
          onClick={() => { setCreateGoal(false) }}></div>
        <main className={`transition-all duration-200 z-4 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="py-20 pt-40 pl-60 relative z-20">
            <div className="gap-8 max-w-7xl mx-auto flex flex-col relative z-10">
              <div className="bg-neutral-950 rounded-md border-[#333843] border-[2px]">
                <div className="p-8 gap-4 flex flex-col">
                  <h2 className="text-2xl font-bold montserrat-font">Your Progress</h2>
                  <div className="gap-6 grid grid-cols-3">
                    {goals.length === 0 ? (
                      <p>You currently have no activity</p>
                    ) : (
                      goals.map((goal, idx) =>
                      (
                        <div key={idx}
                          className="w-full bg-[#121212] rounded-md">
                          <div className="p-6 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-end gap-4">
                                <h2>{getCategoryIcon(goal.category)}</h2>
                                <p className="font-bold text-xl noto-font">{goal.category}</p>
                              </div>
                              <div className="rounded-2xl border-1 border-neutral-600 content-center size-fit">
                                <p className="noto-font text-sm font-medium text-neutral-300 px-[6px] py-[1px]">
                                  {Number((goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100).toFixed(0)}%
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-width duration-300 bg-neutral-800`}
                                  style={{ width: `${(goal.milestones.filter((m) => m.completed).length / goal.milestones.length) * 100}%` }}
                                />
                              </div>
                              <p className="outfit-font font-medium text-sm text-gray-100">{goal.title}</p>
                            </div>
                            <NavLink to="/goals" key={idx}>
                              <button className="w-full bg-[#333843] rounded-sm text-sm py-3 roboto-font font-bold hover:brightness-80 transition-brightness duration-200"
                                onClick={() => handleNavigate(goal._id)}>
                                View more</button>
                            </NavLink>
                          </div>
                        </div>
                      )
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="gap-8 flex justify-between items-stretch">
                <div className="bg-neutral-950 rounded-md border-[#333843] border-[2px] flex-1">
                  <div className="p-8 gap-4 flex flex-col">
                    {goals.length > 0 ? (
                      <>
                        <h2 className="text-2xl font-bold montserrat-font">Weekly Task Completion</h2>
                        <WeeklyTaskCompletion data={data} />
                      </>
                    ) :
                      (
                        <h2 className="text-2xl font-bold montserrat-font">No Data to show</h2>
                      )}
                  </div>
                </div>
                <div className="bg-neutral-950 rounded-md border-[#333843] border-[2px] flex-1">
                  <div className="p-8 gap-4 flex flex-col h-full">
                    {goals.length > 0 ? (
                      <>
                        <h2 className="text-2xl font-bold montserrat-font">Overall Goal Progress</h2>
                        <GoalNestedDonut data={data} width="100%" height="100%" />
                      </>
                    ) : (
                      <h2 className="text-2xl font-bold montserrat-font">No Data to show</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}