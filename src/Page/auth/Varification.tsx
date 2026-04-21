
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [email] = useState('wiko@examplae.com'); // You can make this dynamic
  const [timeLeft, setTimeLeft] = useState(239); // 3:59 in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
 const navigate = useNavigate();
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);

      // Focus last filled input or next empty
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      setTimeLeft(239); // Reset to 3:59
      setIsResendDisabled(true);
      setOtp(['', '', '', '', '', '']);
      alert('New code has been sent to your email!');
      // Here you would call your resend API
    }
  };

  const handleConfirm = () => {
    const code = otp.join('');
    if (code.length === 6) {
      alert(`Code verified: ${code}`);
      // Here you would call your verification API
      navigate("/reset-password")
    } else {
      alert('Please enter all 6 digits');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Enter the Code We’ve Sent
          </h1>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            We have sent you the code to your email account<br />
            (<span className="font-medium">{email}</span>), please enter the code below.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`
                w-12 h-14 text-center text-2xl font-semibold border-2 
                rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition-all
                ${digit 
                  ? 'border-blue-500 bg-blue-50 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-400'
                }
              `}
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Didn&apos;t get the code? click{' '}
            <button
              onClick={handleResend}
              disabled={isResendDisabled}
              className={`font-medium hover:underline ${
                isResendDisabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Send Again
            </button>{' '}
            after <span className="font-mono text-blue-600">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={otp.join('').length !== 6}
          
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 
                     disabled:cursor-not-allowed text-white font-semibold 
                     py-4 rounded-2xl transition-all text-base"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;