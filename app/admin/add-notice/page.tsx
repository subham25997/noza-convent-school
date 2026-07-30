"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AddNoticePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    expiry: "",
    description: "",
    newTill: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    expiry: false,
    description: false,
    newTill: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = {
      title: formData.title.trim() === "",
      expiry: formData.expiry.trim() === "",
      description: formData.description.trim() === "",
      newTill: formData.newTill.trim() === "",
    };

    setFieldErrors(nextErrors);

    if (nextErrors.title || nextErrors.expiry || nextErrors.description || nextErrors.newTill) {
      toast.error("Please fill all fields properly");
      return;
    }

    if (formData.title.length > 120) {
      toast.error("Title must be 120 characters or less");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setFormData({ title: "", expiry: "", description: "", newTill: "" });
        setSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Add Notice</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Title <span className="text-gray-600 text-sm font-normal">(120 Chars limit)</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={120}
                placeholder="Enter notice title"
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition text-base ${fieldErrors.title ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/120 characters</p>
            </div>

            {/* Expiry Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Expiry <span className="text-gray-600 text-sm font-normal">(dd/mm/yyyy)</span>
              </label>
              <input
                type="date"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 focus:outline-none transition text-base ${fieldErrors.expiry ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter detailed description"
                rows={6}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition text-base resize-none ${fieldErrors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              />
            </div>

            {/* New Till Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                New Till <span className="text-gray-600 text-sm font-normal">(dd/mm/yyyy)</span>
              </label>
              <input
                type="date"
                name="newTill"
                value={formData.newTill}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 focus:outline-none transition text-base ${fieldErrors.newTill ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-500 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                {loading ? "Publishing..." : success ? (
                  <>
                    <FaCheck size={20} /> Published
                  </>
                ) : (
                  "Publish Notice"
                )}
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold rounded-lg transition text-lg"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-800 font-semibold text-center">
              ✓ Notice published successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
