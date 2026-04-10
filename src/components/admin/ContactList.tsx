'use client'

import { useState } from "react";
import { deleteData } from "@/services/api";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

type AllData = Record<string, unknown[]>;

interface ContactListProps {
  data: ContactItem[] | undefined;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

export default function ContactList({ data, setAllData }: ContactListProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    const response = await deleteData("contact", id);
    if (response.success) {
      const updated = data?.filter((item) => item._id !== id) ?? [];
      setAllData((prev) => ({ ...prev, contact: updated }));
    } else {
      setDeleteError(response?.message ?? "Failed to delete contact");
    }
  };

  if (!data || !data.length) {
    if (deleteError) {
      return (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {deleteError}
        </div>
      );
    }
    return (
      <p className="text-gray-400 text-sm py-10 text-center bg-white border border-dashed border-gray-200 rounded-xl">
        No contact messages yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {deleteError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {deleteError}
        </div>
      )}
      <p className="text-sm text-gray-500">{data.length} message{data.length !== 1 ? "s" : ""}</p>
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <a
                href={`mailto:${item.email}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium break-all"
              >
                {item.email}
              </a>
              {item.createdAt && (
                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="shrink-0 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors border border-red-200"
            >
              Delete
            </button>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{item.message}</p>
        </div>
      ))}
    </div>
  );
}
