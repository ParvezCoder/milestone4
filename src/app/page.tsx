"use client";
import { useState } from "react";
import jsPDF from "jspdf";

const CreateAndEditData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [work, setWork] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [createdName, setCreatedName] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);
  const [createdEducation, setCreatedEducation] = useState<string | null>(null);
  const [createdWork, setCreatedWork] = useState<string | null>(null);
  const [createdExperience, setCreatedExperience] = useState<string | null>(null);
  const [uniqueURL, setUniqueURL] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    setCreatedName(name);
    setCreatedEmail(email);
    setCreatedEducation(education);
    setCreatedWork(work);
    setCreatedExperience(experience);

    // Generate unique URL using the name
    setUniqueURL(`https://your-app-url.vercel.app/${name}`);

    // Clear the input fields after creation
    setName("");
    setEmail("");
    setEducation("");
    setWork("");
    setExperience("");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add text data
    doc.text(`Name: ${createdName}`, 10, 10);
    doc.text(`Email: ${createdEmail}`, 10, 20);
    doc.text(`Education: ${createdEducation}`, 10, 30);
    doc.text(`Work: ${createdWork}`, 10, 40);
    doc.text(`Experience: ${createdExperience}`, 10, 50);

    // Add image to PDF if available
    if (imageBase64) {
      doc.addImage(imageBase64, "JPEG", 10, 60, 50, 50); // Adjust position and size as needed
    }

    doc.save("resume.pdf");
  };

  const handleShareLink = () => {
    if (uniqueURL) {
      navigator.clipboard.writeText(uniqueURL);
      alert("Resume link copied to clipboard!");
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-black p-6">
          {/* Input Fields */}
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

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 text-white">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Create Resume Button */}
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Resume
          </button>

          {/* Display Created Resume and Actions */}
          {(createdName || createdEmail || createdEducation || createdWork || createdExperience || imageBase64) && (
            <div className="mt-6 text-white">
              <p><strong>Created Resume:</strong></p>
              <p>Name: {createdName}</p>
              <p>Email: {createdEmail}</p>
              <p>Education: {createdEducation}</p>
              <p>Work: {createdWork}</p>
              <p>Experience: {createdExperience}</p>

              {/* Display Image */}
              {imageBase64 && <img src={imageBase64} alt="Uploaded" className="mt-4 w-32 h-32 object-cover" />}

              {/* Unique URL */}
              {uniqueURL && (
                <div className="mt-4">
                  <p>Shareable Link: <a href={uniqueURL} target="_blank" className="text-blue-300">{uniqueURL}</a></p>
                  <button
                    onClick={handleShareLink}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Copy Link to Share
                  </button>
                </div>
              )}

              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Download as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAndEditData;
