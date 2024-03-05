// @ts-nocheck

"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Button } from "../../@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const inputFile = useRef(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/files", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Error fetching files");
      }
      const responseData = await res.json();
      setData(responseData.rows || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Fetch files when the component mounts
    fetchFiles();
  }, []);

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleDelete = async (fileItem) => {
    try {
      setDeleting(true);

      const res = await fetch(`/api/deleteFile/${fileItem.ipfs_pin_hash}`, {
        method: "DELETE",
      });

      const resData = await res.json();
      console.log(resData);

      setDeleting(false);
    } catch (e) {
      console.error(e);
      setDeleting(false);
      alert("Trouble deleting file");
    }
  };

  const handleCopyIpfsHash = (ipfsHash) => {
    navigator.clipboard.writeText(ipfsHash);
    alert("IPFS hash copied to clipboard!");
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-start items-center space-y-4">
      <div className="flex items-center justify-center gap-2 w-full mb-20 mt-20">
        <div className="w-full gap-2 max-w-md flex flex-col p-4 md:flex-row items-center justify-center">
          <Input type="file" id="file" ref={inputFile} onChange={handleChange} />
          <Button
            disabled={uploading}
            onClick={() => inputFile.current.click()}
            className="flex items-center justify-center submit-button bg-transparent hover:border-white text-center dark:text-white dark:hover:border-black border border-[#e536ab] text-black transition-all duration-300 rounded-full hover:text-white text-xs font-light w-full md:w-auto py-3 px-7 uppercase ring-0 outline-none"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 ">
        {data.map((fileItem) => (
          <div key={fileItem.id} className="flex flex-col items-center space-y-2">
            <div className="group shadow-md w-60 h-60 relative border border-white rounded-lg hover:scale-125">
              <img
                src={`https://black-tremendous-roundworm-416.mypinata.cloud/ipfs/${fileItem.ipfs_pin_hash}`}
                alt="Image from IPFS"
                className=" group-hover:opacity-25 transition-all duration-300 max-w-full rounded-md w-full h-full object-cover"
              />
              <div className="absolute top-[40%] left-[30%] hover:top-[38%] hover:left-[25%] flex items-center justify-center">
                <div className="hover:scale-125 hidden group-hover:block transition-all duration-300">
                  <button
                    disabled={deleting}
                    onClick={() => handleDelete(fileItem)}
                    className="hover:bg-red-500 text-white p-2 hover:p-4 transition-all duration-300 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
                <div className="hover:scale-125 hidden group-hover:block transition-all duration-300">
                  <button
                    disabled={deleting}
                    onClick={() => handleCopyIpfsHash(fileItem.ipfs_pin_hash)}
                    className="hover:bg-violet-500 text-white p-2 hover:p-4 transition-all duration-300 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
