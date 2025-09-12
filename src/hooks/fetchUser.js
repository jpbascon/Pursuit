import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { useAlert } from "../context/Alert";

export function fetchUser() {
  const { showAlert } = useAlert;
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

  return { name }
}