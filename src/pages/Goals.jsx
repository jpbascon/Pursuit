import { useGoal } from "../hooks/useGoals.jsx";
import { useState, useRef, useEffect } from "react";
import { useAlert } from "../context/Alert";
import { deleteGoal } from "../api";
import { Pencil, Trash2, Save, Ban } from "lucide-react";

export default function Goals({ createGoal, setCreateGoal }) {
  const { goals, refreshGoals } = useGoal();
  const { showAlert } = useAlert();
  const [editing, setEditing] = useState(null);
  const inputRef = useRef(null);
  const handleEdit = (goals) => setEditing({ ...goals });
  const handleDelete = async (id) => {
    try {
      const res = await deleteGoal(id);
      showAlert(res.data.message);
      refreshGoals();
    } catch (err) {
      showAlert(err);
    }
  }
  const capitalize = (word) => (word.charAt(0).toUpperCase() + word.slice(1));
  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing])
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
                        <div className="p-5 flex justify-between">
                          <div className="gap-2 flex flex-col">
                            {editing?._id === data._id ? (
                              <input
                                ref={inputRef}
                                className="outline-none text-md montserrat-font font-semibold bg-neutral-800 rounded-sm"
                                value={editing?.title || ""}
                                onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                            )
                              : (
                                <h2 className="text-md montserrat-font font-semibold">{data.title}</h2>
                              )}
                            <p className="outfit-font text-xs font-medium bg-[#552b55] size-fit px-[6px] py-[2px] rounded-2xl">{capitalize(data.category)}</p>
                            <p className="text-xs text-neutral-400 montserrat-font font-medium">Deadline: {new Date(data.deadline).toLocaleDateString("en-CA")}</p>
                          </div>
                          <div className="gap-6 flex items-center">
                            <div className="gap-2 flex flex-col justify-center w-50">
                              <div className="text-neutral-400 flex items-center justify-between">
                                <h2 className="noto-font text-sm">Progress</h2>
                                <p className="noto-font text-sm px-[8px] py-[1px]">0%</p>
                              </div>
                              <div className="border-3 border-[#e8e6e3] rounded-2xl"></div>
                              <p className="outfit-font text-xs font-medium bg-[#552b55] size-fit px-[6px] py-[2px] rounded-2xl">{data.completed === false ? "In Progress" : "Completed"}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {editing?._id === data._id ? (
                                <>
                                  <div className="hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                    onClick={() => handleUpdate(data)}>
                                    <div className="p-2">
                                      <Save width={18} height={18} />
                                    </div>
                                  </div>
                                  <div className="hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                    onClick={() => setEditing(null)}>
                                    <div className="p-2">
                                      <Ban width={18} height={18} />
                                    </div>
                                  </div>
                                </>
                              ) :
                                (
                                  <>
                                    <div className="hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                      onClick={() => handleEdit(data)}>
                                      <div className="p-2">
                                        <Pencil width={18} height={18} />
                                      </div>
                                    </div>
                                    <div className="hover:bg-neutral-800 hover:cursor-pointer rounded-md transition-bg duration-200"
                                      onClick={() => handleDelete(data._id)}>
                                      <div className="p-2">
                                        <Trash2 width={18} height={18} />
                                      </div>
                                    </div>
                                  </>
                                )}
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