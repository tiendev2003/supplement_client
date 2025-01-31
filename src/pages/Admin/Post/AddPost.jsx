import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function AddPost() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
        setError("");
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError("");
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data) => {
    data.tags = tags;
    data.image = image;
    console.log(data);
    // Handle form submission
    reset();
  };

  return (
    <div className="min-h-screen p-6 transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Post</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-gray-700 px-4 text-white py-2 rounded-lg flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <XIcon size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 px-4 text-white py-2 rounded-lg flex items-center gap-2"
            >
              <PlusIcon size={16} /> Add Post
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
            <h3 className="text-lg font-semibold">Thumbnail</h3>
            <p className="text-sm text-gray-400">Photo</p>
            <label className="border-dashed border-2 flex flex-col items-center justify-center h-40 rounded-lg cursor-pointer border-gray-400 dark:border-gray-600">
              {image ? (
                <div className="relative h-full w-full">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <XIcon size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p>Drag and drop image here, or click add image</p>
                  <button
                    className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    Add Image
                  </button>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="md:col-span-2 p-4 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
            <h3 className="text-lg font-semibold">General Information</h3>
            <label className="block mt-4">
              <span className="text-sm text-gray-400">Title</span>
              <input
                type="text"
                className="w-full p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Type post title here..."
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </label>
            <label className="block mt-4">
              <span className="text-sm text-gray-400">Content</span>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    modules={modules}
                    formats={formats}
                    className="bg-white text-black dark:bg-gray-700 dark:text-white"
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </label>
            <label className="block mt-4">
              <span className="text-sm text-gray-400">Category</span>
              <select
                className="w-full p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                {...register("categoryId", {
                  required: "Category is required",
                })}
              >
                <option value="">Select category</option>
                {/* Add category options here */}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </label>
            <label className="block mt-4">
              <span className="text-sm text-gray-400">Tags</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Type tag and press enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <button
                  type="button"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleAddTag}
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 text-black dark:bg-gray-700 dark:text-white px-2 py-1 rounded-lg flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </label>
            <label className="block mt-4">
              <span className="text-sm text-gray-400">Status</span>
              <select
                className="w-full p-2 border rounded-lg mt-1 border-gray-400 bg-white text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                {...register("status", { required: "Status is required" })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
