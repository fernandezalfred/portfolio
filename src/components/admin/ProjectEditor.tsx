'use client'

import { deleteData } from "@/services/api"
import FormInput from "@/components/ui/FormInput"

interface ProjectItem {
  _id: string;
  name: string;
  website: string;
  technologies: string;
  github: string;
}

type AllData = Record<string, unknown[]>;

interface ProjectEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
  data: ProjectItem[] | undefined;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

const controls = [
  { name: 'name', placeholder: 'e.g. Portfolio Website', type: 'text', label: 'Project Name' },
  { name: 'website', placeholder: 'https://example.com', type: 'text', label: 'Website URL' },
  { name: 'technologies', placeholder: 'e.g. React, Next.js, Tailwind', type: 'text', label: 'Technologies' },
  { name: 'github', placeholder: 'https://github.com/user/repo', type: 'text', label: 'GitHub URL' },
]

export default function ProjectEditor({ formData, setFormData, handleSaveData, data, setAllData }: ProjectEditorProps) {
  const handleDeleteItem = async (id: string) => {
    const response = await deleteData('projects', id)
    if (response.success) {
      const updatedData = data?.filter((item) => item._id !== id) ?? []
      setAllData((prevData) => ({ ...prevData, projects: updatedData }))
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
          <div className="grid gap-3 sm:grid-cols-2">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-sm mt-1.5">{item.technologies}</p>
                    <div className="flex gap-3 mt-3">
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Website
                        </a>
                      )}
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
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
            No projects yet
          </p>
        )}
      </div>

      {/* Add new form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5">Add New Project</h3>
        <FormInput controls={controls} formData={formData} setFormData={setFormData} />
        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => handleSaveData('projects')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  )
}
