import GoalOverlay from "./GoalOverlay";
import { useEffect, useState } from "react";
import { useGoal } from "../hooks/useGoals";
import { getCategoryIcon } from "../hooks/getCategoryIcon";

export default function Dashboard({ createGoal, setCreateGoal }) {
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const { goals, refreshGoals } = useGoal();

  useEffect(() => {
    if (!createGoal) {
      setInputs([{ id: Date.now(), value: "", locked: false }]);
      setCategory("");
      setFrequency("");
      setGoalTitle("");
    }
  }, [createGoal]);
  const capitalize = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0"
          onClick={() => { setCreateGoal(false) }}></div>
        <main className={`transition-all duration-200 z-1 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="py-20 pt-40 pl-60 relative z-20">
            <div className="gap-4 max-w-7xl mx-auto flex flex-col relative z-10">
              <div className="flex-1 flex flex-col gap-5">
                <div className="bg-black rounded-md border-[#333843] border-[2px]">
                  <div className="p-8 noto-font">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl font-bold montserrat-font">Your Progress</h1>
                      <div className="gap-6 grid grid-cols-3">
                        {goals.length === 0 ? (
                          <p>You currently have no activity</p>
                        ) : (
                          goals.map((goal, idx) => {
                            return (
                              <div key={idx}
                                className="w-full bg-[#121212] rounded-md">
                                <div className="p-6 flex flex-col gap-6">
                                  <div className="flex justify-between">
                                    <div className="flex items-end gap-4">
                                      <h2>{getCategoryIcon(goal.category)}</h2>
                                      <p className="font-bold text-xl noto-font">{capitalize(goal.category)}</p>
                                    </div>
                                    <div className="rounded-2xl border-1 border-neutral-600 content-center size-fit">
                                      <p className="noto-font text-sm px-[8px] py-[1px]">0%</p>
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
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <GoalOverlay
          createGoal={createGoal}
          setCreateGoal={setCreateGoal}
          goalTitle={goalTitle}
          setGoalTitle={setGoalTitle}
          category={category}
          setCategory={setCategory}
          frequency={frequency}
          setFrequency={setFrequency}
          inputs={inputs}
          setInputs={setInputs}
          startDate={startDate}
          setStartDate={setStartDate}
          refreshGoals={refreshGoals} />
      </div>
    </>
  )
}