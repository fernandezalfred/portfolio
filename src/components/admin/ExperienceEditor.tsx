'use client'

import { deleteData } from "@/services/api"
import FormInput from "@/components/ui/FormInput"

interface ExperienceItem {
  _id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  jobprofile: string;
}

type AllData = Record<string, unknown[]>;

interface ExperienceEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
  data: ExperienceItem[] | undefined;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

const controls = [
  { name: 'position', placeholder: 'e.g. Senior Developer', type: 'text', label: 'Position' },
  { name: 'company', placeholder: 'e.g. Acme Corp', type: 'text', label: 'Company' },
  { name: 'duration', placeholder: 'e.g. Jan 2021 – Present', type: 'text', label: 'Duration' },
  { name: 'location', placeholder: 'e.g. Remote / New York', type: 'text', label: 'Location' },
  { name: 'jobprofile', placeholder: 'Describe your role and responsibilities...', type: 'text', label: 'Job Profile' },
]

export default function ExperienceEditor({ formData, setFormData, handleSaveData, data, setAllData }: ExperienceEditorProps) {
  const handleDeleteItem = async (id: string) => {
    const response = await deleteData('experience', id)
    if (response.success) {
      const updatedData = data?.filter((item) => item._id !== id) ?? []
      setAllData((prevData) => ({ ...prevData, experience: updatedData }))
    } else {
      console.error("Failed to delete item", response.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing entries */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Existing Entries ({data?.length ?? 0})
        </h3>
        {data && data.length ? (
          <div className="space-y-3">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.position}</p>
                    <p className="text-blue-600 text-sm font-medium mt-0.5">{item.company}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                      <span>{item.duration}</span>
                      <span>{item.location}</span>
                    </div>
                    {item.jobprofile && (
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.jobprofile}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="shrink-0 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors border border-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm py-6 text-center bg-white border border-dashed border-gray-200 rounded-xl">
            No experience entries yet
          </p>
        )}
      </div>

      {/* Add new form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5">Add New Experience</h3>
        <FormInput controls={controls} formData={formData} setFormData={setFormData} />
        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => handleSaveData('experience')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Add Experience
          </button>
        </div>
      </div>
    </div>
  )
}
