import { useAlert } from "../context/Alert";
import { goals } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GoalOverlay = (
  { createGoal,
    setCreateGoal,
    goalTitle,
    setGoalTitle,
    category,
    setCategory,
    frequency,
    setFrequency,
    inputs,
    setInputs,
    startDate,
    setStartDate,
    refreshGoals }) => {
  const { showAlert } = useAlert();
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
      // get the last input
      const lastInput = prev[prev.length - 1];
      // if last input is blank, do nothing
      if (!lastInput.value.trim()) { showAlert("Fields are required"); return prev; } // no new input added
      // otherwise, lock the last one and add new
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
      deadline: startDate,
      milestones: inputs
        .map((input) => input.value.trim())
        .filter((val) => val.length > 0), // remove blanks
    }
    try {
      const res = await goals(payload);
      await refreshGoals();
      showAlert(res.data.message);
      setCreateGoal(false);
    } catch (err) {
      showAlert(err.response?.data?.error ||
        err.message ||
        "Something went wrong"
      );
    }
  }
  return (
    <>
      <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 transition-opacity duration-200 z-20 ${createGoal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="relative">
          <div className="p-10 pt-12 bg-neutral-900 w-[500px] rounded-xl">
            <div className="flex flex-col gap-6">
              <div className="flex-1 text-center">
                <h1 className="font-bold">Add a Goal</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="pb-6 flex flex-col gap-4 border-b-[1px] border-b-neutral-700 text-neutral-400">
                    <div className="flex items-end justify-between">
                      <p>Goal</p>
                      <textarea
                        className="px-2 py-1 bg-neutral-900 text-neutral-400 border-2 border-neutral-800 rounded focus:outline-none focus:border-neutral-600 resize-none transition-all"
                        value={goalTitle}
                        onChange={(e) => { setGoalTitle(e.target.value) }}
                        rows="1"
                      />
                    </div>
                    <div className="flex items-end justify-between">
                      <p>Category</p>
                      <select className="w-[51.7%] noto-font px-3 py-[5px] bg-neutral-900 text-neutral-400 border-2 border-neutral-800 rounded focus:outline-none"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="">Select an option</option>
                        <option value="health">Health</option>
                        <option value="career">Career</option>
                        <option value="education">Education</option>
                      </select>
                    </div>
                    <div className="flex items-end justify-between">
                      <p>Frequency</p>
                      <select className="w-[51.7%] noto-font px-3 py-[5px] bg-neutral-900 text-neutral-400 border-2 border-neutral-800 rounded focus:outline-none"
                        value={frequency}
                        onChange={(e) => { setFrequency(e.target.value) }}>
                        <option value="">Select an option</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex-1">
                        <p>Deadline</p>
                      </div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="px-2 py-1 bg-neutral-900 text-neutral-400 border-2 border-neutral-800 rounded focus:outline-none focus:border-neutral-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                      <div className="flex-1">
                        <p className="font-bold">Milestones</p>
                      </div>
                    </div>
                    <div className="text-neutral-400">
                      <div className="flex flex-col justify-stretch gap-2">
                        {inputs.map((input, index) => (
                          <div
                            key={input.id}
                            className="flex items-stretch gap-2 justify-between">
                            <textarea
                              className="flex-1 px-2 py-1 bg-neutral-900 text-neutral-400 border-2 border-neutral-800 rounded focus:outline-none focus:border-neutral-600 resize-none transition-all"
                              rows="1"
                              value={input.value}
                              onChange={(e) => addMilestone(input.id, e.target.value)}
                              disabled={input.locked} />
                            {/* Show Remove button only if it's NOT the last input */}
                            {index !== inputs.length - 1 && (
                              <button
                                type="button"
                                onClick={() => removeInput(input.id)}
                                className="p-2 font-bold text-sm rounded-sm border-red-600 border-[2px] text-red-500 hover:bg-red-600 hover:text-white transition-all duration-250">
                                Remove
                              </button>
                            )}

                            {/* Show Add button only on the last input */}
                            {index === inputs.length - 1 && (
                              <button
                                type="button"
                                onClick={addInput}
                                className="p-2 font-bold text-sm rounded-sm border-[#3d3d3d] border-[2px] hover:bg-white hover:border-white hover:text-black transition-all duration-250">
                                Add
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 mt-8 border-[2px] roboto-font font-bold border-neutral-700 rounded-sm hover:bg-white hover:border-white hover:text-black welcome-buttons">
                    Pursuit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"
              onClick={() => setCreateGoal(false)}
              className="cursor-pointer fill-neutral-600 hover:fill-neutral-700 transition-full duration-200">
              <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default GoalOverlay