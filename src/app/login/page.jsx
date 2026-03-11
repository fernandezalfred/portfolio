"use client";

import FormInput from "@/components/ui/FormInput";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const controls = [
  { name: "username", placeholder: "Enter User Name", type: "text", label: "Enter User Name" },
  { name: "password", placeholder: "Enter Password", type: "password", label: "Enter Password" },
];

const initialFormData = { username: "", password: "" };

export default function LoginPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setError("");
    const res = await login(formData);
    if (res?.success) {
      // Persist auth state and navigate to the admin dashboard
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

        <FormInput controls={controls} formData={formData} setFormData={setFormData} />

        {error && <p className="text-red-700 text-sm font-semibold mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
        >
          Login
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
