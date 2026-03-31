'use client'

import { deleteData } from "@/services/api";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  message: string;
}

type AllData = Record<string, unknown[]>;

interface ContactListProps {
  data: ContactItem[] | undefined;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

export default function ContactList({ data, setAllData }: ContactListProps) {
  const handleDelete = async (id: string) => {
    const response = await deleteData("contact", id);
    if (response.success) {
      const updated = data?.filter((item) => item._id !== id) ?? [];
      setAllData((prev) => ({ ...prev, contact: updated }));
    } else {
      console.error("Failed to delete contact", response.message);
    }
  };

  if (!data || !data.length) {
    return (
      <p className="text-gray-400 text-sm py-10 text-center bg-white border border-dashed border-gray-200 rounded-xl">
        No contact messages yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">{data.length} message{data.length !== 1 ? "s" : ""}</p>
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <p className="font-semibold text-gray-900">{item.name}</p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${item.email}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {item.email}
              </a>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors border border-red-200"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{item.message}</p>
        </div>
      ))}
    </div>
  );
}
