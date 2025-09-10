import { useEffect, useState } from "react";
import { useAlert } from "../context/Alert";

export default function Dashboard() {
  const API_URL = import.meta.env.MODE === "production" ? "https://pursuit-production.up.railway.app/me" : "http://localhost:5000/me"
  const { showAlert } = useAlert;
  let [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        })
        if (!res.ok) showAlert("Failed to fetch user");
        const data = await res.json();
        setName(data.name);
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
      <div className="bg-[#121212] min-h-screen ">
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
                    <p>No activity</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 w-[500px] rounded-md border-[#3d3d3d] border-[2px]">
              <div className="p-5 flex flex-col items-center noto-font">
                <p>You currently have no goal</p>
              </div>
            </div>
            <div className="p-5 w-[300px] bg-neutral-900 rounded-md border-[#3d3d3d] border-[2px]">
              <div className="flex gap-5 flex-col noto-font">
                <button>Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}