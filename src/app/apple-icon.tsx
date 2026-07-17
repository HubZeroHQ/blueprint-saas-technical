import { ImageResponse } from "next/og";

import { OgMark } from "@/components/brand/OgMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0f",
        }}
      >
        <OgMark size={110} color="#6e87ff" />
      </div>
    ),
    { ...size }
  );
}
