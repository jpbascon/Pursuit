import { useEffect, useState } from "react";
import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto flex flex-col justify-center min-h-screen items-center">
        <p className="text-black">Dashboard</p>
        <button className="text-black" onClick={logout}>logout</button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </>
  )
}