import GoalOverlay from "./GoalOverlay";
import { useEffect, useState } from "react";
import { useGoal } from "../hooks/useGoals";
import { fetchUser } from "../hooks/fetchUser";

export default function Dashboard({ createGoal, setCreateGoal }) {
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const { goals, refreshGoals } = useGoal();
  const { name } = fetchUser();

  useEffect(() => {
    if (!createGoal) {
      setInputs([{ id: Date.now(), value: "", locked: false }]);
      setCategory("");
      setFrequency("");
      setGoalTitle("");
    }
  }, [createGoal]);
  return (
    <>
      <div className="bg-[#121212] min-h-screen relative">
        <div className="absolute inset-0"
          onClick={() => { setCreateGoal(false) }}></div>
        <main className={`transition-all duration-200 z-1 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="py-20 relative z-20">
            <div className="gap-10 max-w-7xl mx-auto flex justify-center items-start relative z-10">
              <div className="p-5 w-[300px] bg-neutral-900 rounded-sm border-[#3d3d3d] border-[2px]">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <img
                      className="w-[80px] rounded-[50%]"
                      src="placeholder.jpg" />
                  </div>
                  <div className="mt-5 gap-4 flex flex-col noto-font">
                    <p className="text-2xl w-full text-center">{name}</p>
                    <div className="flex gap-10 border-b-1 pb-5 border-neutral-600">
                      <div>
                        <p className="text-sm">Followers</p>
                        <p className="text-sm">0</p>
                      </div>
                      <div>
                        <p className="text-sm">Following</p>
                        <p className="text-sm">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <div>
                      <p>Statistics</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="bg-neutral-900 rounded-md border-[#3d3d3d] border-[2px]">
                  <div className="p-5 gap-2 flex items-center justify-end noto-font">
                    <button
                      className="p-2 flex items-center text-center gap-1 font-bold text-sm rounded-sm border-[#3d3d3d] border-[2px] hover:bg-white hover:border-white hover:text-black transition-all duration-250"
                      onClick={() => { setCreateGoal(true) }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M12 20v-8m0 0V4m0 8h8m-8 0H4" /></svg>
                      Add Goal</button>
                  </div>
                </div>
                <div className="bg-neutral-900 rounded-md border-[#3d3d3d] border-[2px]">
                  <div className="p-5 gap-1 flex flex-col items-start noto-font">
                    {goals.length === 0 ? (
                      <p>You currently have no activity</p>
                    ) : (
                      goals.map((goal, idx) => (
                        <div key={idx} className="mb-4">
                          <p className="font-bold">{goal.title}</p>
                          <ul className="list-disc list-inside">
                            {goal.milestones.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 w-[300px] bg-neutral-900 rounded-md border-[#3d3d3d] border-[2px]">
                <div className="gap-5 flex flex-col noto-font">
                  <button>Settings</button>
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