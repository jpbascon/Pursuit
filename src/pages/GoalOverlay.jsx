import { useAlert } from "../context/Alert";
import { addGoal } from "../api";
import { useState, useEffect } from "react";

const GoalOverlay = ({ createGoal, setCreateGoal }) => {
  const { showAlert } = useAlert();
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const addMilestone = (id, newValue) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id && !input.locked
          ? { ...input, value: newValue }
          : input
      )
    );
  }
  const addInput = () => {
    setInputs((prev) => {
      const lastInput = prev[prev.length - 1];
      if (!lastInput.value.trim()) { showAlert("Fields are required"); return prev; } // no new input added
      const updated = prev.map((input, index) =>
        index === prev.length - 1 ? { ...input, locked: true } : input
      );
      return [...updated, { id: Date.now(), value: "", locked: false }];
    });
  };
  const removeInput = (id) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      goalTitle,
      category,
      frequency,
      deadline,
      milestones: inputs
        .map((input) => ({ text: input.value.trim() }))
        .filter((m) => m.text.length > 0),
    }
    try {
      const res = await addGoal(payload);
      showAlert(res.data.message);
      setCreateGoal(false);
    } catch (err) {
      showAlert(err.response?.data?.error || err.message || "Something went wrong");
    }
  }
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
      <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 transition-opacity duration-200 z-100 ${createGoal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="max-w-md px-6 py-4 bg-neutral-950 border-1 border-[#333843] rounded-xl">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold roboto-font outfit-font text-xl">Create New Goal</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"
                  onClick={() => setCreateGoal(false)}
                  className="cursor-pointer fill-[#aaabac] hover:fill-neutral-500 transition-full duration-200">
                  <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496" />
                </svg>
              </div>
              <p className="text-base text-neutral-300">Set up your new goal with all the necessary details and milestones.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-10">
                <div className="pb-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <p className="outfit-font text-end font-medium w-25">Goal</p>
                    <textarea
                      className="flex-1 px-2 py-1 text-neutral-400 border-1 border-[#333843] rounded-xs focus:outline-none focus:border-neutral-600 resize-none transition-all outfit-font"
                      value={goalTitle}
                      onChange={(e) => { setGoalTitle(e.target.value) }}
                      rows="1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="outfit-font text-end font-medium w-25">Category</p>
                    <select className="flex-1 noto-font px-3 py-[6px] text-neutral-400 border-1 border-[#333843] rounded-xs focus:outline-none outfit-font"
                      value={category}
                      onChange={(e) => { setCategory(e.target.value) }}>
                      <option value="">Select</option>
                      <option value="Health &amp; Fitness">Health & Fitness</option>
                      <option value="Career Development">Career Development</option>
                      <option value="Personal Growth">Personal Growth</option>
                      <option value="Financial Goals">Financial Goals</option>
                      <option value="Relationships">Relationships</option>
                      <option value="Community Service">Community Service</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="outfit-font text-end font-medium w-25">Frequency</p>
                    <select className="flex-1 noto-font px-3 py-[6px] text-neutral-400 border-1 border-[#333843] rounded-xs focus:outline-none outfit-font"
                      value={frequency}
                      onChange={(e) => { setFrequency(e.target.value) }}>
                      <option value="">Select</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="outfit-font text-end font-medium w-25">Deadline</p>
                    <input
                      type="date"
                      seleted={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="flex-1 border-1 border-[#333843] outline-none px-3 py-[6px] rounded text-sm text-neutral-400 outfit-font"
                    />
                  </div>
                  <div className="flex gap-3 justify-between">
                    <p className="outfit-font text-end font-medium w-25">Milestones</p>
                    <div className="flex-1 flex flex-col justify-stretch gap-2">
                      {inputs.map((input, index) => (
                        <div key={input.id}
                          className="flex gap-2">
                          <div className="flex-1 flex flex-col gap-2">
                            <textarea
                              className="flex-1 px-2 py-1 text-neutral-400 border-1 border-[#333843] rounded-xs focus:outline-none focus:border-neutral-600 resize-none transition-all outfit-font"
                              rows="1"
                              value={input.value}
                              onChange={(e) => addMilestone(input.id, e.target.value)}
                              disabled={input.locked} />
                            {index === inputs.length - 1 && (
                              <button
                                type="button"
                                onClick={addInput}
                                className="flex justify-center items-center gap-1 py-[6px] font-bold montserrat-font text-sm rounded-xs border-[#333843] border-1 hover:bg-white hover:border-white hover:text-black transition-all duration-250">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                  <g fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
                                    <circle cx="12" cy="12" r="10" /></g>
                                </svg> Add Milestone
                              </button>
                            )}
                          </div>
                          {index !== inputs.length - 1 && (
                            <button
                              type="button"
                              onClick={() => removeInput(input.id)}
                              className="p-2 font-bold text-sm rounded-sm border-red-600 border-[2px] text-red-500 hover:bg-red-600 hover:text-white transition-all duration-250">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                  <path d="m3 4l2.303 14.077a4 4 0 0 0 2.738 3.166l.328.104a12 12 0 0 0 7.262 0l.328-.104a4 4 0 0 0 2.738-3.166L21 4" />
                                  <ellipse cx="12" cy="4" rx="9" ry="2" /></g></svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-2 text-lg font-semibold italic border-1 roboto-font border-[#333843] rounded-sm hover:bg-white hover:border-white hover:text-black welcome-buttons">
                  Pursuit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default GoalOverlay