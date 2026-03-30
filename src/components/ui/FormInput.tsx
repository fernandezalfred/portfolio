'use client'

interface Control {
  name: string;
  placeholder: string;
  type: string;
  label: string;
}

interface FormInputProps {
  controls: Control[];
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function FormInput({ controls, formData, setFormData }: FormInputProps) {
  return controls.map((controlItem) => (
    <div key={controlItem.name} className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {controlItem.label}
      </label>
      <input
        placeholder={controlItem.placeholder}
        type={controlItem.type}
        name={controlItem.name}
        value={formData[controlItem.name]}
        onChange={(e) =>
          setFormData({ ...formData, [controlItem.name]: e.target.value })
        }
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  ));
}
