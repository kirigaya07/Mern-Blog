/* eslint-disable no-unused-vars */
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const quillRef = useRef();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (res.ok) {
          setFormData(data.posts[0]);
          setPublishError(null);
        } else {
          setPublishError(data.message);
        }
      } catch (error) {
        setPublishError("Error fetching post");
      }
    };
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image to upload");
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().toISOString() + "-" + file.name;
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
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          setImageUploadProgress(null);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        navigate(`/post/${data.slug}`);
      } else {
        setPublishError(data.message);
      }
    } catch (error) {
      setPublishError("Error updating post");
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
    if (quillRef.current) {
      // Auto-adjust the height of the editor
      quillRef.current.getEditor().root.style.height = "auto";
      quillRef.current.getEditor().root.style.minHeight = "200px"; // Set a minimum height
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl font-semibold mb-6">
        Update Your Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            type="text"
            placeholder="Post Title"
            id="title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="flex-1"
            required
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ""}
            className="flex-1"
          >
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex items-center gap-4 border-2 border-teal-500 border-dotted p-4 rounded-lg">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1"
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            onClick={handleUploadImage}
            disabled={imageUploadProgress || !file}
            className="flex-shrink-0"
          >
            {imageUploadProgress ? (
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageUploadProgress / 100
                      })`,
                    },
                    text: {
                      fill: "#fff",
                      fontSize: "16px",
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded Preview"
            className="w-full h-auto rounded-lg object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          onChange={handleQuillChange}
          ref={quillRef}
          className="h-auto"
          placeholder="Write your content here..."
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" className="w-full">
          Update Post
        </Button>
        {publishError && (
          <Alert className="mt-4" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
