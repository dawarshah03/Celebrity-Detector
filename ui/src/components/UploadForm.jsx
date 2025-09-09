import React, { useState, useRef } from "react";
import axios from "axios";
import { 
  IoImageOutline, 
  IoSearchOutline, 
  IoRefreshOutline, 
  IoInformationCircleOutline, 
  IoCloudUploadOutline, 
  IoHardwareChipOutline, 
  IoCheckmarkDoneCircleOutline, 
  IoLogoGithub, 
  IoLogoLinkedin 
} from "react-icons/io5";

function CelebrityRecognizer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,webp,gif}", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const sampleCelebrities = Object.keys(images)
    .sort()
    .slice(0, 15)
    .map((p, i) => ({
      id: i + 1,
      image: images[p],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image first!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.response || res.data.error || "Something went wrong");
    } catch (err) {
      setResult("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer?.files;
    if (!files || !files.length) return;

    const droppedFile = files[0];
    if (!droppedFile.type.startsWith("image/")) {
      alert("Please drop an image file.");
      return;
    }

    setFile(droppedFile);
    setPreviewUrl(URL.createObjectURL(droppedFile));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">

      <header className="bg-[#212529] shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-[#f8f9fa]">CelebrityFace ID</h1>
          <p className="text-center text-[#adb5bd] mt-2">
            Upload a photo to recognize celebrities using AI!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white shadow-lg rounded-xl p-6 border border-[#dee2e6]">
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 text-center">Upload Photo</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full h-64 p-6 border-2 border-dashed rounded-xl cursor-pointer flex flex-col items-center justify-center text-center transition-colors
                  ${dragActive ? "border-[#495057] bg-[#f8f9fa]" : "border-[#adb5bd]"}`}
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-lg mb-4" />
                  </div>
                ) : (
                  <>
                    <IoImageOutline className="w-16 h-16 text-[#6c757d] mb-4" />
                    <p className="text-[#6c757d]">Drag & drop an image here, or click to browse</p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#212529] text-white py-3 px-4 rounded-lg hover:bg-[#343a40] transition disabled:opacity-50 font-medium text-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <IoRefreshOutline className="animate-spin mr-3 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <IoSearchOutline className="mr-2" />
                    Analyze Image
                  </>
                )}
              </button>
            </form>

            {result && (
              <div className="mt-6 p-4 border border-[#dee2e6] rounded-lg bg-[#f8f9fa]">
                <h3 className="font-semibold text-[#212529] text-lg flex items-center">
                  <IoInformationCircleOutline className="mr-2" />
                  Recognition Result:
                </h3>
                <p className="text-[#495057] mt-2">{result}</p>
              </div>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border border-[#dee2e6]">
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 text-center">Try These Samples</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {sampleCelebrities.map((celebrity) => (
                <div 
                  key={celebrity.id} 
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <img 
                    src={celebrity.image} 
                    alt="Sample celebrity" 
                    className="w-full h-24 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-[#dee2e6]">
              <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCloudUploadOutline className="w-8 h-8 text-[#495057]" />
              </div>
              <h3 className="text-xl font-semibold text-[#212529] mb-2">Upload Image</h3>
              <p className="text-[#6c757d]">Upload a clear photo of a celebrity's face using our drag & drop interface or file browser.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-[#dee2e6]">
              <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-4">
                <IoHardwareChipOutline className="w-8 h-8 text-[#495057]" />
              </div>
              <h3 className="text-xl font-semibold text-[#212529] mb-2">AI Analysis</h3>
              <p className="text-[#6c757d]">Our advanced AI model analyzes facial features and compares them to our celebrity database.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-[#dee2e6]">
              <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCheckmarkDoneCircleOutline className="w-8 h-8 text-[#495057]" />
              </div>
              <h3 className="text-xl font-semibold text-[#212529] mb-2">Get Results</h3>
              <p className="text-[#6c757d]">Receive instant recognition results with the celebrity's name and additional information.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#212529] text-[#f8f9fa] mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">CelebrityFace ID</h3>
              <p className="text-[#adb5bd]">AI-powered celebrity recognition</p>
            </div>
            <div className="flex space-x-4">
            <a href="https://github.com/yourusername" className="flex flex-col items-center text-white hover:text-gray-300 transition">             <IoLogoGithub className="w-6 h-6 text-white" />  
              <span className="text-sm mt-1 text-white">GitHub</span>
              
            </a>

              <a href="https://linkedin.com/in/yourusername" className="flex flex-col items-center text-white hover:text-gray-300 transition">
                <IoLogoLinkedin className="w-6 h-6 text-white" />
                <span className="text-sm mt-1 text-white">LinkedIn</span>
            </a>
            </div>
          </div>
          <div className="text-center text-[#adb5bd] mt-6">
            <p>© {new Date().getFullYear()} CelebrityFace ID. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CelebrityRecognizer;