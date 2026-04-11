"use client";

/**
 * Public "Contact Me" section of the portfolio.
 *
 * Renders a form with name, email, and message fields.
 * On submit, sends a POST to /api/contact and shows a success or error banner.
 * The success banner auto-dismisses after 3 seconds.
 *
 * The submit button is disabled until all three fields are filled and while
 * a request is in flight to prevent double-submissions.
 */

import { useEffect, useState } from "react";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { addData } from "@/services/api";
import { AlertCircleIcon, CheckCircleIcon, SpinnerIcon } from "@/components/ui/Icons";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };

// How long (ms) the success banner stays visible before auto-dismissing
const SUCCESS_BANNER_MS = 3_000;

/** Shared Tailwind class applied to every input and textarea in the form. */
const INPUT_CLASS =
  "w-full border border-gray-200 bg-white rounded-lg text-sm outline-none text-gray-800 py-3 px-4 " +
  "focus:border-green-main focus:ring-2 focus:ring-green-main/20 transition-all placeholder:text-gray-400";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [messageSent, setMessageSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hide the success banner after 3 seconds
  useEffect(() => {
    if (!messageSent) return;
    const timer = setTimeout(() => setMessageSent(false), SUCCESS_BANNER_MS);
    return () => clearTimeout(timer);
  }, [messageSent]);

  // Guard against empty fields and double-clicks while a request is in flight
  async function handleSubmit() {
    if (!isFormValid || loading) return;
    setSubmitError(null);
    setLoading(true);
    const res = await addData(
      "contact",
      formData as unknown as Record<string, unknown>,
    );
    setLoading(false);
    if (res?.success) {
      setFormData(EMPTY_FORM);
      setMessageSent(true);
    } else {
      setSubmitError(
        res?.message ?? "Failed to send message. Please try again.",
      );
    }
  }

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const isFormValid =
    formData.name !== "" && formData.email !== "" && formData.message !== "";

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && isFormValid) handleSubmit();
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-main/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section heading */}
        <AnimationWrapper className="text-center mb-12">
          <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Contact <span className="text-green-main">Me</span>
          </h2>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-green-main" />
          <p className="text-gray-500 mt-5 text-lg max-w-md mx-auto">
            Have a project in mind or just want to say hi? Fill out the form and
            I&apos;ll get back to you.
          </p>
        </AnimationWrapper>

        {/* Contact form card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-8 flex flex-col gap-4">
            {/* Name and email side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={INPUT_CLASS}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
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
                <AlertCircleIcon className="w-4 h-4 shrink-0" />
                {submitError}
              </div>
            )}

            {/* Success banner shown after message is sent */}
            {messageSent && (
              <div className="flex items-center gap-2 text-sm font-medium text-green-main bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                <CheckCircleIcon className="w-4 h-4 shrink-0" />
                Message sent successfully! I&apos;ll be in touch soon.
              </div>
            )}

            <button
              disabled={!isFormValid || loading}
              onClick={handleSubmit}
              className="mt-2 w-full py-3 px-8 bg-green-main text-white font-semibold rounded-lg text-base hover:opacity-90 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading && <SpinnerIcon />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
