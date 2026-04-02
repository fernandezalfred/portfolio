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
  const [submitError, setSubmitError]   = useState<string | null>(null);

  // Hide the success banner after 3 seconds
  useEffect(() => {
    if (!messageSent) return;
    const timer = setTimeout(() => setMessageSent(false), 3000);
    return () => clearTimeout(timer);
  }, [messageSent]);

  async function handleSubmit() {
    setSubmitError(null);
    const res = await addData("contact", formData as unknown as Record<string, unknown>);
    if (res?.success) {
      setFormData(EMPTY_FORM);
      setMessageSent(true);
    } else {
      setSubmitError(res?.message ?? "Failed to send message. Please try again.");
    }
  }

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const isFormValid =
    formData.name !== "" && formData.email !== "" && formData.message !== "";

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-main/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16">
      {/* Section heading */}
      <AnimationWrapper className="text-center mb-12">
        <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
          Get In Touch
        </p>
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          Contact <span className="text-green-main">Me</span>
        </h2>
        <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-green-main" />
        <p className="text-gray-500 mt-5 text-lg max-w-md mx-auto">
          Have a project in mind or just want to say hi? Fill out the form and I&apos;ll get back to you.
        </p>
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

          {/* Error banner */}
          {submitError && (
            <div className="flex items-center gap-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {submitError}
            </div>
          )}

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
    </section>
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
