"use client";

export function VentureUniverseTrigger({ label = "Explore the Portfolio", className = "button" }: { label?: string; className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("openVentureUniverse"))}>{label}</button>;
}
