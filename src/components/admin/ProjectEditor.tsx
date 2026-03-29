'use client'

import FormInput from "@/components/ui/FormInput"

interface ProjectItem {
  _id: string;
  name: string;
  website: string;
  technologies: string;
  github: string;
}

interface ProjectEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
  data: ProjectItem[] | undefined;
}

const controls = [
  { name: 'name', placeholder: 'Project name', type: 'text', label: 'Project name' },
  { name: 'website', placeholder: 'Website Name', type: 'text', label: 'Website Name' },
  { name: 'technologies', placeholder: 'Enter Technologies', type: 'text', label: 'Enter Technologies' },
  { name: 'github', placeholder: 'Github', type: 'text', label: 'Github' },
]

export default function ProjectEditor({ formData, setFormData, handleSaveData, data }: ProjectEditorProps) {
  return (
    <div className="w-full">
      <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-10 space-y-6">
          {data && data.length ? (
            data.map((item) => (
              <div key={item._id} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300">
                <p className="text-lg font-semibold text-gray-700">Name: {item.name}</p>
                <p className="text-lg text-gray-700">
                  <a href={item.website} target="_blank" rel="noopener noreferrer">Website: {item.website}</a>
                </p>
                <p className="text-lg text-gray-700">Technologies: {item.technologies}</p>
                <p className="text-lg text-gray-700">
                  <a href={item.github} target="_blank" rel="noopener noreferrer">Github: {item.github}</a>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No project data available</p>
          )}
        </div>

        <FormInput controls={controls} formData={formData} setFormData={setFormData} />
        <button
          onClick={() => handleSaveData('projects')}
          className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md"
        >
          Add Project
        </button>
      </div>
    </div>
  )
}
