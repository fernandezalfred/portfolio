'use client'

/**
 * Admin editor for portfolio projects.
 *
 * Two-section layout:
 *  1. "Existing Entries" — card grid of all saved projects with a delete button each.
 *  2. "Add New Project" — form to create a new project via POST /api/projects.
 *
 * Deleting a project calls DELETE /api/projects/:id and removes it from the
 * shared `allData` state so the list updates without a page reload.
 */

import { useState } from "react"
import { deleteData } from "@/services/api"
import FormInput from "@/components/ui/FormInput"
import { AlertCircleIcon } from "@/components/ui/Icons"

export interface ProjectItem {
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
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    const response = await deleteData('projects', id)
    if (response.success) {
      // Remove the deleted item from local state without a full refetch
      const updatedData = data?.filter((item) => item._id !== id) ?? []
      setAllData((prevData) => ({ ...prevData, projects: updatedData }))
    } else {
      setDeleteError(response?.message ?? "Failed to delete project");
    }
  }

  return (
    <div className="space-y-6">
      {deleteError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {deleteError}
        </div>
      )}

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
                    onClick={() => handleDelete(item._id)}
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
