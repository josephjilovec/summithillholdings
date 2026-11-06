import { ImageResponse } from "next/og";

export const alt = "Summit Hill Holdings — founder, ventures, technology and creative work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#07090b", color: "#f4f1e9", padding: "68px", fontFamily: "Arial, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", width: 520, height: 520, border: "1px solid rgba(85,217,255,.22)", borderRadius: "50%", right: -80, top: -140 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#f4f1e9", color: "#07090b", fontSize: 18, fontWeight: 900 }}>SH</div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 22, fontWeight: 700 }}>Summit Hill Holdings</span><span style={{ marginTop: 4, color: "#9ca8b2", fontSize: 14, letterSpacing: 4 }}>HOLDINGS</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}><span style={{ color: "#55d9ff", fontSize: 16, letterSpacing: 4 }}>SUMMIT HILL HOLDINGS · HOLDINGS</span><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: .94, letterSpacing: -5, fontWeight: 650, marginTop: 18 }}><span>Concepts built to</span><span>become companies.</span></div></div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca8b2", fontSize: 15 }}><span>PHOENIX, ARIZONA</span><span>summithillholdings.com</span></div>
    </div>,
    size
  );
}
