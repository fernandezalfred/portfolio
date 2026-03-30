'use client'

import FormInput from "@/components/ui/FormInput"

interface AboutEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
}

const controls = [
  { name: 'aboutme', placeholder: 'Write a short bio about yourself...', type: 'text', label: 'About Me' },
  { name: 'noofprojects', placeholder: 'e.g. 20', type: 'text', label: 'Number of Projects' },
  { name: 'yearofexerience', placeholder: 'e.g. 5', type: 'text', label: 'Years of Experience' },
  { name: 'noofclients', placeholder: 'e.g. 15', type: 'text', label: 'Number of Clients' },
  { name: 'skills', placeholder: 'e.g. React, Node.js, MongoDB', type: 'text', label: 'Skills' },
]

export default function AboutEditor({ formData, setFormData, handleSaveData }: AboutEditorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-5">Edit About Page</h3>
      <FormInput controls={controls} formData={formData} setFormData={setFormData} />
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => handleSaveData('about')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
