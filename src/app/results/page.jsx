"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Result() {
  const [displayFile, setDisplayFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchParam = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:5001/api/parameter`);
      if (resp.ok) {
        const jsonData = await resp.json();
        // Assuming jsonData contains the correct structure with 'displayfile' property
        setDisplayFile(jsonData['displayFile']);
        setData(jsonData);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParam();
  },loading); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <div className="flex p-8 gap-4">
        <img
          className="w-1/2 max-h-80 rounded"
          src={displayFile} // Set the image source
          alt="Displayed Image"
        />
        <div className="border-2 w-1/2 p-2 px-4">
          <h2 className="text-2xl text-black underline">Report</h2>
          {/* Use the data object as needed */}
          <p>Some Report Data: 
            <br/>
            Disease Type {data['diseaseType']}
          </p>
        </div>
      </div>
    </>
  );
}
