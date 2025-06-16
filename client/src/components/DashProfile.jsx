/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaKey,
  FaSignOutAlt,
  FaTrash,
  FaUserCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (!result.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const result = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (!result.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-8 text-white">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer group"
                onClick={() => filePickerRef.current.click()}
              >
                {imageFileUploadProgress && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <CircularProgressbar
                      value={imageFileUploadProgress || 0}
                      text={`${imageFileUploadProgress}%`}
                      strokeWidth={5}
                      styles={{
                        root: {
                          width: "80%",
                          height: "80%",
                        },
                        path: {
                          stroke: "#fff",
                        },
                        text: {
                          fill: "#fff",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                )}
                <img
                  src={imageFileUrl || currentUser.profilePicture}
                  alt="user"
                  className={`w-full h-full object-cover ${
                    imageFileUploadProgress && imageFileUploadProgress < 100
                      ? "opacity-60"
                      : ""
                  }`}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaCamera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
              />
            </div>
            <h1 className="text-2xl font-bold mt-4">{currentUser.username}</h1>
            <p className="text-white/80">{currentUser.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4" />
              <span className="text-sm">
                {currentUser.isAdmin ? "Administrator" : "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {imageFileUploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert color="failure">{imageFileUploadError}</Alert>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <TextInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="h-5 w-5 text-gray-400" />
                  </div>
                  <TextInput
                    type="password"
                    id="password"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </div>

            {updateUserSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert color="success">{updateUserSuccess}</Alert>
              </motion.div>
            )}
            {updateUserError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert color="failure">{updateUserError}</Alert>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                className="w-full sm:w-auto"
                disabled={loading || imageFileUploading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                outline
                className="w-full sm:w-auto"
                onClick={handleSignOut}
              >
                <FaSignOutAlt className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
              <Button
                type="button"
                gradientDuoTone="pinkToOrange"
                outline
                className="w-full sm:w-auto"
                onClick={() => setShowModal(true)}
              >
                <FaTrash className="mr-2 h-5 w-5" />
                Delete Account
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mx-auto mb-4" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
              <Button gradientDuoTone="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}
