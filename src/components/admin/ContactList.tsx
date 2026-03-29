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
  return (
    <div className="flex flex-col gap-5">
      {data && data.length
        ? data.map((item) => (
            <div key={item._id} className="p-5 border">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.message}</p>
            </div>
          ))
        : null}
    </div>
  )
}
