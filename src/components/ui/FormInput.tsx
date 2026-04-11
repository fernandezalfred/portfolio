'use client'

/**
 * Generic controlled form field renderer.
 *
 * Renders a labeled <input> for each item in `controls`.
 * Validation errors are shown only after the user has touched (blurred) the field,
 * preventing premature red highlights on first render.
 *
 * Usage:
 *   const controls = [{ name: 'email', type: 'email', label: 'Email', placeholder: '...' }]
 *   <FormInput controls={controls} formData={formData} setFormData={setFormData} />
 */

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
  onEnter?: () => void;
  errors?: Record<string, string>;
  /** Tracks which fields the user has visited. Errors are hidden until a field is touched. */
  touched?: Record<string, boolean>;
  onBlur?: (name: string) => void;
}

export default function FormInput({ controls, formData, setFormData, onEnter, errors, touched, onBlur }: FormInputProps) {
  return controls.map((controlItem) => {
    // Only show error styling once the user has visited the field
    const hasError = touched?.[controlItem.name] && errors?.[controlItem.name];
    return (
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
          onBlur={() => onBlur?.(controlItem.name)}
          onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
          className={`w-full px-4 py-2.5 border rounded-lg text-gray-800 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
            hasError
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {/* Inline validation message below the field */}
        {hasError && (
          <span className="mt-1 text-xs text-red-700 font-medium block">{errors![controlItem.name]}</span>
        )}
      </div>
    );
  });
}
