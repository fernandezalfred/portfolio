"use client";

/**
 * Admin login page (/login).
 *
 * Validates credentials via POST /api/auth/login.
 * On success, writes `authUser = true` to sessionStorage so the admin page
 * can gate access without a round-trip to the server on every navigation.
 */

import FormInput from "@/components/ui/FormInput";
import { SpinnerIcon } from "@/components/ui/Icons";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const controls = [
  { name: "username", placeholder: "Enter User Name", type: "text", label: "Enter User Name" },
  { name: "password", placeholder: "Enter Password", type: "password", label: "Enter Password" },
];

const initialFormData = { username: "", password: "" };

function validate(formData: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!formData.username.trim()) errors.username = "Username is required.";
  if (!formData.password) errors.password = "Password is required.";
  return errors;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const errors = validate(formData);
  const isValid = Object.keys(errors).length === 0;

  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleLogin() {
    // Force-touch all fields so validation errors show on submit
    setTouched({ username: true, password: true });
    if (!isValid) return;
    setError("");
    setLoading(true);
    const res = await login(formData);
    setLoading(false);
    if (res?.success) {
      // Persist auth flag in sessionStorage — admin page reads this on mount
      sessionStorage.setItem("authUser", JSON.stringify(true));
      router.push("/admin");
    } else {
      setError(res?.message || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-400 shadow-lg rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <FormInput
          controls={controls}
          formData={formData}
          setFormData={setFormData}
          onEnter={handleLogin}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
        />

        {error && <span className="text-red-700 text-sm font-semibold mt-2 block">{error}</span>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <SpinnerIcon />}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-800 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
