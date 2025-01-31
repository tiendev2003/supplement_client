import { PlusIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

export default function AddPostCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen p-6 transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Add New Category</h2>
        <div className="flex gap-2">
          <button
            className="bg-gray-700 px-4 text-white py-2 rounded-lg flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <XIcon size={16} /> Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 px-4 text-white py-2 rounded-lg flex items-center gap-2"
            onClick={handleSubmit}
          >
            <PlusIcon size={16} /> Add Category
          </button>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold">General Information</h3>
        <label className="block mt-4">
          <span className="text-sm text-gray-400">Category Name</span>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Type category name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mt-4">
          <span className="text-sm text-gray-400">Description</span>
          <textarea
            className="w-full p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Type category description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
    </div>
  );
}
