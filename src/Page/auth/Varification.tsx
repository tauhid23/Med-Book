import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiError, verifySignupOtp } from "../../lib/authApi";
import { useAuthStore } from "../../store/authStore";

const OTP_LENGTH = 6;

const getErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "OTP verification failed. Please try again.";
};

const OTPVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryEmail = searchParams.get("email");
  const pendingVerificationEmail = useAuthStore(
    (state) => state.pendingVerificationEmail
  );
  const setPendingVerificationEmail = useAuthStore(
    (state) => state.setPendingVerificationEmail
  );

  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const [email, setEmail] = useState(
    queryEmail || pendingVerificationEmail || ""
  );
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(239);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeLeft]);

  const verifyMutation = useMutation({
    mutationFn: verifySignupOtp,
    onSuccess: () => {
      setPendingVerificationEmail(null);
      navigate("/signin", {
        replace: true,
        state: { message: "Email verified successfully. Please sign in." },
      });
    },
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (Number.isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH)
      .replace(/\D/g, "");

    if (pastedData) {
      const newOtp = Array.from({ length: OTP_LENGTH }, () => "");
      pastedData.split("").forEach((char, index) => {
        if (index < OTP_LENGTH) newOtp[index] = char;
      });
      setOtp(newOtp);
      setOtpError("");

      const lastFilledIndex = Math.min(pastedData.length - 1, OTP_LENGTH - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      setTimeLeft(239);
      setOtp(Array.from({ length: OTP_LENGTH }, () => ""));
    }
  };

  const handleConfirm = () => {
    const trimmedEmail = email.trim();
    const code = otp.join("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setEmailError("Email address is required");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    if (code.length !== OTP_LENGTH) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    verifyMutation.mutate({ email: trimmedEmail, otp: code });
  };

  const isLoading = verifyMutation.isPending;
  const isResendDisabled = timeLeft > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Enter the Code We Sent
          </h1>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            Enter the OTP from your email to verify your account.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                digit
                  ? "border-blue-500 bg-blue-50 text-gray-900"
                  : "border-gray-200 hover:border-gray-300 text-gray-400"
              }`}
            />
          ))}
        </div>
        {otpError && (
          <p className="text-red-500 text-xs text-center mb-4">{otpError}</p>
        )}

        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Didn't get the code? click{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResendDisabled}
              className={`font-medium hover:underline ${
                isResendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Send Again
            </button>{" "}
            after{" "}
            <span className="font-mono text-blue-600">
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        {verifyMutation.isError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 mb-4">
            {getErrorMessage(verifyMutation.error)}
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={otp.join("").length !== OTP_LENGTH || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all text-base flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Confirm"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already verified?{" "}
          <Link to="/signin" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
