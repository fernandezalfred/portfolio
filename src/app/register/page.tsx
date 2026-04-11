"use client";

/**
 * Admin registration page (/register).
 *
 * Creates a new admin user via POST /api/auth/register.
 * Password must be at least 6 characters (enforced client-side and server-side).
 * On success, redirects directly to /admin (no sessionStorage flag needed here
 * because the server response creates the session).
 */

import FormInput from "@/components/ui/FormInput";
import { SpinnerIcon } from "@/components/ui/Icons";
import { register } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const controls = [
  { name: "username", placeholder: "Enter User Name", type: "text", label: "Enter User Name" },
  { name: "password", placeholder: "Enter Password", type: "password", label: "Enter Password" },
];

const initialFormData = { username: "", password: "" };

// Stricter than login: password requires a minimum of 6 characters
function validate(formData: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!formData.username.trim()) errors.username = "Username is required.";
  if (!formData.password) errors.password = "Password is required.";
  else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function RegisterPage() {
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

  async function handleRegister() {
    // Force-touch all fields so validation errors show on submit
    setTouched({ username: true, password: true });
    if (!isValid) return;
    setError("");
    setLoading(true);
    const res = await register(formData);
    setLoading(false);
    if (res?.success) {
      router.push("/admin");
    } else {
      setError(res?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-400 shadow-lg rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <FormInput
          controls={controls}
          formData={formData}
          setFormData={setFormData}
          onEnter={handleRegister}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
        />

        {error && <span className="text-red-700 text-sm font-semibold mt-2 block">{error}</span>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <SpinnerIcon />}
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/admin" className="text-blue-800 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
