/**
 * Treatment pages — the SEO/AEO "money pages".
 * Structure follows the 2026 high-conversion clinic template:
 * direct answer first (AEO), candidacy, process, honest results framing,
 * transparent "starting from" pricing, FAQs (FAQPage schema).
 * COMPLIANCE: no "permanent/guaranteed/cure", no drug brand names,
 * no before/after promises, consultation-first language throughout.
 */
export type TreatmentPage = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSub: string;
  directAnswer: string;
  forWhom: string[];
  notFor: string[];
  steps: { title: string; text: string }[];
  results: string;
  pricing: { label: string; price: string }[];
  pricingNote: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

const CONSULT_NOTE =
  "Every plan starts with a doctor consultation. Final pricing depends on your assessment; easy EMI options are available for packages.";

export const treatmentPages: TreatmentPage[] = [
  {
    slug: "laser-hair-reduction",
    name: "Laser Hair Reduction",
    heroTitle: "Laser Hair Reduction — Smooth Skin, Doctor-Supervised",
    heroSub: "US-FDA-approved laser technology, protocols set by doctors, comfort-first sessions at all Dolce Estetica clinics.",
    directAnswer:
      "Laser hair reduction uses focused light energy to weaken hair follicles so hair grows back finer and slower over a course of sessions. At Dolce Estetica, sessions are physician-supervised and use lasers suited to Indian skin tones.",
    forWhom: [
      "Tired of waxing, shaving or threading cycles",
      "Ingrown hair, razor bumps or post-waxing darkening",
      "Preparing for a wedding or a special season",
      "Men seeking beard shaping or body grooming",
    ],
    notFor: [
      "Active skin infection in the area (treated first)",
      "Certain medications and conditions — reviewed at consultation",
      "Recent heavy tanning — we assess and schedule accordingly",
    ],
    steps: [
      { title: "Consultation & patch test", text: "A doctor assesses your skin and hair type, explains the plan, and performs a patch test." },
      { title: "Sessions", text: "Typically 6–8 sessions spaced 4–6 weeks apart. Each session takes 15–60 minutes depending on the area." },
      { title: "Aftercare & review", text: "Simple aftercare, sun protection guidance, and periodic doctor reviews to track reduction." },
    ],
    results:
      "Most clients notice visibly reduced, finer regrowth after 3–4 sessions, with significant long-term reduction after a completed course. Individual results vary with hair colour, hormones and skin type — which is why a doctor plans your course.",
    pricing: [
      { label: "Sessions from", price: "₹3,000" },
      { label: "6-session packages from", price: "₹14,500" },
    ],
    pricingNote: "6-session packages bring meaningful savings — for example, two small areas from ₹14,500. " + CONSULT_NOTE,
    faqs: [
      { q: "Does laser hair reduction hurt?", a: "Most people describe it as a warm flick, like a rubber band tap. Modern cooling-tip lasers keep sessions comfortable, and our team adjusts settings to your tolerance." },
      { q: "How many sessions will I need?", a: "Typically 6–8 sessions, because hair grows in cycles and the laser works best on actively growing hair. Your doctor will give you a realistic count at consultation." },
      { q: "Is it safe for Indian skin tones?", a: "Yes — we use laser platforms and settings selected specifically for melanin-rich skin, under physician-set protocols." },
      { q: "Is the result permanent?", a: "The honest answer: laser gives long-term hair reduction, not lifetime elimination. Hormonal changes can cause some regrowth, which occasional maintenance sessions manage well." },
      { q: "How much does it cost in total?", a: "It depends on the area and sessions needed. As a guide, compare it with a lifetime of monthly waxing — most clients find a laser course pays for itself within a couple of years." },
      { q: "Can men take laser hair reduction?", a: "Absolutely — beard shaping, chest, back and full-body grooming for men are among our most requested treatments. Discreet appointments available." },
    ],
    related: ["skin-brightening-medifacials", "pigmentation-pico-laser", "body-contouring"],
  },
  {
    slug: "skin-brightening-medifacials",
    name: "Medifacials & Skin Brightening",
    heroTitle: "Medifacials — Clinical Glow, Not Parlour Promises",
    heroSub: "Doctor-designed facials: deep hydration, brightening, acne control and pre-event glow — matched to your skin, not a menu card.",
    directAnswer:
      "A medifacial is a medical-grade facial performed in a clinic setting using pharmaceutical-grade actives, devices like electroporation and LED therapy, and protocols chosen after a skin assessment — safer and more effective than salon facials.",
    forWhom: [
      "Dull, tired or uneven skin tone",
      "Acne-prone or oily skin needing controlled care",
      "Pre-wedding and pre-event preparation",
      "Dry, dehydrated skin and early ageing signs",
    ],
    notFor: [
      "Active severe acne flare (doctor treats first, then facials maintain)",
      "Certain allergies — screened at consultation",
    ],
    steps: [
      { title: "Skin assessment", text: "Your skin is analysed and a protocol is chosen — brightening, hydration, acne-control or anti-ageing." },
      { title: "The medifacial", text: "60–90 minutes of cleansing, exfoliation, actives infusion and device therapy suited to your skin." },
      { title: "Glow plan", text: "A simple home-care and session plan — most skins do best with a monthly rhythm or a pre-event series." },
    ],
    results:
      "Immediate freshness and glow after a single session; cumulative improvement in tone, texture and clarity over a series. Your clinician will tell you honestly which concerns need medifacials and which need medical treatments instead.",
    pricing: [
      { label: "Single sessions from", price: "₹4,000" },
      { label: "Series packages from", price: "₹16,000" },
    ],
    pricingNote: "Series packages (e.g., 4 sessions) bring 15–20% savings. " + CONSULT_NOTE,
    faqs: [
      { q: "How is a medifacial different from a salon facial?", a: "Clinical environment, medical-grade products, devices like LED and electroporation, and a skin assessment first — with a doctor available if your skin needs medical care rather than pampering." },
      { q: "How often should I take one?", a: "Monthly suits most skins. For weddings or events, we plan a series ending 3–5 days before the big day." },
      { q: "Will it help acne marks and pigmentation?", a: "Medifacials brighten and support; deeper pigmentation usually responds better to peels or laser toning — your assessment will route you honestly." },
      { q: "Is there any downtime?", a: "Usually none. Some protocols cause mild redness for a few hours. We always tell you beforehand." },
      { q: "What does it cost?", a: "Single sessions range from ₹4,000–₹6,500 depending on the protocol. Packages reduce the per-session cost meaningfully." },
    ],
    related: ["pigmentation-pico-laser", "anti-ageing-skin-boosters", "acne-and-scar-care"],
  },
  {
    slug: "acne-and-scar-care",
    name: "Acne & Scar Care",
    heroTitle: "Acne & Acne-Scar Treatment — Treat the Cause, Repair the Marks",
    heroSub: "Doctor-led acne control, chemical peels, and CO2 fractional resurfacing for scars — a medical pathway, not quick fixes.",
    directAnswer:
      "Effective acne care treats the cause medically first — oil balance, bacteria, inflammation — then repairs marks and scars with peels, lasers and collagen-stimulating treatments. Dolce Estetica's pathway is doctor-assessed at every step.",
    forWhom: [
      "Recurring breakouts that creams alone don't settle",
      "Post-acne dark marks and uneven texture",
      "Depressed or pitted acne scars",
      "Oily, congested skin with frequent comedones",
    ],
    notFor: [
      "Those expecting overnight scar removal — real repair is staged and honest",
    ],
    steps: [
      { title: "Doctor assessment", text: "Grade the acne, identify triggers, and set a medical control plan." },
      { title: "Control phase", text: "Medical management plus clinic treatments — peels, comedone care, LED — to calm active acne." },
      { title: "Repair phase", text: "Once skin is stable: brightening peels for marks; CO2 fractional laser or microneedling-based protocols for texture and scars." },
    ],
    results:
      "Active acne typically improves over 6–12 weeks of consistent care. Scar repair is gradual — most clients see meaningful smoothing over a 3–4 session course. We show you realistic expectations at consultation, never miracle promises.",
    pricing: [
      { label: "Doctor consultation", price: "₹500" },
      { label: "Care programs from", price: "₹10,000" },
    ],
    pricingNote: "Scar-repair packages with aftercare kits bring savings. " + CONSULT_NOTE,
    faqs: [
      { q: "Why see a doctor for acne instead of using creams?", a: "Because acne has grades and causes — hormonal, bacterial, comedonal. Matching treatment to cause is what stops the cycle of breakouts and new scars." },
      { q: "Can old acne scars really improve?", a: "Yes — meaningfully, though honestly never 100%. Fractional resurfacing and collagen-stimulating treatments smooth depth and texture over a planned course." },
      { q: "Does CO2 fractional laser have downtime?", a: "Expect 4–6 days of redness and micro-crusting. We schedule around your work and events and give a complete aftercare kit." },
      { q: "Is treatment safe for dark or tanning-prone skin?", a: "Protocols are chosen for Indian skin, with preparation and sun-protection built in to minimise post-treatment pigmentation risk." },
      { q: "When should a bride start acne care?", a: "Ideally 6 months before the wedding — control takes weeks and repair takes months. Late starters still have good options; we plan honestly." },
    ],
    related: ["skin-brightening-medifacials", "pigmentation-pico-laser", "laser-hair-reduction"],
  },
  {
    slug: "pigmentation-pico-laser",
    name: "Pigmentation & Pico Laser",
    heroTitle: "Pigmentation Treatment — Pico Laser Precision for Indian Skin",
    heroSub: "Tan, dark spots, uneven tone and stubborn pigmentation — treated with pico-second laser technology and doctor-planned protocols.",
    directAnswer:
      "Pico laser delivers ultra-short pulses that shatter pigment with minimal heat, making it one of the safest, most effective options for pigmentation on Indian skin — including sun damage, spots, tan and uneven tone.",
    forWhom: [
      "Stubborn dark spots and sun damage",
      "Uneven, tanned or dull skin tone",
      "Post-inflammatory marks",
      "Tattoo fading",
    ],
    notFor: [
      "Certain pigment conditions need combined medical care — assessed first",
    ],
    steps: [
      { title: "Pigment mapping", text: "The doctor identifies pigment type and depth — surface tan, deeper pigment or mixed." },
      { title: "Pico sessions", text: "Quick 20–30 minute sessions; typically 4–6 sessions spaced 3–4 weeks apart." },
      { title: "Protect & maintain", text: "Strict sun protection plus maintenance guidance — the non-negotiable part of pigment care." },
    ],
    results:
      "Gradual, visible lightening of targeted pigment over the course, with improved overall brightness. Pigmentation management is a journey — Indian skin needs patient, protocol-driven care, and that is exactly what we do.",
    pricing: [
      { label: "Sessions from", price: "₹3,000" },
      { label: "Glow Protocol (4 sessions)", price: "₹22,000" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      { q: "Is pico laser safe for dark skin?", a: "Pico's ultra-short pulses generate less heat than older lasers, making it a preferred choice for melanin-rich skin when operated under proper protocols — as ours are." },
      { q: "How many sessions for visible change?", a: "Most clients see brightening from session 2–3; stubborn pigment needs the full course of 4–6. Your doctor will grade this honestly at assessment." },
      { q: "Will pigmentation come back?", a: "Pigment-prone skin stays pigment-prone; that's the truth. Sun protection and periodic maintenance keep results — we teach you the routine." },
      { q: "Does it hurt?", a: "Mild warmth and tingling; numbing cream is used where needed. Sessions are quick." },
    ],
    related: ["skin-brightening-medifacials", "acne-and-scar-care", "anti-ageing-skin-boosters"],
  },
  {
    slug: "anti-ageing-skin-boosters",
    name: "Anti-Ageing & Skin Boosters",
    heroTitle: "Skin Boosters & Anti-Ageing — Subtle, Medical, Yours",
    heroSub: "Doctor-administered skin boosters, biostimulators and anti-wrinkle treatments — for refreshed, natural-looking skin. Never overdone.",
    directAnswer:
      "Skin boosters are micro-injections of hydrating and collagen-stimulating formulations that improve skin quality from within. Combined with doctor-administered anti-wrinkle treatments, they soften ageing signs while keeping your expressions natural.",
    forWhom: [
      "Early lines, dullness and loss of firmness",
      "Dry, crepey or tired-looking skin",
      "Under-eye dullness and fine lines",
      "Those wanting refreshed — not 'done' — looks",
    ],
    notFor: [
      "Pregnancy and certain conditions — screened at consultation",
      "Anyone seeking exaggerated, unnatural results — that is not our philosophy",
    ],
    steps: [
      { title: "Doctor consultation", text: "Facial assessment, honest advice on what will and won't help, and a written plan." },
      { title: "The treatment", text: "Performed only by qualified doctors, with medical-grade products and comfort measures. 30–45 minutes." },
      { title: "Review", text: "A follow-up review checks results and plans maintenance — typically 2 sessions a year keep skin quality up." },
    ],
    results:
      "Gradual improvement in hydration, elasticity and glow over 2–4 weeks per session; anti-wrinkle results appear in 3–7 days and settle naturally. Subtlety is the goal — people should say you look fresh, not ask what you did.",
    pricing: [
      { label: "Treatments from", price: "₹4,000" },
      { label: "Skin-quality programs from", price: "₹20,000" },
    ],
    pricingNote: "All injectables are administered by doctors only. " + CONSULT_NOTE,
    faqs: [
      { q: "Will I look unnatural?", a: "Not at Dolce Estetica. Our doctors practice conservative, assessment-led dosing — enhancement that reads as 'well-rested', never frozen or overfilled." },
      { q: "Who performs the injections?", a: "Only qualified doctors — never technicians. That is a hard rule across all our clinics." },
      { q: "How long do results last?", a: "Skin boosters: typically 4–6 months of improved skin quality. Anti-wrinkle treatments: 3–4 months. Maintenance keeps results consistent." },
      { q: "Is it painful?", a: "Numbing cream and fine-needle technique keep discomfort minimal — most clients rate it 2–3 out of 10." },
      { q: "What's the right age to start?", a: "There's no 'right age' — there's a right indication. Our doctors will tell you honestly if you don't need anything yet; prevention advice is free." },
    ],
    related: ["skin-brightening-medifacials", "pigmentation-pico-laser", "medical-weight-management"],
  },
  {
    slug: "hair-restoration-prp-gfc",
    name: "Hair Restoration (PRP & GFC)",
    heroTitle: "Hair Fall & Regrowth — PRP, GFC and Scalp Science",
    heroSub: "Doctor-led hair restoration: growth-factor therapies, scalp treatments and honest assessment of what will actually work for you.",
    directAnswer:
      "PRP and GFC therapy concentrate growth factors from your own blood and deliver them to weakening hair follicles, stimulating thicker, healthier growth. They work best for early-to-moderate thinning, identified through a proper scalp assessment.",
    forWhom: [
      "Increased hair fall or visible thinning",
      "Reduced density at crown or hairline",
      "Post-illness or post-partum hair loss",
      "Weak, slow-growing hair",
    ],
    notFor: [
      "Fully bald areas (follicles gone) — we'll tell you honestly and discuss alternatives",
    ],
    steps: [
      { title: "Scalp & trichology assessment", text: "Identify the type and stage of hair loss — the step most clinics skip and the reason many treatments fail." },
      { title: "GFC/PRP sessions", text: "Typically 3–6 sessions, 4 weeks apart. Your own growth factors, medically prepared, precisely delivered." },
      { title: "Support & review", text: "Nutritional support, scalp care and periodic photos to track density objectively." },
    ],
    results:
      "Reduced hair fall usually within 4–8 weeks; visible density improvement from month 3 onward across a completed course. Results depend on the stage of loss — early treatment gives the best outcomes, which is why assessment matters.",
    pricing: [
      { label: "Sessions from", price: "₹5,000" },
      { label: "Hair Revival package", price: "₹30,000" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      { q: "PRP vs GFC — which is better?", a: "GFC is a refined, standardised evolution of PRP with higher growth-factor concentration and typically less discomfort. Your doctor will recommend based on your scalp assessment and budget." },
      { q: "Is it painful?", a: "Fine needles and numbing keep it very tolerable; sessions take about 45–60 minutes including preparation." },
      { q: "When will I see results?", a: "Hair works in months, not days: fall reduces first (4–8 weeks), density follows (3–6 months). Anyone promising faster is not being honest." },
      { q: "Will results last?", a: "Maintenance sessions 1–2 times a year sustain results, alongside managing the underlying cause — which our doctors address, not ignore." },
    ],
    related: ["medical-weight-management", "skin-brightening-medifacials", "anti-ageing-skin-boosters"],
  },
  {
    slug: "medical-weight-management",
    name: "Medical Weight Management",
    heroTitle: "Medical Weight Management — Physician-Supervised, Science-First",
    heroSub: "Doctor consultations, body-composition analysis, medical therapies where appropriate, and dietician support — weight care that treats causes, not willpower.",
    directAnswer:
      "Medical weight management is physician-supervised care that addresses the biology of weight — metabolism, hormones, appetite regulation — through medical assessment, appropriate therapies, nutrition planning and monitoring. It is fundamentally different from slimming-centre packages.",
    forWhom: [
      "Weight that resists diet-and-exercise cycles",
      "Central/abdominal weight and metabolic concerns",
      "Pre-diabetic patterns or family history needing action",
      "Post-pregnancy weight management",
    ],
    notFor: [
      "Anyone seeking crash outcomes — sustainable medicine only",
    ],
    steps: [
      { title: "Physician consultation", text: "Medical history, body-composition analysis and lab review — understanding YOUR biology first." },
      { title: "Personal program", text: "Medical therapy where clinically appropriate, dietician-built nutrition, and weekly monitoring." },
      { title: "Maintain & sustain", text: "Structured maintenance so results hold — the phase slimming centres skip and we don't." },
    ],
    results:
      "Clinically meaningful, gradual weight reduction with preserved muscle and improved energy — reviewed with data at every step. Programs run 4–12 weeks with maintenance support; outcomes vary by individual and adherence.",
    pricing: [
      { label: "Physician consultation", price: "₹1,500" },
      { label: "Programs from", price: "₹22,000" },
    ],
    pricingNote: "Program fees cover consultations, monitoring and support; any medicines are prescribed and billed separately after doctor assessment. EMI available. " + CONSULT_NOTE,
    faqs: [
      { q: "How is this different from a slimming centre?", a: "A doctor leads it. Assessment is medical, therapies are evidence-based, monitoring is clinical, and no machine is sold to you as magic. We treat the biology of weight." },
      { q: "Do you prescribe weight-loss medication?", a: "Where clinically appropriate — after proper consultation, labs and discussion of benefits and side effects. Medication is a tool within a program, never sold standalone." },
      { q: "How much can I expect to lose?", a: "Safe, sustainable programs target gradual loss — typically 0.5–1 kg per week trajectories, personalised. We show you the data at every review rather than promising numbers." },
      { q: "Will the weight come back?", a: "Not if maintenance is built in — that's why our programs include a maintenance phase and ongoing support options." },
      { q: "Is EMI available?", a: "Yes — programs can be paid monthly through our EMI partners. Ask at your consultation." },
    ],
    related: ["body-contouring", "hair-restoration-prp-gfc", "anti-ageing-skin-boosters"],
  },
  {
    slug: "body-contouring",
    name: "Body Contouring",
    heroTitle: "Body Contouring — Targeted Shaping, Medically Supervised",
    heroSub: "Radio-frequency body contouring for stubborn areas, planned alongside your health goals — sculpting that respects science.",
    directAnswer:
      "Body contouring uses monopolar radio-frequency energy to target localised fat and tighten skin in specific areas — a non-surgical option for shaping zones that resist diet and exercise, best planned with medical assessment.",
    forWhom: [
      "Stubborn zones — belly, flanks, arms, thighs",
      "Post-weight-loss shaping and skin tightening",
      "Bridal and event body-prep",
      "Alongside a medical weight program for best results",
    ],
    notFor: [
      "A substitute for overall weight management — we'll route you honestly if that's the real need",
    ],
    steps: [
      { title: "Assessment", text: "Zones, skin quality and goals are assessed; realistic session counts are agreed." },
      { title: "RF sessions", text: "Comfortable, warm 30–45 minute sessions per zone; typically 6–10 sessions weekly." },
      { title: "Measure & review", text: "Progress tracked with measurements — data over mirror-guessing." },
    ],
    results:
      "Gradual inch-loss and tightening in treated zones over the session course, best maintained with stable weight. Individual results vary; combining with our medical weight program significantly improves outcomes.",
    pricing: [
      { label: "Sessions from", price: "₹3,500" },
      { label: "Starter Sculpt (6 sessions)", price: "₹22,000" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      { q: "Is this weight loss?", a: "No — it's shaping. Contouring targets localised zones; overall weight is medical territory. We offer both and will honestly tell you which you need." },
      { q: "Does it hurt?", a: "Sessions feel like a deep warm massage. No needles, no downtime — you can return to work immediately." },
      { q: "How soon are results visible?", a: "Most clients measure visible change from session 4–6, with best results at course completion and stable weight." },
      { q: "How long do results last?", a: "Treated zones respond long-term if weight stays stable — which is why we pair contouring with sustainable weight care." },
    ],
    related: ["medical-weight-management", "laser-hair-reduction", "skin-brightening-medifacials"],
  },
];

export function getTreatment(slug: string) {
  return treatmentPages.find((t) => t.slug === slug);
}
