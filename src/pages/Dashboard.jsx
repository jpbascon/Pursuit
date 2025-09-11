import { useEffect, useState } from "react";
import { useAlert } from "../context/Alert";
import { getProfile } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard({ createGoal, setCreateGoal }) {
  const { showAlert } = useAlert;
  const [startDate, setStartDate] = useState(new Date());
  let [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setName(res.data.name);
      } catch (err) {
        showAlert(
          err.response?.data?.error ||
          err.message ||
          "Something went wrong"
        );
      }
    }
    fetchUser();
  }, [])
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
              <div className="bg-neutral-900 w-[500px] rounded-md border-[#3d3d3d] border-[2px]">
                <div className="p-5 gap-2 flex items-center noto-font">
                  <div className="flex-1">
                    <p>No recent activity</p>
                  </div>
                  <button
                    className="px-4 py-2 font-bold rounded-sm border-[#3d3d3d] border-[2px] hover:bg-white hover:border-white hover:text-black transition-all duration-250"
                    onClick={() => { setCreateGoal(true) }}>
                    Create a goal</button>
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
        <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 transition-opacity duration-200 z-20 ${createGoal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="p-10 bg-neutral-900 w-[500px] rounded-lg">
            <div className="flex flex-col gap-5">
              <form>
                <div className="flex flex-col gap-8 text-neutral-400">
                  <div className="flex items-center justify-between noto-font">
                    <p>Select a category:</p>
                    <select className="px-3 py-2 bg-neutral-900 border-[2px] border-neutral-700 rounded">
                      <option value="">Select an option</option>
                      <option value="health">Health</option>
                      <option value="career">Career</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Goal:</p>
                    <textarea
                      className="px-2 py-1 resize-none border-[#3d3d3d] border-[2px] outline-none rounded-sm focus:border-[#e8e6e3] transition-all"
                      rows="1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p>Until:</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="px-2 py-1 bg-neutral-900 text-neutral-400 border-2 border-neutral-700 rounded focus:outline-none focus:border-[#e8e6e3] transition-all"
                    />
                  </div>
                  <button className="py-3 mt-5 border-[2px] roboto-font font-bold border-neutral-700 rounded-sm hover:bg-white hover:border-white hover:text-black welcome-buttons">
                    Pursuit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}