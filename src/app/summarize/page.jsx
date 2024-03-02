"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

export default function Summarizer() {
  const { user, error, isLoading } = useUser();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [opened,setOpen] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  //   useEffect(
  //     function () {
  //       console.log(user);
  //     },
  //     [user]
  //   );
  return (
    user && (
      <>
        <div className=" flex">
          <header className=" bg-blue-400 h-screen w-2/12">
            <nav className=" text-white">
              <li className=" list-none border-b p-3">
                <a href="/profile">Dashboard</a>
              </li>
              <li className=" list-none bg-blue-600  p-3">Doctor Summarizer</li>
              <li className=" list-none  border-b p-3">
                <a href="/pricing">Pricing</a>
              </li>
              <li className=" list-none  border-b p-3">
                <a href="/settings">Setting</a>
              </li>
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
              <div class="flex flex-col gap-4 items-center justify-center w-1/2">
                <label
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
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
                <div className=" w-full flex justify-center">
                  <button className=" bg-black text-white px-10 py-4 uppercase rounded-md">
                    Summarize
                  </button>
                </div>
              </div>
              <div className="container flex-1 w-1/2 items-center justify-center">
                {opened === true ? (
                  <>
                    {imgSrc ? (
                      <img src={imgSrc} alt="webcam" />
                    ) : (
                      <Webcam height={350} width={350} ref={webcamRef} />
                    )}
                    <div className="btn-container">
                      <button
                        onClick={capture}
                        className=" bg-blue-500 text-white px-5 rounded-md m-3 py-3"
                      >
                        Capture photo
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className=" bg-red-600 text-white px-5 rounded-md m-3 py-3"
                      >
                        Close Camera
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <button
                        onClick={() => setOpen(true)}
                        className=" bg-blue-500 text-white px-5 rounded-md m-3 py-3"
                      >
                        Open Webcam
                      </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </>
    )
  );
}
