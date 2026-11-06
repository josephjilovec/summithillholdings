"use client";
import { useEffect,useState } from "react";
import { PortfolioUniverse } from "@/components/ventures/PortfolioUniverse";
export function HomeVentureOverlay(){
 const[open,setOpen]=useState(false);
 useEffect(()=>{const show=()=>setOpen(true);window.addEventListener("openVentureUniverse",show);if(location.hash==="#venture-universe")setOpen(true);return()=>window.removeEventListener("openVentureUniverse",show)},[]);
 if(!open)return null;
 return <div className="venture-overlay" role="dialog" aria-modal="true"><div className="venture-overlay-panel"><div className="venture-overlay-head"><div><p className="section-kicker">Portfolio / Company Index</p><h2>Explore the operating portfolio.</h2><p>Review the broader studio portfolio, inspect current venture stages, and open individual project files for public operating context.</p></div><button className="venture-overlay-close" onClick={()=>setOpen(false)} aria-label="Close">×</button></div><div className="venture-overlay-body"><PortfolioUniverse/></div></div></div>
}
