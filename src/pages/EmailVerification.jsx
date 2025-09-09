import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-15 max-w-7xl mx-auto">
        <div className="flex flex-col gap-5 items-center relative z-20">
          <h1 className="text-3xl">{status === "success" ? "Email Verified" : "Verification failed"}</h1>
          <div>
            {status === "success" &&
              <p>Email Verified. You can now
                <button className="underline"
                  onClick={() => navigate("/login")}>
                  log in</button>
                your account.
              </p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailVerification;