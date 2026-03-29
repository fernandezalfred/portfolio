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
      <label className="block text-gray-700 text-sm font-bold mb-2">
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
        className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none focus:shadow-outline"
      />
    </div>
  ))
}
