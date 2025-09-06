import { createContext, useContext, useState, useRef, useCallback } from "react";

const AlertContext = createContext();                                             // Creates a context object

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const timeoutRef = useRef(null);
  const showAlert = useCallback((message, duration = 3500) => {
    setAlertMessage(message);
    setAlert(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAlert(false);
      timeoutRef.current = null;
    }, duration)
  }, [])
  const hideAlert = useCallback(() => {                                           // Clears the timeoutRef immediately. Good for close buttons
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAlert(false);
  }, []);
  return (
    <>
      {/* .Provider provides the actual values to all children components and any components inside {children}
    can read these values */}
      <AlertContext.Provider value={{ alert, alertMessage, showAlert, hideAlert }}>
        {children}
      </AlertContext.Provider>
    </>
  )
}                                                                                 // useContext(AlertContext) gets the values from the context and wraps it inside
export const useAlert = () => useContext(AlertContext);                           // useAlert to reuse anywhere
