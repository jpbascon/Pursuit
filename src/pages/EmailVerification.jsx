import { useNavigate } from "react-router-dom";
const EmailVerification = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-15 max-w-7xl mx-auto">
        <div className="flex flex-col gap-5 items-center relative z-20">
          <h1 className="text-3xl">Email Verified!</h1>
          <div>
            <p>Your email has been successfully verified. You can now &nbsp;
              <button className="underline"
                onClick={() => navigate("/login")}>log in</button> your account.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailVerification;