import { createContext, useContext, useState } from "react";
import { userGoalCheck } from "../api";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);

  const refreshGoals = async () => {
    try {
      const res = await userGoalCheck();
      setGoals(res.data.goals || []);
    } catch (err) {
      console.error(err);
      setGoals([]);
    }
  };
  return (
    <GoalContext.Provider value={{ goals, refreshGoals }}>
      {children}
    </GoalContext.Provider>
  );
}

export const useGoal = () => useContext(GoalContext);
