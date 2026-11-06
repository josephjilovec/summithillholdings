"use client";

import { FormEvent, useState } from "react";

const interestOptions = ["Operating leader", "Investor / capital partner", "Technical collaborator", "Distribution / domain partner", "Civic / nonprofit collaboration", "Strategic adviser", "Media", "Creative collaboration", "Music / licensing", "General inquiry"];

export function ContactForm({ mode = "contact", initialInterest = "" }: { mode?: "contact" | "brief"; initialInterest?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch(mode === "brief" ? "/api/brief" : "/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "The message could not be delivered.");
      setState("success");
      setMessage(payload.message || "Your message was sent.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The message could not be delivered.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      {mode === "contact" ? (
        <>
          <div className="form-row">
            <label>Full name *<input name="name" required maxLength={120} autoComplete="name" /></label>
            <label>Email address *<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
          </div>
          <label>Area of interest (optional)<input name="interest" defaultValue={initialInterest} maxLength={200} placeholder="Specific venture, media inquiry, advisory, general collaboration…" /></label>
          <label>Short message *<textarea name="message" required maxLength={3000} rows={7} /></label>
        </>
      ) : (
        <>
          <div className="form-row">
            <label>Full name<input name="name" required maxLength={120} autoComplete="name" /></label>
            <label>Email address<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
          </div>
          <div className="form-row">
            <label>Organization<input name="organization" maxLength={160} autoComplete="organization" /></label>
            <label>Role<input name="role" maxLength={120} autoComplete="organization-title" /></label>
          </div>
          <div className="form-row">
            <label>Area of interest
              <select name="interest" required defaultValue="">
                <option value="" disabled>Select one</option>
                {interestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label>Venture of interest
              <select name="venture" defaultValue="General / studio">
                <option>General / studio</option>
                <option>Swift Deal Solutions</option>
                <option>My Healthy Aura</option>
                <option>DJ Hotwax</option>
                <option>Vanta Helix</option>
                <option>CannaCore Seeds</option>
                <option>Snark Logic</option>
                <option>Alder &amp; Meridian</option>
                <option>United American Future</option>
                <option>World Forward Foundation</option>
                <option>Givewise Insights</option>
              </select>
            </label>
          </div>
          <label>Investment or partnership focus<input name="focus" maxLength={200} placeholder="What kind of opportunity are you evaluating?" /></label>
          <label>Short message<textarea name="message" required maxLength={3000} rows={7} /></label>
        </>
      )}
      <label className="honeypot" aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consent" value="yes" required /> <span>I agree to be contacted about this inquiry. Submitting this form does not create a confidential, advisory, investment, or partnership relationship.</span></label>
      <div className="form-submit-row">
        <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : mode === "brief" ? "Request venture brief" : "Send inquiry"}</button>
        <span className={`form-status ${state}`} role="status" aria-live="polite">{message}</span>
      </div>
    </form>
  );
}
