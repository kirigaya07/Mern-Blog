import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image to upload");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-10" />
            <div className="relative px-6 py-8 sm:px-12 sm:py-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
                Create Your Post
              </h1>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Share your thoughts and ideas with the world
              </p>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-6 sm:p-8 space-y-8"
            onSubmit={handleSubmit}
          >
            {/* Title and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Post Title
                </label>
                <TextInput
                  type="text"
                  placeholder="Enter your post title..."
                  required
                  id="title"
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <Select
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="uncategorized">Select a category</option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React.js</option>
                  <option value="nextjs">Next.js</option>
                </Select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured Image
              </label>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50"
                whileHover={{ scale: 1.01 }}
              >
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="flex-1"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    gradientDuoTone="purpleToPink"
                    outline
                    onClick={handleUploadImage}
                    disabled={imageUploadProgress}
                    className="w-full sm:w-auto"
                  >
                    {imageUploadProgress ? (
                      <div className="w-16 h-16">
                        <CircularProgressbar
                          value={imageUploadProgress}
                          text={`${imageUploadProgress || 0}%`}
                          styles={{
                            path: { stroke: "#8B5CF6" },
                            text: { fill: "#8B5CF6", fontSize: "24px" },
                          }}
                        />
                      </div>
                    ) : (
                      "Upload Image"
                    )}
                  </Button>
                </motion.div>
              </motion.div>

              {imageUploadError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Alert color="failure" className="font-medium">
                    {imageUploadError}
                  </Alert>
                </motion.div>
              )}

              {formData.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={formData.image}
                    alt="uploaded"
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              )}
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Post Content
              </label>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <ReactQuill
                  theme="snow"
                  placeholder="Start writing your post..."
                  className="h-96 mb-12"
                  required
                  modules={modules}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                />
              </div>
            </div>

            {/* Error Message */}
            {publishError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert color="failure" className="font-medium">
                  {publishError}
                </Alert>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              className="flex justify-end pt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                size="lg"
                className="w-full sm:w-auto font-semibold"
              >
                Publish Post
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
