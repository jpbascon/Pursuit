import { useGoal } from "../hooks/useGoals.jsx";
import { getCategoryIcon } from "../hooks/getCategoryIcon";
import { useEffect } from "react";

export default function Dashboard({ createGoal, setCreateGoal }) {
  const { goals, refreshGoals } = useGoal();
  const capitalize = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  useEffect(() => {
    refreshGoals();
  }, [createGoal]);
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0"
          onClick={() => { setCreateGoal(false) }}></div>
        <main className={`z-4 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="py-20 pt-40 pl-60 relative z-20">
            <div className="gap-4 max-w-7xl mx-auto flex flex-col relative z-10">
              <div className="bg-black rounded-md border-[#333843] border-[2px]">
                <div className="p-8 gap-4 flex flex-col">
                  <h1 className="text-2xl font-bold montserrat-font">Your Progress</h1>
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
                                <p className="font-bold text-xl noto-font">{capitalize(goal.category)}</p>
                              </div>
                              <div className="rounded-2xl border-1 border-neutral-600 content-center size-fit">
                                <p className="text-neutral-400 noto-font text-xs px-[6px] py-[1px]">0%</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex-1 border-3 border-[#e8e6e3] rounded-2xl"></div>
                              <p className="text-sm text-neutral-500">{goal.title}</p>
                            </div>
                            <button key={idx}
                              className="w-full bg-neutral-950 rounded-sm text-sm py-3 roboto-font font-bold hover:bg-black transition-bg duration-200"
                            >View Details</button>
                          </div>
                        </div>
                      )
                      )
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