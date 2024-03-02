"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect,useState } from "react";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [file, setFile] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // useEffect(
  //   function () {
  //     console.log(user);
  //   },
  //   [user]
  // );
  return (
    user && (
      <>
        <div className=" flex">
          <header className=" bg-blue-400 h-screen w-2/12">
            <nav className=" text-white">
              <li className=" list-none bg-blue-600 p-3">HOME</li>
              <li className=" list-none border-b  p-3">
                <a href="/summarize">Doctor Summarizer</a></li>
              <li className=" list-none  border-b p-3">
                <a href="/pricing">Pricing</a></li>
              <li className=" list-none  border-b p-3">
                <a href="/settings">Settings</a></li>
            </nav>
          </header>
          <main className=" w-full min-h-screen  bg-blue-100 p-4">
            <div className=" flex gap-3 items-center">
              <img
                className=" rounded-full w-20"
                src={user.picture}
                alt={user.name}
              />
              <div>
                <h2 className=" font-semibold text-xl">Hello {"Rajeev"} 👋</h2>
                <h1 className=" font-bold text-4xl">Welcome</h1>
              </div>
            </div>
            <div className=" m-4 flex gap-4 justify-around">
              <div class="flex items-center justify-center w-1/2">
                {file === null ? <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden"  onChange={handleChange}/>
                </label>
                : (<>
                <img src={file} onClick={() => setFile(null)} />
                </>)}
              </div>

              <form class="w-1/2 mx-auto">
                <label
                  for="small"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MRI Scan
                </label>
                <select
                  id="small"
                  class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="US" selected>None</option>
                  <option value="brain">Brain Tumour</option>
                  <option value="bone">Bone Fracture</option>
                </select>
                <label
                  for="default"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Normal Image
                </label>
                <select
                  id="default"
                  class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>None</option>
                  <option value="normal" >Normal Image</option>
                </select>
                <label
                  for="large"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  X-ray Scan
                </label>
                <select
                  id="large"
                  class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="none" selected>None</option>
                  <option value="xray" >X-ray Scan</option>
                </select>
              </form>
            </div>
            <div className=" w-full flex justify-center">
              <a href="/results" className=" bg-black text-white px-10 py-4 uppercase rounded-md">
                Analyze
              </a>
            </div>
          </main>
        </div>
      </>
    )
  );
}
