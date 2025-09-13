import { useEffect, useState } from "react";
import { userGoalCheck } from "../api";

export function useGoal() {
  let [goals, setGoals] = useState([]);
  const fetchGoals = async () => {
    try {
      const res = await userGoalCheck();
      setGoals(res.data.goals || []);
    } catch (err) {
      setGoals([]);
      console.error(err);
    }
  };
  useEffect(() => {
    fetchGoals();
  }, [])
  return { goals, refreshGoals: fetchGoals };
}
