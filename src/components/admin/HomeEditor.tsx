'use client'

import FormInput from "@/components/ui/FormInput"

interface HomeEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
}

const controls = [
  { name: 'heading', placeholder: 'e.g. Full Stack Developer', type: 'text', label: 'Heading Text' },
  { name: 'summary', placeholder: 'e.g. Passionate developer with 5 years of experience...', type: 'text', label: 'Career Summary' },
]

export default function HomeEditor({ formData, setFormData, handleSaveData }: HomeEditorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-5">Edit Home Section</h3>
      <FormInput controls={controls} formData={formData} setFormData={setFormData} />
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => handleSaveData('home')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
