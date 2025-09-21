import { createContext, useContext, useState } from "react";
import { userStats } from "../api";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [data, setData] = useState([]);
  const refreshStats = async () => {
    try {
      const res = await userStats();
      if (res.data.success) setData(res.data.stats);
    } catch (err) {
      console.error("Goal stats error:", err);
    }
  };
  return (
    <StatsContext value={{ data, refreshStats }}>
      {children}
    </StatsContext>
  )
}

export const useStats = () => useContext(StatsContext);