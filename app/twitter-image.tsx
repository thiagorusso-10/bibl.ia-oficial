import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "BIBL.IA OFICIAL";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 60,
                    background: "#FEF08A", // Yellow background
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "20px solid black",
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontWeight: 900,
                        fontSize: 120,
                        letterSpacing: '-0.05em',
                    }}
                >
                    BIBL.IA
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
