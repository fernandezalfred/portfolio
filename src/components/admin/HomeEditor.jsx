'use client'

import FormInput from "@/components/ui/FormInput"

const controls = [
  { name: 'heading', placeholder: 'Enter Heading Text', type: 'text', label: 'Enter Heading Text' },
  { name: 'summary', placeholder: 'Enter Carrar Summary', type: 'text', label: 'Enter Carrar Summary' },
]

export default function HomeEditor({ formData, setFormData, handleSaveData }) {
  return (
    <div className="w-full">
      <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormInput controls={controls} formData={formData} setFormData={setFormData} />
        <button
          onClick={() => handleSaveData('home')}
          className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
