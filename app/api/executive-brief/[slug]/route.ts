import { NextResponse } from "next/server";

export const runtime = "nodejs";

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf() {
  const lines: Array<[string, number, number]> = [];
  const textLine = (text: string, x: number, y: number, size = 11, font = "F1") => {
    lines.push([`BT /${font} ${size} Tf ${x} ${y} Td (${pdfEscape(text)}) Tj ET`, x, y]);
  };

  textLine("CRESTLINE METALS", 54, 742, 18, "F2");
  textLine("EXECUTIVE BRIEF / PUBLIC OVERVIEW", 54, 720, 8, "F2");
  textLine("Industrial manufacturing planned around Bethlehem, Pennsylvania.", 54, 694, 12);

  textLine("WHAT IT IS", 54, 646, 8, "F2");
  textLine("A planned American industrial manufacturer focused on high-performance steel,", 54, 625, 11);
  textLine("disciplined process control, traceability, dependable supply and long-term", 54, 608, 11);
  textLine("customer relationships.", 54, 591, 11);

  textLine("OPERATING THESIS", 54, 548, 8, "F2");
  textLine("Premium industrial positioning depends on more than nominal specifications.", 54, 527, 11);
  textLine("Process discipline, quality documentation, traceability, schedule reliability", 54, 510, 11);
  textLine("and technical communication are treated as part of the product.", 54, 493, 11);

  textLine("CURRENT PUBLIC STATE", 54, 450, 8, "F2");
  textLine("The public platform defines the company, capabilities, markets, quality approach", 54, 429, 11);
  textLine("and planned operating base. Facilities, production output, certifications,", 54, 412, 11);
  textLine("customer contracts and financial performance are not presented as existing", 54, 395, 11);
  textLine("achievements unless independently supported.", 54, 378, 11);

  textLine("NEXT PROOF POINTS", 54, 335, 8, "F2");
  textLine("1 / Narrow the initial product and process route.", 54, 314, 11);
  textLine("2 / Validate real buyer requirements and economics.", 54, 297, 11);
  textLine("3 / Build the facility, utility, logistics and quality plan with qualified specialists.", 54, 280, 11);
  textLine("4 / Establish evidence before making operating or market claims.", 54, 263, 11);

  textLine("PARTNER PROFILE", 54, 220, 8, "F2");
  textLine("Industrial operators, metallurgical and plant engineers, equipment suppliers,", 54, 199, 11);
  textLine("industrial customers, energy and logistics partners, quality specialists and", 54, 182, 11);
  textLine("capital partners.", 54, 165, 11);

  textLine("Public executive brief. High-level context only; not an offering memorandum,", 54, 112, 8);
  textLine("appraisal, financing commitment or independently verified valuation.", 54, 99, 8);
  textLine("Summit Hill Holdings · summithillholdings.com", 54, 72, 8, "F2");

  const content = [
    "q",
    "0.94 0.94 0.94 rg",
    "0 0 612 792 re f",
    "0.08 0.12 0.15 rg",
    ...lines.map(([op]) => op),
    "Q"
  ].join("\n") + "\n";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (slug !== "crestline-metals") {
    return NextResponse.json({ error: "Executive brief not found." }, { status: 404 });
  }

  return new Response(buildPdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="crestline-metals-executive-brief.pdf"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
