import { ImageResponse } from "next/og";

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 100,
                    background: "#FEF08A", // Neo Yellow
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                    border: "8px solid black",
                }}
            >
                ✝
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
