import { useGoal } from "../hooks/useGoals.jsx";
import { useDeleteGoal } from "../hooks/useDeleteGoal.js"
import { useState, useEffect } from "react";
import { useAlert } from "../context/Alert.jsx";
import { ChevronUp, ChevronDown, Check, Trash2, Edit, Ban } from "lucide-react";


export default function Goals({ createGoal, setCreateGoal }) {
  const capitalize = (word) => (word.charAt(0).toUpperCase() + word.slice(1));
  const { handleDelete } = useDeleteGoal();
  const { showAlert } = useAlert();
  const [editing, setEditing] = useState(null);
  const [checkedMilestones, setCheckedMilestones] = useState([]);
  const [expandedGoalId, setExpandedGoalId] = useState(null);
  const { goals, refreshGoals } = useGoal();
  const handleEdit = (data) => { setEditing({ ...data }) };
  const deleteGoal = async (id) => {
    try {
      const res = await handleDelete(id);
      showAlert(res.data.message);
    } catch (err) {
      showAlert(err.data.error?.response || "Something went wrong");
    }
  }
  const toggleCheck = (key) => {
    setCheckedMilestones((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }
  useEffect(() => {
    refreshGoals();
  }, [createGoal]);
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0"
          onClick={() => { setCreateGoal(false) }}></div>
        <main className={`transition-all duration-200 z-1 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="py-20 pt-30 pl-40 relative z-20 max-w-7xl mx-auto">
            <div className="gap-8 flex flex-col">
              {goals.length > 0 ? (
                <>
                  <div className="flex flex-col justify-center gap-8">
                    <h2 className="text-2xl font-bold montserrat-font">Overview</h2>
                    <div className="gap-4 flex justify-between items-center">
                      <div className="p-5 bg-[#121212] border-[#333843] border-[2px] rounded-xl flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <p className="montserrat-font text-neutral-400 text-sm font-medium">Total Goals</p>
                        </div>
                        <h2 className="montserrat-font font-bold text-2xl">{goals.length}</h2>
                      </div>
                      <div className="p-5 bg-[#121212] border-[#333843] border-[2px] rounded-xl flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <p className="montserrat-font text-neutral-400 text-sm font-medium">Milestones Completed</p>
                        </div>
                        <h2 className="montserrat-font font-bold text-2xl">{goals.filter((goal) => goal.completed === true).length}</h2>
                      </div>
                      <div className="p-5 bg-[#121212] border-[#333843] border-[2px] rounded-xl flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <p className="montserrat-font text-neutral-400 text-sm font-medium">Completed Goals</p>
                        </div>
                        <h2 className="montserrat-font font-bold text-2xl">{goals.filter((goal) => goal.completed === true).length}</h2>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold montserrat-font">Your Goals</h2>
                  <div className="gap-4 flex flex-col">
                    {goals.map((data, idx) => (
                      <div key={idx} className="border-[#333843] border-[2px] bg-[#121212] rounded-xl">
                        <div className={`p-5 flex flex-col transition-gap duration-300 ${expandedGoalId === data._id ? "gap-6" : "gap-0"}`}>
                          <div className="flex justify-between items-center">
                            <div className="gap-2 flex flex-col">
                              <h2 className="text-md montserrat-font font-semibold">{data.title}</h2>
                              <p className="outfit-font text-xs font-medium bg-[#552b55] size-fit px-[6px] py-[2px] rounded-2xl">{capitalize(data.category)}</p>
                              <p className="text-xs text-neutral-400 montserrat-font font-medium">Deadline: {new Date(data.deadline).toLocaleDateString("en-CA")}</p>
                            </div>
                            <div className="gap-8 flex items-center">
                              <div className="gap-2 flex flex-col justify-center w-50">
                                <div className="text-neutral-400 flex items-center justify-between">
                                  <h2 className="noto-font text-sm">Progress</h2>
                                  <p className="noto-font text-sm px-[8px] py-[1px]">0%</p>
                                </div>
                                <div className="border-3 border-[#e8e6e3] rounded-2xl"></div>
                                <p className="outfit-font text-xs font-medium bg-[#552b55] size-fit px-[6px] py-[2px] rounded-2xl">{data.completed === false ? "In Progress" : "Completed"}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="p-2 hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                  onClick={() => { setExpandedGoalId(expandedGoalId === data._id ? null : data._id); }}>
                                  {expandedGoalId === data._id ?
                                    <ChevronUp width={20} height={20} />
                                    :
                                    <ChevronDown width={20} height={20} />}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`transition-all duration-300 overflow-hidden ${expandedGoalId === data._id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="flex flex-col gap-4">
                              <div className="flex justify-between items-center">
                                <h2 className="text-md montserrat-font font-semibold">Your Milestones <span>0/{data.milestones.length}</span></h2>
                                <div className={`gap-4 flex items-center ${editing?._id === data._id ? "opacity-100" : "opacity-0"}`}>
                                  <div className="p-2 hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                    onClick={() => deleteGoal(data._id)}>
                                    <Trash2 width={18} height={18} />
                                  </div>
                                  <div className="p-2 hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                    onClick={() => setEditing(null)}>
                                    <Ban width={18} height={18} />
                                  </div>
                                </div>
                                <div className={`p-2 hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200 
                                  ${editing?._id === data._id ? "hidden" : "block"}`}
                                  onClick={() => { handleEdit(data) }}>
                                  <Edit width={18} height={18} />
                                </div>
                              </div>
                              {data.milestones && data.milestones.length > 0 && (
                                data.milestones.map((milestone, key) => (
                                  <div key={key} className="flex gap-4 items-center">
                                    <button
                                      className={`p-[1px] rounded-xs transition-bg duration-100 ${checkedMilestones.includes(`${data._id}-${key}`) ? "bg-[#552b55]" : "bg-neutral-800"}`}
                                      onClick={() => toggleCheck(`${data._id}-${key}`)}>
                                      <Check strokeWidth={2} width={18} height={18} color={`${checkedMilestones.includes(`${data._id}-${key}`) ? "#fff" : "transparent"}`} />
                                    </button>
                                    <p className="outfit-font text-md hover:cursor-pointer"
                                      onClick={() => toggleCheck(`${data._id}-${key}`)}>{milestone}</p>
                                  </div>
                                )))}
                            </div>
                            <div className="flex justify-end">
                              <button className={`py-[8px] px-[14px] outfit-font rounded-md bg-emerald-700  text-sm hover:brightness-85 transition-all duration-100 ${checkedMilestones.some((id) => id.startsWith(data._id)) ? "brightness-100" : "brightness-70 pointer-events-none"}`}>Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>)
                : (
                  <>
                    <h1 className="text-2xl font-bold montserrat-font">You have no activity</h1>
                  </>
                )
              }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}