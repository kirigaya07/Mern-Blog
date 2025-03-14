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

  // Define custom toolbar options
  const toolbarOptions = [
    [{ font: [] }], // Font family
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels
    ["bold", "italic", "underline", "strike"], // Formatting
    [{ color: [] }, { background: [] }], // Text and background color
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ align: [] }], // Text alignment
    ["blockquote", "code-block"], // Blockquote and code
    ["link", "image"], // Links and images
    ["clean"], // Clear formatting
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
            setImageUploadError(null); // Fixed this line
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-4xl mx-auto min-h-screen"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center text-4xl my-8 font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text"
      >
        Create Your Post
      </motion.h1>

      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Title and Category Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Title
            </label>
            <TextInput
              type="text"
              placeholder="Enter your post title..."
              required
              id="title"
              className="w-full focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <Select
              className="w-full"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Featured Image
          </label>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-teal-500/30 dark:border-teal-500/20 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50"
            whileHover={{ scale: 1.01 }}
          >
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
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
                        path: { stroke: '#14B8A6' },
                        text: { fill: '#14B8A6', fontSize: '24px' }
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
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

        {/* Content Editor Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Post Content
          </label>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <ReactQuill
              theme="snow"
              placeholder="Start writing your post..."
              className="h-96 mb-12"
              required
              modules={modules}
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-end pt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            size="lg"
            className="w-full sm:w-auto font-semibold"
          >
            Publish Post
          </Button>
        </motion.div>

        {publishError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Alert color="failure" className="mt-5">
              {publishError}
            </Alert>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}
