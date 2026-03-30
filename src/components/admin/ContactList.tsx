'use client'

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  message: string;
}

interface ContactListProps {
  data: ContactItem[] | undefined;
}

export default function ContactList({ data }: ContactListProps) {
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
            <a
              href={`mailto:${item.email}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {item.email}
            </a>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{item.message}</p>
        </div>
      ))}
    </div>
  )
}
