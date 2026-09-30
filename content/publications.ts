import type { Publication } from "./types";

// Both papers are ACCEPTED, not yet published (they go out after the
// conferences). Keep status "accepted" and add no PDF / preprint until the
// co-authors and supervisors agree. After publication: set status
// "published" and add the IEEE Xplore / DOI link to `links`.
//
// Sources: LightDep — IIT BHU research notes (author order as in EDAS).
// BioX-DTI — public repo README (github.com/srajalcodes/BioX-DTI) + Devansh's
// own resume line for his contribution.

export const publications: Publication[] = [
  {
    slug: "lightdep",
    title:
      "LightDep: Knowledge-Distilled Multimodal Depression Screening for Mobile and Edge Devices",
    authors: [
      { name: "Devansh Pandey", me: true, equal: true, aff: [1] },
      { name: "Prateek Goyal", equal: true, aff: [1] },
      { name: "Amit Vishwakarma", title: "Dr.", aff: [2] },
      { name: "Arijit Roy", title: "Dr.", aff: [3] },
      { name: "Om Jee Pandey", title: "Dr.", aff: [4] },
    ],
    // From the EDAS author block (Arijit Roy: IIT Patna & SensorDrops Networks).
    affiliations: ["Shiv Nadar University", "IIITDM Jabalpur", "IIT Patna", "IIT BHU"],
    venue:
      "IEEE International Conference on Advanced Networks and Telecommunications Systems (ANTS)",
    venueShort: "IEEE ANTS 2026",
    where: "IIT Roorkee · 17–20 Dec 2026",
    status: "accepted",
    experienceNote: "From my summer research internship at IIT BHU.",
    summary:
      "A small model that screens for depression from face and voice features and runs on the device, even inside a browser tab. It learns from bigger teacher models (knowledge distillation) and is then quantized to 3.96 MB.",
    myPart:
      "Joint first author with Prateek Goyal. I built and trained the model, ran the distillation experiments and the significance tests, and did the INT8 ONNX export.",
    results: [
      "Distillation only helps when the teacher is a stronger, well-calibrated screener: +10.4 recall on D-Vlog (p = 0.045), confirmed over 10 seeds on a second GPU. No significant gain on LMVD.",
      "3.96 MB INT8 model, 28× smaller than its teacher, 96 ms per inference on one CPU thread, 75.9 binary F1 on D-Vlog.",
    ],
    projectSlug: "iitbhu-distillation",
    links: [
      { label: "Code", href: "https://github.com/devansh101005/Depression_Detection_KD_Edge" },
    ],
  },
  {
    slug: "biox-dti",
    title:
      "Structure-Aware Drug–Target Interaction Prediction via Pretrained Language Models and Cross-Attention Fusion",
    authors: [
      { name: "Srajal Tiwari", aff: [1] },
      { name: "Dolly Sharma", title: "Dr.", aff: [1] },
      { name: "Prateek Goyal", aff: [1] },
      { name: "Devansh Pandey", me: true, aff: [1] },
      { name: "Anamika Pal", aff: [1] },
      { name: "Abhinav Bachchas", aff: [1] },
    ],
    // All six authors are from Shiv Nadar University (confirmed by Devansh).
    affiliations: ["Shiv Nadar University"],
    venue: "IEEE Region 10 Conference (TENCON)",
    venueShort: "IEEE TENCON 2026",
    status: "accepted",
    summary:
      "BioX-DTI predicts whether a drug will interact with a protein. Proteins are encoded with ESM-2 over AlphaFold contact graphs, drugs with a molecular graph plus ChemBERTa-2, and the two are fused with cross-attention.",
    myPart:
      "Co-author. I built the fusion module: 4-head cross-attention where each protein residue attends over the drug's atoms, followed by masked pooling.",
    results: [
      "0.872 accuracy / 0.746 MCC on the Yamanishi 1:1 benchmark.",
      "0.819 F1 on proteins the model never saw in training (cold-target split).",
    ],
    links: [{ label: "Code", href: "https://github.com/srajalcodes/BioX-DTI" }],
  },
];

export function getPublicationForProject(slug: string): Publication | undefined {
  return publications.find((p) => p.projectSlug === slug);
}
