import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontWeight: 700,
          gap: 40,
        }}
      >
        <div style={{ fontSize: 128 }}>CLUB FORE</div>
        <div style={{ fontSize: 48, fontWeight: 400 }}>Precision. Power. Minimalism.</div>
      </div>
    ),
    size
  );
}
