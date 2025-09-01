import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const url = req.nextUrl.searchParams.get("url");
    const filename = req.nextUrl.searchParams.get("filename");

    if (!url) {
        return NextResponse.json(
            { error: "No URL provided" },
            { status: 400 }
        );
    }

    try {
        //fetch image from cloudinay to download
        const res = await fetch(url);
        if (!res.ok) {
            return NextResponse.json(
                {
                    error: "Failed to fetch image"
                },
                {
                    status: res.status
                }
            )
        }

        const imgbuffer = await res.arrayBuffer();

        return new NextResponse(imgbuffer, {
            headers: {
                "Content-Type": res.headers.get("Content-Type") || "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        })

    } catch (error) {
            console.error("Download error:", error);
            return NextResponse.json(
                {
                    error: "Failed to download image"
                },
                {
                    status: 500
                }
            )
    }

}