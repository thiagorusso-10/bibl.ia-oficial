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
                    background: "white",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "20px solid black",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 100,
                        marginBottom: 20,
                    }}
                >
                    ✝
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontWeight: 900,
                        fontSize: 80,
                        letterSpacing: '-0.05em',
                    }}
                >
                    BIBL.IA OFICIAL
                </div>
                <div
                    style={{
                        fontSize: 40,
                        marginTop: 20,
                        color: '#555',
                        textAlign: 'center',
                        maxWidth: '80%',
                    }}
                >
                    Teologia Descomplicada & Kids Fun
                </div>
                {/* Decorative elements */}
                <div style={{ position: 'absolute', top: 40, left: 40, width: 40, height: 40, background: '#FEF08A', border: '4px solid black' }} />
                <div style={{ position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, background: '#E9D5FF', border: '4px solid black', borderRadius: '50%' }} />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
