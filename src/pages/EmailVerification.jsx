import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const navigate = useNavigate();
  return (
    <>
      <img
        src="/landingBg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1" />
      <div className="pt-30 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col gap-5 items-center relative z-20">
          <h1 className="text-4xl font-bold noto-font">{status === "success" ? "Email Verified" : "Verification failed"}</h1>
          <div>
            <p className="roboto-font text-zinc-400">You can now&nbsp;<button onClick={() => navigate("/login")}
              className="underline font-bold text-[#e8e6e3] hover:brightness-70 transition-brightness duration-200">Log In</button> your account.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailVerification;