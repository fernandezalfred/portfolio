"use client";

import { useEffect, useState } from "react";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { addData } from "@/services/api";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };

// Shared input/textarea class used for all form fields
const INPUT_CLASS =
  "w-full border border-gray-200 bg-white rounded-lg text-sm outline-none text-gray-800 py-3 px-4 " +
  "focus:border-green-main focus:ring-2 focus:ring-green-main/20 transition-all placeholder:text-gray-400";

export default function ContactSection() {
  const [formData, setFormData]         = useState<ContactFormData>(EMPTY_FORM);
  const [messageSent, setMessageSent]   = useState(false);

  // Hide the success banner after 3 seconds
  useEffect(() => {
    if (!messageSent) return;
    const timer = setTimeout(() => setMessageSent(false), 3000);
    return () => clearTimeout(timer);
  }, [messageSent]);

  async function handleSubmit() {
    const res = await addData("contact", formData as unknown as Record<string, unknown>);
    if (res?.success) {
      setFormData(EMPTY_FORM);
      setMessageSent(true);
    }
  }

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const isFormValid =
    formData.name !== "" && formData.email !== "" && formData.message !== "";

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-20 px-6 sm:px-8 lg:px-16 mx-auto"
      id="contact"
    >
      {/* Section heading */}
      <AnimationWrapper className="py-6">
        <div className="flex flex-col items-center">
          <h1 className="leading-tight mb-2 text-3xl lg:text-4xl xl:text-5xl font-bold">
            Contact <span className="text-green-main">Me</span>
          </h1>
          <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
            Have a project in mind or just want to say hi? Fill out the form and I&apos;ll get back to you.
          </p>
        </div>
      </AnimationWrapper>

      {/* Contact form card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col gap-4">

          {/* Name and email side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              className={`${INPUT_CLASS} h-36 resize-none`}
            />
          </div>

          {/* Success banner shown after message is sent */}
          {messageSent && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-main bg-green-50 border border-green-100 rounded-lg px-4 py-3">
              <CheckIcon />
              Message sent successfully! I&apos;ll be in touch soon.
            </div>
          )}

          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="mt-2 w-full py-3 px-8 bg-green-main text-white font-semibold rounded-lg text-base hover:opacity-90 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586
           7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      />
    </svg>
  );
}
