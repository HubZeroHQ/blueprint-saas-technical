import { ImageResponse } from "next/og";

import { OgMark } from "@/components/brand/OgMark";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0f",
          padding: 80,
          border: "1px solid #24272f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <OgMark size={44} color="#6e87ff" />
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#e8e9ed",
              letterSpacing: -0.5,
            }}
          >
            {site.shortName}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 920,
          }}
        >
          <span
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: "#e8e9ed",
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {site.tagline}
          </span>
          <span style={{ fontSize: 24, color: "#a0a4b0" }}>
            nexora.hubzero.in
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
