import { deleteGoal } from "../api";
import { useAlert } from "../context/Alert";
import { useGoal } from "./useGoals";

export function useDeleteGoal() {
  const { refreshGoals } = useGoal();
  const { showAlert } = useAlert();

  const handleDelete = async (id) => {
    try {
      const res = await deleteGoal(id);
      showAlert(res.data.message);
      refreshGoals();
    } catch (err) {
      showAlert(err);
    }
  }
  return { handleDelete }
}