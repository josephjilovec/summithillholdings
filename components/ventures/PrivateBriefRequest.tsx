"use client";

import { FormEvent, useMemo, useState } from "react";
import { ventures } from "@/lib/portfolio";

type Props = {
  defaultVenture?: string;
  label?: string;
};

const audiences = [
  ["Investor / capital partner", "Private diligence, venture briefs, milestones, and selected partner materials."],
  ["Technical operator / collaborator", "Architecture, product systems, AI, HCI, manufacturing, or technical build work."],
  ["Pilot / distribution partner", "Customer access, market testing, transactions, licensing, or sector relationships."],
  ["Strategic adviser", "Specialist review, introductions, operating context, or targeted expertise."]
] as const;

const accreditationOptions = [
  "Accredited investor",
  "Institutional / fund representative",
  "Qualified purchaser / professional representative",
  "Not applicable",
  "Prefer to discuss"
] as const;

export function PrivateBriefRequest({ defaultVenture = "general", label = "Request a Venture Brief" }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [venture, setVenture] = useState(defaultVenture);
  const [audience, setAudience] = useState("");
  const [formValues, setFormValues] = useState({ name: "", email: "", organization: "", role: "", accreditation: "", focus: "", message: "" });

  const selectedVenture = useMemo(() => ventures.find((item) => item.slug === venture), [venture]);
  const needsAccreditation = audience === "Investor / capital partner";

  const reset = () => {
    setStep(1);
    setState("idle");
    setMessage("");
    setAudience("");
    setVenture(defaultVenture);
    setFormValues({ name: "", email: "", organization: "", role: "", accreditation: "", focus: "", message: "" });
  };

  const close = () => {
    if (state === "sending") return;
    setOpen(false);
    reset();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    setMessage("");
    try {
      const payload = {
        ...formValues,
        interest: audience,
        venture: venture === "general" ? "General / studio" : selectedVenture?.name ?? venture,
        accreditation: needsAccreditation ? formValues.accreditation : "Not applicable",
        consent: "yes"
      };
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The request could not be delivered.");
      setState("success");
      setMessage(data.message || "Brief request sent.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The request could not be delivered.");
    }
  };

  return (
    <>
      <button className="button" type="button" onClick={() => setOpen(true)}>{label}</button>
      {open && (
        <div className="brief-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className="brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-modal-title">
            <div className="brief-modal-head">
              <div>
                <span className="section-kicker">Private materials / request routing</span>
                <h2 id="brief-modal-title">Request a Venture Brief</h2>
              </div>
              <button type="button" className="brief-modal-close" onClick={close} aria-label="Close request form">×</button>
            </div>

            {state === "success" ? (
              <div className="brief-success">
                <span className="brief-step">REQUEST RECEIVED</span>
                <h3>The public overview is open. Private materials remain review-gated.</h3>
                <p>{message}</p>
                {selectedVenture?.slug === "crestline-metals" && (
                  <a className="button" href="/api/executive-brief/crestline-metals" target="_blank" rel="noreferrer">Open Crestline executive brief ↗</a>
                )}
                <button type="button" className="button button-ghost" onClick={close}>Close</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="brief-stepper" aria-label="Brief request progress">
                  {[1, 2, 3].map((item) => <span key={item} className={step >= item ? "active" : ""}>0{item}</span>)}
                </div>

                {step === 1 && (
                  <section className="brief-step-panel">
                    <span className="brief-step">01 / YOU ARE HERE</span>
                    <h3>What brings you to the studio?</h3>
                    <div className="brief-choice-grid">
                      {audiences.map(([value, description]) => (
                        <button key={value} type="button" className={audience === value ? "brief-choice active" : "brief-choice"} onClick={() => setAudience(value)}>
                          <strong>{value}</strong><span>{description}</span>
                        </button>
                      ))}
                    </div>
                    <div className="brief-modal-actions"><button type="button" className="button" disabled={!audience} onClick={() => setStep(2)}>Continue →</button></div>
                  </section>
                )}

                {step === 2 && (
                  <section className="brief-step-panel">
                    <span className="brief-step">02 / TARGET</span>
                    <h3>What are you evaluating?</h3>
                    <div className="form-row">
                      <label>Venture of interest
                        <select value={venture} onChange={(event) => setVenture(event.target.value)} required>
                          <option value="general">General / studio</option>
                          {ventures.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                        </select>
                      </label>
                      <label>Investor status
                        <select value={formValues.accreditation} onChange={(event) => setFormValues((current) => ({ ...current, accreditation: event.target.value }))} required={needsAccreditation}>
                          <option value="">Select one</option>
                          {accreditationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </label>
                    </div>
                    <label>What should the brief help you evaluate?
                      <input value={formValues.focus} onChange={(event) => setFormValues((current) => ({ ...current, focus: event.target.value }))} maxLength={200} placeholder="Milestones, customer fit, technology, operating model, partnership, etc." required />
                    </label>
                    <div className="brief-modal-actions"><button type="button" className="button button-ghost" onClick={() => setStep(1)}>← Back</button><button type="button" className="button" onClick={() => setStep(3)}>Continue →</button></div>
                  </section>
                )}

                {step === 3 && (
                  <section className="brief-step-panel">
                    <span className="brief-step">03 / CONTACT</span>
                    <h3>Where should the studio send the follow-up?</h3>
                    <div className="form-row">
                      <label>Full name<input value={formValues.name} onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))} maxLength={120} autoComplete="name" required /></label>
                      <label>Email address<input value={formValues.email} onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))} maxLength={200} type="email" autoComplete="email" required /></label>
                    </div>
                    <div className="form-row">
                      <label>Organization<input value={formValues.organization} onChange={(event) => setFormValues((current) => ({ ...current, organization: event.target.value }))} maxLength={160} autoComplete="organization" /></label>
                      <label>Role / title<input value={formValues.role} onChange={(event) => setFormValues((current) => ({ ...current, role: event.target.value }))} maxLength={120} autoComplete="organization-title" /></label>
                    </div>
                    <label>Additional context<textarea value={formValues.message} onChange={(event) => setFormValues((current) => ({ ...current, message: event.target.value }))} rows={5} maxLength={1800} required placeholder="Tell the studio what you are trying to understand, validate, or discuss." /></label>
                    <label className="consent"><input type="checkbox" required /> <span>I agree to be contacted about this request. Submission does not automatically grant private data-room access or create a confidential, investment, advisory, or partnership relationship.</span></label>
                    <div className="brief-modal-actions"><button type="button" className="button button-ghost" onClick={() => setStep(2)}>← Back</button><button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send request"}</button></div>
                    {state === "error" && <p className="brief-form-error" role="alert">{message}</p>}
                  </section>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
