import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "No content provided" }, { status: 400 });
  }

  const performativeWords = ["viral", "clout", "major label", "trending", "mainstream", "hype", "generic", "standard", "popular"];
  const unawareWords = ["quick fix", "easy money", "overnight", "labels", "asking for permission", "gatekeeper"];
  
  const contentLower = content.toLowerCase();
  
  const isPerformative = performativeWords.some(word => contentLower.includes(word));
  const isUnaware = unawareWords.some(word => contentLower.includes(word));

  let status = "aligned";
  let feedback = "Content aligned with Maseru Noir brand DNA.";

  if (isPerformative) {
    status = "flagged";
    feedback = "Performative indicator detected. Avoid clout-driven narratives. Focus on infrastructure and ownership.";
  } else if (isUnaware) {
    status = "flagged";
    feedback = "Unaware indicator detected. Re-align with the Architect's Directive: We don't ask for permission.";
  }

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    status,
    feedback,
    brandPockets: ["Ownership", "Infrastructure", "Industrial Luxury", "Anonymity"]
  });
}
