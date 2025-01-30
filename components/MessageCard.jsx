"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true); // Signal that hydration is complete
    setIsRead(message.read); // Set the state with the server-rendered value
  }, [message.read]);
  if (!hydrated) return null; // Prevent rendering until hydrated

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnreadCount((prevCount) => ( read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    await deleteMessage(message._id);

    setIsDelete(true);
    setUnreadCount((prevCount) => (prevCount === 0 ? prevCount = 0 : prevCount - 1));
    toast.success("Message Deleted");
  };

  if (isDelete) return <p>Deleted message</p>;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-4 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 mr-3 bg-red-500 text-white py-1 px-4 rounded-md"
      >
        Delete Message
      </button>
    </div>
  );
};
export default MessageCard;
