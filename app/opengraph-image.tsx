import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "IWS - International Warehouse & Shipping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #2b2620 0%, #1d3e7c 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              background: "white",
              borderRadius: 24,
              padding: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={96} height={96} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700, color: "white" }}>
              IWS
            </div>
            <div style={{ fontSize: 24, color: "#c9d3e6" }}>
              International Warehouse &amp; Shipping
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Full-service warehousing &amp; Foreign Trade Zone services
          </div>
          <div style={{ fontSize: 28, color: "#e7e2d6" }}>
            Mobile, AL &middot; Pensacola, FL &middot; Houston, TX
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
