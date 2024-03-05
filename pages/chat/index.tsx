// @ts-nocheck

"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [file, setFile] = useState("");
    const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState([]);

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
    }

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

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };

    return (
        <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
            <input type="file" id="file" ref={inputFile} onChange={handleChange} />
            <button disabled={uploading} onClick={() => inputFile.current.click()}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {data.map((fileItem) => (
                <div key={fileItem.id}>
                    <img
                        src={`https://black-tremendous-roundworm-416.mypinata.cloud/ipfs/${fileItem.ipfs_pin_hash}`}
                        alt="Image from IPFS"
                    />
                </div>
            ))}
        </main>
    );
}
