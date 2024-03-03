"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSearchParams } from "next/navigation";

export default function Result(propos) {
  const [displayFile, setDisplayFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const searchParams = useSearchParams()
  const [modelRes,setModelRes] = useState(null);
 
  const res = searchParams.get('res')
  const desc = searchParams.get('desc')
  


  useEffect(() => {
    setDisplayFile(searchParams.get('displayfile'))
    const fetchParam = async () => {
      const url = `http://127.0.0.1:5001/api/gemini`; // Replace with your API endpoint URL
      const data = {
        desc: desc,
      };
  
      try {
        const response = await fetch(url, {
          method: "POST", // Use PUT for updating data
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(data), // Convert data to JSON and send in the request body
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          setModelRes(jsonResponse['res'])
          // Use Link component to navigate to "/results" with query parameters
          console.log("Data updated successfully:", jsonResponse);
        } else {
          setError("Failed to fetch data");
          setLoading(false);
          // Request failed
          console.error(
            "Failed to update data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
    };

    fetchParam();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
<>
  <div className="flex p-8 gap-4 bg-gray-100 rounded shadow-md">
    <img
      className="w-1/2 max-h-80 rounded object-cover"
      src={displayFile} // Set the image source
      alt="Displayed Image"
    />
    <div className="border-2 w-1/2 p-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Report</h2>
      {/* Use the data object as needed */}
      <p className="text-gray-800">Vascular lesions encompass various conditions affecting blood vessels, including angiomas, angiokeratomas, pyogenic granulomas, and hemorrhages. These lesions involve abnormal growth or clustering of blood vessels, leading to distinctive skin manifestations. Angiomas are benign tumors composed of blood vessels, while angiokeratomas are small, dark red to purple growths. Pyogenic granulomas are non-cancerous growths often triggered by minor trauma, appearing as red nodules. Hemorrhages refer to bleeding within or beneath the skin. Comprehensive diagnosis and treatment are crucial for managing vascular lesions, ensuring proper care and minimizing potential complications.</p>
    </div>
  </div>
</>

  );
}
