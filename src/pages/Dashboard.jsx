import { useEffect, useState } from "react";
import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/me" : "https://pursuit-production.up.railway.app/me";
  const [message, setMessage] = useState("");
  let [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        console.log(data);
        setName(data.name);
      } catch (err) {
        console.error("Fetch user error", err);
      }
    }
    fetchUser();
  }, [])
  const logout = async () => {
    try {
      const res = await logoutUser();
      setMessage(res.data.message);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.error || "Logout failed");
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-35 pointer-events-none" />
        <div className="py-20 gap-10 max-w-7xl mx-auto flex justify-center items-start relative z-10">
          <div className="p-5 w-[300px] bg-neutral-900 rounded-md">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <img
                  className="w-[80px] rounded-[50%]"
                  src="placeholder.jpg" />
              </div>
              <div className="mt-5 gap-4 flex flex-col">
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
                  <button>Statistics{" >"}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 w-[500px] rounded-md">
            <div className="p-5 flex flex-col items-center">
              <p>You have no current activity</p>
            </div>
          </div>
          <div className="p-5 w-[300px] bg-neutral-900 rounded-md">
            <div className="flex gap-5 flex-col">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}