'use client'

import FormInput from "@/components/ui/FormInput"

interface HomeEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
}

const controls = [
  { name: 'heading', placeholder: 'Enter Heading Text', type: 'text', label: 'Enter Heading Text' },
  { name: 'summary', placeholder: 'Enter Career Summary', type: 'text', label: 'Enter Career Summary' },
]

export default function HomeEditor({ formData, setFormData, handleSaveData }: HomeEditorProps) {
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
