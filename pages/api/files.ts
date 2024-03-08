import { NextResponse, NextRequest } from "next/server";
export const runtime = 'edge'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request: NextRequest) {
  if (request.method === "GET") {
    return handleGET(request);
  } else if (request.method === "POST") {
    return handlePOST(request);
  } 
  else if (request.method === "DELETE") {
    return handleDELETE(request);
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}

async function handleGET(request: NextRequest) {
  try {
    const res = await fetch("https://api.pinata.cloud/data/pinList", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function handlePOST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as File;

    data.append("pinataMetadata", JSON.stringify({ name: file.name }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });

    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return new Response(JSON.stringify({ IpfsHash }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function handleDELETE(request: NextRequest) {
  try {
    // Extract CID from the request URL
    const [, , , , cid] = request.nextUrl.pathname.split('/');
    
    const res = await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
