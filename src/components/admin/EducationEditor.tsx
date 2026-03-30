'use client'

import { deleteData } from "@/services/api"
import FormInput from "@/components/ui/FormInput"

interface EducationItem {
  _id: string;
  degree: string;
  year: string;
  college: string;
}

type AllData = Record<string, Array<Record<string, string>>>;

interface EducationEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
  data: EducationItem[] | undefined;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

const controls = [
  { name: 'degree', placeholder: 'e.g. B.Sc. Computer Science', type: 'text', label: 'Degree Name' },
  { name: 'year', placeholder: 'e.g. 2019 – 2023', type: 'text', label: 'Year' },
  { name: 'college', placeholder: 'e.g. MIT', type: 'text', label: 'College / University' },
]

export default function EducationEditor({ formData, setFormData, handleSaveData, data, setAllData }: EducationEditorProps) {
  const handleDeleteItem = async (id: string) => {
    const response = await deleteData('education', id)
    if (response.success) {
      const updatedData = data?.filter((item) => item._id !== id) ?? []
      setAllData((prevData) => ({ ...prevData, education: updatedData }))
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
                    <p className="font-semibold text-gray-900">{item.degree}</p>
                    <p className="text-blue-600 text-sm font-medium mt-0.5">{item.college}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.year}</p>
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
            No education entries yet
          </p>
        )}
      </div>

      {/* Add new form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5">Add New Education</h3>
        <FormInput controls={controls} formData={formData} setFormData={setFormData} />
        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => handleSaveData('education')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Add Education
          </button>
        </div>
      </div>
    </div>
  )
}
