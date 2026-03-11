"use client";

import FormInput from "@/components/ui/FormInput";
import { register } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const controls = [
  { name: "username", placeholder: "Enter User Name", type: "text", label: "Enter User Name" },
  { name: "password", placeholder: "Enter Password", type: "password", label: "Enter Password" },
];

const initialFormData = { username: "", password: "" };

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister() {
    setError("");
    const res = await register(formData);
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

        <FormInput controls={controls} formData={formData} setFormData={setFormData} />

        {error && <p className="text-red-700 text-sm font-semibold mt-2">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
        >
          Register
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
