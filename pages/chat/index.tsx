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

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center space-y-4">
      <div className="flex items-center justify-center gap-2 w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input type="file" id="file" ref={inputFile} onChange={handleChange} />
        </div>
        <Button
          disabled={uploading}
          onClick={() => inputFile.current.click()}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {data.map((fileItem) => (
        <div key={fileItem.id} className="flex flex-col items-center space-y-2">
          <img
            src={`https://black-tremendous-roundworm-416.mypinata.cloud/ipfs/${fileItem.ipfs_pin_hash}`}
            alt="Image from IPFS"
            className="max-w-full rounded-md shadow-md"
          />
          <Button
            variant="destructive"
            disabled={deleting}
            onClick={() => handleDelete(fileItem)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </Button>
        </div>
      ))}
    </main>
  );
}
