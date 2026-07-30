"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

interface OTPInputProps {
  onOTPChange: (otp: string) => void;
}

export function OTPInput({ onOTPChange }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onOTPChange(newOtp.join(""));

    // Auto-move to next input
    if (value && index < 5) {
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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);
    onOTPChange(newOtp.join(""));

    if (digits.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 bg-white text-gray-900 caret-gray-900 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
          placeholder="•"
        />
      ))}
    </div>
  );
}

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
    setLoading(true);
    const loadingToast = toast.loading("Sending OTP...");
    // Simulate OTP sending
    setTimeout(() => {
      setShowOTP(true);
      toast.success("OTP sent to your phone", { id: loadingToast });
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      setOtpError(true);
      return;
    }

    setOtpError(false);
    setLoading(true);
    const loadingToast = toast.loading("Logging in...");
    // Simulate OTP verification - in production, this would come from your API
    setTimeout(() => {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminPhone", phone);
      // Store user profile data (simulated - replace with actual API data)
      const userProfile = {
        name: "Admin User",
        profileImage: null, // Set to a URL string if user has uploaded a profile image
        phone: phone,
      };
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      toast.success("Logged in successfully", { id: loadingToast });
      setTimeout(() => {
        onClose();
        setPhone("");
        setShowOTP(false);
        setOtp("");
        router.push("/admin/add-notice");
      }, 1500);
      setLoading(false);
    }, 1500);
  };

  const handleBackToPhone = () => {
    setShowOTP(false);
    setOtp("");
    setOtpError(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {showOTP ? "Verify OTP" : "Login"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {!showOTP ? (
                <>
                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhone(value);
                        if (value.length === 10) {
                          setPhoneError(false);
                        }
                      }}
                      className={`w-full px-4 py-2 border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 focus:outline-none transition ${
                        phoneError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send an OTP to verify your number
                    </p>
                  </div>

                  {/* Send OTP Button */}
                  <button
                    onClick={handleSendOTP}
                    disabled={loading || phone.length < 10}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  {/* OTP Verification */}
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter the 6-digit OTP sent to{" "}
                      <span className="font-semibold">+91 {phone}</span>
                    </p>

                    <div className={otpError ? "rounded-xl ring-2 ring-red-500 ring-offset-2 ring-offset-white" : ""}>
                      <OTPInput onOTPChange={(value) => {
                        setOtp(value);
                        if (value.length === 6) {
                          setOtpError(false);
                        }
                      }} />
                    </div>

                    {/* Verify Button */}
                    <button
                      onClick={handleVerifyOTP}
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition mt-4 disabled:cursor-not-allowed"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Back Button */}
                    <button
                      onClick={handleBackToPhone}
                      className="w-full text-blue-600 hover:text-blue-700 font-semibold py-2 mt-2"
                    >
                      Back to Phone Number
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t rounded-b-2xl">
              <p className="text-xs text-gray-600 text-center">
                By logging in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
