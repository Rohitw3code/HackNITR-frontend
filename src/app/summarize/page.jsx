"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";

export default function Summarizer() {
  const { user, error, isLoading } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);


  const pushPdf = async () => {
    const url = "http://127.0.0.1:5001/api/pdfread"; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const formData = new FormData();
    formData.append("pdfname", selectedFile);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        setResponse(jsonResponse['response'])
        // Handle success
        console.log("PDF successfully sent to the server");
      } else {
        // Handle error
        console.error("Error sending PDF to the server");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error.message);
    }
  };
  
  

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <>
        <div className="flex">
          <header className="bg-blue-400 h-screen w-2/12">
            <nav className="text-white">
              <li className="list-none border-b p-3">
                <a href="/profile">Dashboard</a>
              </li>
              <li className="list-none bg-blue-600 p-3">Doctor Summarizer</li>
              <li className="list-none  border-b p-3">
                <a href="/pricing">Pricing</a>
              </li>
              <li className="list-none  border-b p-3">
                <a href="/settings">Setting</a>
              </li>
            </nav>
          </header>
          <main className="w-full min-h-screen  bg-blue-100 p-4">
            <div className="flex gap-3 items-center">
              <img className="rounded-full w-20" src={user.picture} alt={user.name} />
              <div>
                <h2 className="font-semibold text-xl">Hello {"Rajeev"} 👋</h2>
                <h1 className="font-bold text-4xl">Welcome</h1>
              </div>
            </div>
            <div className="m-4 flex gap-4 justify-around">
              <div className="flex flex-col gap-4 items-center justify-center w-1/2">
                {/* PDF Dropzone */}
                <div
                  {...getRootProps()}
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                    isDragActive ? "border-blue-500" : "border-gray-300"
                  } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {selectedFile ? (
                      <>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Selected file: <span className="font-semibold">{selectedFile.name}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedFile.type}
                        </p>
                      </>
                    ) : (
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    )}
                  </div>
                  <input {...getInputProps()} className="hidden" />
                </div>
                <div onClick={pushPdf} className="w-full flex justify-center">
                  <button className="bg-black text-white px-10 py-4 uppercase rounded-md">
                    Summarize
                  </button>
                </div>
                {response}
              </div>
            </div>
          </main>
        </div>
      </>
    )
  );
}
