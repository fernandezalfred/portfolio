'use client'

interface ExperienceEditorProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveData: (resource: string) => void;
}

export default function ExperienceEditor({ formData, setFormData, handleSaveData }: ExperienceEditorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Experience Description
        </label>
        <textarea
          rows={6}
          value={formData.text ?? ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
          placeholder="Describe your professional experience..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <p className="text-xs text-gray-400 mt-1.5">
          This text will be displayed in the Experience section of your portfolio.
        </p>
      </div>

      <div className="pt-2 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => handleSaveData('experience')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Save Experience
        </button>
      </div>
    </div>
  )
}
