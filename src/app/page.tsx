"use client";
import { useState } from 'react';

const CreateAndEditData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [work, setWork] = useState("");
  const [experience, setExperience] = useState("");
  const [createdName, setCreatedName] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);
  const [createdEducation, setCreatedEducation] = useState<string | null>(null);
  const [createdWork, setCreatedWork] = useState<string | null>(null);
  const [createdExperience, setCreatedExperience] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null); // State for the image
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempEducation, setTempEducation] = useState("");
  const [tempWork, setTempWork] = useState("");
  const [tempExperience, setTempExperience] = useState("");
  const [editField, setEditField] = useState<"name" | "email" | "education" | "work" | "experience" | null>(null);
  const [editImage, setEditImage] = useState(false); // State to control image editing

  const handleCreate = () => {
    setCreatedName(name);
    setCreatedEmail(email);
    setCreatedEducation(education);
    setCreatedWork(work);
    setCreatedExperience(experience);
    // Clear the input fields after creation
    setName("");
    setEmail("");
    setEducation("");
    setWork("");
    setExperience("");
  };

  const handleEdit = (field: "name" | "email" | "education" | "work" | "experience") => {
    setEditField(field);
    if (field === "name") {
      setTempName(createdName || "");
    } else if (field === "email") {
      setTempEmail(createdEmail || "");
    } else if (field === "education") {
      setTempEducation(createdEducation || "");
    } else if (field === "work") {
      setTempWork(createdWork || "");
    } else if (field === "experience") {
      setTempExperience(createdExperience || "");
    }
  };

  const handleSave = () => {
    if (editField === "name") {
      setCreatedName(tempName);
    } else if (editField === "email") {
      setCreatedEmail(tempEmail);
    } else if (editField === "education") {
      setCreatedEducation(tempEducation);
    } else if (editField === "work") {
      setCreatedWork(tempWork);
    } else if (editField === "experience") {
      setCreatedExperience(tempExperience);
    }
    setEditField(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditImage(false); // Close the image edit mode
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='  max-w-screen-xl mx-auto'>
        <div className=' '>
          <div className='bg-black'>
            <div className="p-6">
              <div className="mb-4">
                <label className="block mb-2 text-white">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white">Education:</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white">Work:</label>
                <input
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white">Experience:</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white">Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <button
                onClick={handleCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create Data
              </button>

              {(createdName !== null || createdEmail !== null || createdEducation !== null || createdWork !== null || createdExperience !== null || image !== null) && (
                <div className="mt-6">
                  {image && (
                    <div className="mb-4 flex items-center">
                      <img
                        src={image}
                        alt="Uploaded"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                      />
                      {editImage ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border rounded px-3 py-2 ml-4"
                          />
                          <button
                            onClick={() => setEditImage(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditImage(true)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                        >
                          Edit Image
                        </button>
                      )}
                    </div>
                  )}

                  {createdName !== null && (
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-white">Name: {createdName}</span>
                      {editField === "name" ? (
                        <>
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="border rounded px-3 py-2"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit("name")}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}

                  {createdEmail !== null && (
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-white">Email: {createdEmail}</span>
                      {editField === "email" ? (
                        <>
                          <input
                            type="email"
                            value={tempEmail}
                            onChange={(e) => setTempEmail(e.target.value)}
                            className="border rounded px-3 py-2"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit("email")}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}

                  {createdEducation !== null && (
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-white">Education: {createdEducation}</span>
                      {editField === "education" ? (
                        <>
                          <input
                            type="text"
                            value={tempEducation}
                            onChange={(e) => setTempEducation(e.target.value)}
                            className="border rounded px-3 py-2"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit("education")}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}

                  {createdWork !== null && (
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-white">Work: {createdWork}</span>
                      {editField === "work" ? (
                        <>
                          <input
                            type="text"
                            value={tempWork}
                            onChange={(e) => setTempWork(e.target.value)}
                            className="border rounded px-3 py-2"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit("work")}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}

                  {createdExperience !== null && (
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-white">Experience: {createdExperience}</span>
                      {editField === "experience" ? (
                        <>
                          <input
                            type="text"
                            value={tempExperience}
                            onChange={(e) => setTempExperience(e.target.value)}
                            className="border rounded px-3 py-2"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit("experience")}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAndEditData;
