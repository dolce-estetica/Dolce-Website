/**
 * Treatment pages — the SEO/AEO "money pages".
 *
 * ============================ SOURCE OF TRUTH ============================
 * EVERY treatment name and EVERY price on this page comes from
 * "MASTER SHEET PROCEDURES" — the centre-wise rate sheet (Calicut,
 * Cherthala, Edapally, Mangalore).
 *
 * DO NOT add a treatment here unless it exists on that sheet.
 * DO NOT invent, round or estimate a price. If the rate sheet shows a blank
 * or zero for a centre, that centre does NOT offer it and the page must say
 * where it is available.
 *
 * Treatments NOT on the rate sheet and therefore NOT on this website:
 *   Profhilo, polynucleotides, NCTF, Pico laser, HIFU (listed but unpriced),
 *   tattoo removal (listed but unpriced). Do not reintroduce them.
 * =========================================================================
 *
 * PRICING: NO PRICE MAY APPEAR ON THIS WEBSITE. Not a figure, not a range,
 * not an "onwards", not an anchor. Rates are commercially confidential and are
 * quoted to the patient at consultation only.
 * The `pricing` field below therefore lists WHAT DETERMINES the cost, never
 * the cost. Cost-intent search queries are answered by explaining the factors
 * and inviting the enquiry — which converts better than a number anyway.
 *
 * COMPLIANCE (India): Drugs & Magic Remedies Act 1954 schedules include
 * obesity, baldness and skin disorders. Content in those areas is written as
 * patient education with consultation-first framing. No prescription product
 * names, no before/after, no testimonials, no guarantees, no "permanent",
 * "cure", "100%", "best" or "No.1".
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
  /**
   * NEVER a rupee figure. Each entry names a factor that moves the price, so a
   * patient searching "how much does X cost" gets a real answer about how
   * pricing works and a reason to ask.
   */
  pricing: { label: string; price: string }[];
  pricingNote: string;
  /** Set ONLY where the rate sheet shows the treatment is not at all four clinics. */
  availability?: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

const CONSULT_NOTE =
  "We quote openly and in full — at your consultation, once a doctor has seen what you actually need. We do not publish rates, because a number without an assessment behind it is guesswork, and every quote we give is itemised before anything begins. Ask us on WhatsApp or at your visit and you will get the complete figure with nothing added later. EMI options are available on courses.";

export const treatmentPages: TreatmentPage[] = [
  /* ================================================================== */
  {
    slug: "laser-hair-reduction",
    name: "Laser Hair Reduction",
    heroTitle: "Laser Hair Reduction — Doctor-Supervised, Skin-Type Matched",
    heroSub:
      "Session protocols set by doctors, device settings chosen for Indian skin tones, at all four clinics.",
    directAnswer:
      "Laser hair reduction uses focused light absorbed by the pigment in the hair to weaken the follicle, so hair regrows finer and slower over a course of sessions. At Dolce Estetica it is physician-supervised and available at all four clinics, with device settings matched to your skin type. Sessions run from about 15 minutes for a small area such as the upper lip to around 45 minutes for full legs. The number of sessions and the cost are confirmed after a doctor assesses your hair and skin.",
    forWhom: [
      "Tired of the waxing, shaving and threading cycle",
      "Ingrown hairs, razor bumps or darkening after waxing",
      "Preparing for a wedding or a particular season",
      "Men looking for beard shaping, chest, back or body grooming",
      "Anyone whose skin reacts badly to repeated waxing",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding — treatment is deferred",
      "Skin with a recent tan or active sunburn at the treatment site — we reschedule rather than risk a burn",
      "Active infection, open skin or an inflamed rash in the area",
      "Anyone on medication that increases light sensitivity, without discussing it first",
      "Very fine, light or white hair, which carries too little pigment for the laser to target",
    ],
    steps: [
      {
        title: "Consultation and patch test",
        text: "A doctor examines the area, checks your skin type and recent sun exposure, and where there is any doubt a test patch is done before a full session.",
      },
      {
        title: "Preparation",
        text: "The area is shaved and cleaned. You are given eye protection. Hair must be shaved, not waxed or threaded — the laser needs the follicle intact.",
      },
      {
        title: "The session",
        text: "The handpiece is passed over the area with cooling applied. Most people describe a warm snapping sensation. A small area takes 15 minutes; full legs take around 45.",
      },
      {
        title: "Aftercare",
        text: "Mild redness and small bumps around the follicles for a day are expected. Avoid heat, sweat, sun and friction for 48 hours, and use SPF 50 daily on exposed areas.",
      },
    ],
    results:
      "Hair reduces gradually across a course rather than after one session, because only hairs in their active growth phase respond at each visit. Most areas need multiple sessions spaced weeks apart, and maintenance sessions afterwards. Treated hairs shed over one to three weeks after each session, which looks like regrowth but is not. Response varies with hair colour, thickness, hormones and skin type — no clinic can promise a fixed number of sessions before assessing you.",
    pricing: [
      { label: "Size of the area treated", price: "Upper lip costs a fraction of full legs" },
      { label: "How many areas you combine", price: "Combined areas are quoted together, not added up" },
      { label: "Number of sessions in your course", price: "Set after assessment, not promised upfront" },
      { label: "Single session or a package", price: "Courses are quoted as one figure with EMI available" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      {
        q: "How much does laser hair reduction cost?",
        a: "Cost depends on the size of the area, how many areas you treat together, and how many sessions your course needs — a small area such as the upper lip costs a fraction of full legs. We quote the full figure at consultation once a doctor has assessed your hair and skin, itemised before anything begins. Message us on WhatsApp with the areas you are considering and we will talk you through it.",
      },
      {
        q: "Is laser hair reduction safe for Indian skin?",
        a: "Yes, when the device settings are matched to your skin type. Darker skin carries more melanin in the surrounding skin, so settings are adjusted and cooling used to protect it. Recent tanning is the main reason a session is postponed, because it raises the risk of burns and pigment change.",
      },
      {
        q: "Can I shave between sessions?",
        a: "Yes. Shaving is fine and often recommended, because it cuts the hair at the surface while leaving the follicle intact. Waxing, threading, plucking and epilation must be avoided between sessions — they remove the target the laser needs.",
      },
      {
        q: "Does laser hair reduction hurt?",
        a: "Most people describe a warm snapping sensation rather than pain, with cooling applied throughout. Sensitive areas such as the upper lip and bikini feel more than the arms or legs. Sessions are short — 15 minutes for a small area.",
      },
      {
        q: "How many sessions will I need?",
        a: "It depends on the area, your hair thickness, colour and hormonal factors, so the number is set after assessment rather than promised in advance. Hair responds only during its active growth phase, which is why sessions are spaced weeks apart and why a course is needed rather than a single visit.",
      },
      {
        q: "Is laser hair removal permanent?",
        a: "It is hair reduction, not removal. Hair regrows finer, lighter and slower, and most people need occasional maintenance sessions afterwards. Any clinic promising permanent removal is overstating what the treatment does.",
      },
    ],
    related: ["acne-and-scar-care", "skin-brightening-medifacials"],
  },

  /* ================================================================== */
  {
    slug: "acne-and-scar-care",
    name: "Acne & Acne Scar Care",
    heroTitle: "Acne and Acne Scars — Treated in the Right Order",
    heroSub:
      "Active acne is controlled first, then scars are treated. Doing it the other way round creates new marks.",
    directAnswer:
      "Acne and acne scarring are treated in sequence: active breakouts are settled first, then scarring is addressed. At Dolce Estetica the tools are medical chemical peels, microneedling and fractional CO2 laser, including spot-by-spot treatment for individual deep scars. Scar treatment produces meaningful improvement in texture and shadow rather than complete erasure, and needs a course spaced several weeks apart rather than a single session.",
    forWhom: [
      "Active acne that has not settled with over-the-counter products",
      "Marks and dark patches left after spots have healed",
      "Pitted or dented scars — boxcar, rolling or icepick",
      "Adult or jawline-pattern acne appearing after the teenage years",
      "Body acne on the back or chest",
    ],
    notFor: [
      "Scar treatment while acne is still active — new scars form on inflamed skin, so acne is controlled first",
      "Anyone pregnant or breastfeeding, for several of these treatments",
      "Active skin infection, cold sores or broken skin in the area",
      "Anyone with a personal or family history of keloid scarring, without discussing it first",
      "Skin with a fresh tan, where resurfacing raises the risk of pigmentation",
    ],
    steps: [
      {
        title: "Assessment",
        text: "A doctor examines your skin in good light, identifies whether the problem is active acne, post-acne marks, pitted scarring or a mix, and looks for triggers that need managing first.",
      },
      {
        title: "Control the acne",
        text: "Active breakouts are settled before any resurfacing begins. Medical chemical peels are commonly used at this stage, with medical treatment prescribed where needed.",
      },
      {
        title: "Treat the scarring",
        text: "Depending on scar type, microneedling or fractional CO2 laser. Individual deep scars can be treated spot by spot rather than resurfacing the whole face.",
      },
      {
        title: "Protect the result",
        text: "Strict sun protection during healing, because pigmentation after resurfacing is the main risk on Indian skin. A home care routine is given at the same visit.",
      },
    ],
    results:
      "Improvement rather than erasure. Realistically, a course softens texture and shadow so scars become far less noticeable in normal light. Sessions are spaced several weeks apart and collagen continues remodelling for months after the last one, so the final result is judged well after treatment ends — not immediately. Deep icepick scars respond least to resurfacing alone. Complete restoration to pre-acne skin is not an outcome any clinic can promise.",
    pricing: [
      { label: "Whether we are treating acne, marks or scars", price: "Three different problems, three different plans" },
      { label: "Which scar types you have", price: "Spot treatment costs far less than full-face resurfacing" },
      { label: "Area treated", price: "A small area is a fraction of a full face" },
      { label: "Length of the course", price: "Confirmed after assessment, quoted as one figure" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      {
        q: "How much does acne scar treatment cost?",
        a: "It depends on which scar types you have, how large an area needs treating, and how many sessions your course runs to. Treating a few individual deep scars costs far less than resurfacing a full face. We quote the complete figure at consultation after examining your skin in proper light — ask us on WhatsApp and we will explain what your case is likely to involve.",
      },
      {
        q: "Should I treat active acne before acne scars?",
        a: "Yes. Active acne is controlled first. Resurfacing inflamed skin risks creating new scars, and skin with ongoing breakouts responds less predictably. This sequencing is the single most common reason scar treatment underperforms elsewhere.",
      },
      {
        q: "Is CO2 laser safe on Indian skin?",
        a: "It is used on Indian skin with conservative settings. The main risk is post-inflammatory hyperpigmentation — temporary darkening during healing — which is managed by preparing the skin beforehand, choosing careful settings and strict sun avoidance afterwards.",
      },
      {
        q: "What is the difference between acne marks and acne scars?",
        a: "Marks are flat discolouration left after a spot heals and usually fade over months, often responding to peels. Scars are changes in the skin's surface — pits, dents or raised tissue — that do not fade on their own and need resurfacing or another procedure.",
      },
      {
        q: "How long is the downtime after CO2 laser?",
        a: "Expect redness and a sandpaper-like texture for several days, with the exact recovery depending on the settings used and the area treated. Your doctor will tell you what to expect for your specific plan and give you an aftercare routine before you leave.",
      },
      {
        q: "Can acne scars be removed completely?",
        a: "No. Treatment produces improvement, not erasure. A realistic goal is meaningful softening so scars are far less noticeable in normal light. Any promise of complete removal is not achievable.",
      },
    ],
    related: ["pigmentation-and-peels", "skin-brightening-medifacials"],
  },

  /* ================================================================== */
  {
    slug: "pigmentation-and-peels",
    name: "Pigmentation & Medical Peels",
    heroTitle: "Pigmentation — Controlled, Not Bleached",
    heroSub:
      "Melasma, sun damage, post-acne marks and uneven tone need different answers. We start by identifying which one you have.",
    directAnswer:
      "Pigmentation is treated at Dolce Estetica with medical peels and laser toning, chosen according to which type of pigmentation you actually have. Melasma, post-acne marks and sun damage look similar but behave completely differently. Melasma in particular is a chronic, relapsing condition that is managed rather than cured, and aggressive treatment can make it worse — which is why the diagnosis always comes before the device.",
    forWhom: [
      "Dark patches on the cheeks, forehead or upper lip in a melasma pattern",
      "Tanning and sun damage from year-round exposure",
      "Dark marks left behind after acne",
      "Uneven overall tone or dullness",
      "Lip pigmentation or dark circles being assessed by a doctor",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding — most pigmentation treatment is deferred",
      "Skin with a fresh tan or active sunburn",
      "Anyone unwilling to use daily sun protection — without it, pigmentation returns whatever we do",
      "Active infection, eczema flare or broken skin in the area",
      "Anyone currently using an unlabelled skin-lightening cream, until it has been reviewed by the doctor",
    ],
    steps: [
      {
        title: "Identify the type",
        text: "Melasma, post-inflammatory pigmentation and sun spots look similar but behave completely differently. A doctor examines the pattern, edges and distribution before anything is prescribed.",
      },
      {
        title: "Protect first",
        text: "Daily broad-spectrum sun protection is established before treatment begins. In coastal Kerala and Karnataka, where UV stays high year-round, this is part of the treatment and not general advice.",
      },
      {
        title: "Treat conservatively",
        text: "Medical peels are usually the starting point — chemical peel, yellow peel or Cosmelan, depending on what was found. Laser toning is added where it is suitable for your pigmentation type.",
      },
      {
        title: "Maintain",
        text: "Pigmentation, especially melasma, relapses with sun, heat and hormonal change. A maintenance plan is agreed rather than stopping the moment skin looks clear.",
      },
    ],
    results:
      "Realistic goals are meaningful lightening, slower and less frequent relapse, and a routine you can sustain. Timelines are measured in months, not weeks. Melasma in particular is chronic and relapsing — some patients achieve long stretches of near-clear skin, most will see some return with sun exposure or hormonal change and will need maintenance. Any promise of permanent removal is inconsistent with how pigmentation behaves.",
    pricing: [
      { label: "Which type of pigmentation you have", price: "Melasma, sun damage and post-acne marks differ in plan and cost" },
      { label: "Which peel is appropriate", price: "Ranges from a basic medical peel to a Cosmelan protocol" },
      { label: "Area treated", price: "Under-eye or lip costs less than a full face" },
      { label: "Maintenance", price: "Melasma needs ongoing care; this is planned upfront" },
    ],
    pricingNote: CONSULT_NOTE,
    availability:
      "Chemical and yellow peels are available at all four clinics. Cosmelan peel is currently available at our Edapally (Kochi) clinic. Laser toning, carbon peel and Hollywood peel are currently available at Cherthala and Edapally.",
    faqs: [
      {
        q: "How much does pigmentation treatment cost?",
        a: "It depends entirely on which type of pigmentation you have, which peel or device is appropriate, and how large an area needs treating — an under-eye peel and a full-face Cosmelan protocol are very different treatments. We quote in full at consultation, after the pigmentation is properly identified. Guessing a price before diagnosis would be meaningless.",
      },
      {
        q: "Can melasma be cured permanently?",
        a: "No. Melasma is a chronic, relapsing condition. Treatment aims at meaningful lightening, slower relapse and sustainable maintenance rather than permanent removal. Sun protection is the single most important factor in keeping it controlled.",
      },
      {
        q: "Can laser make pigmentation worse?",
        a: "Yes, if it is too aggressive or used on the wrong type of pigmentation. Melasma in particular can rebound darker after heavy thermal treatment, and the risk is higher on darker skin. This is why sun protection and conservative peels are established before any device is considered.",
      },
      {
        q: "Which clinics offer Cosmelan peel?",
        a: "Cosmelan peel is currently available at our Edapally (Kochi) clinic. Chemical peels and yellow peels are available at all four clinics — Calicut, Cherthala, Edapally and Mangalore.",
      },
      {
        q: "Do I still need sunscreen after pigmentation treatment?",
        a: "Yes, daily and reapplied. Ultraviolet and visible light are among the strongest triggers, and in coastal Kerala and Karnataka UV levels stay high through most of the year. Without daily protection, pigmentation returns regardless of the treatment done.",
      },
      {
        q: "Are skin-lightening creams from the pharmacy safe?",
        a: "Not necessarily. Unlabelled creams containing undeclared steroids are a recurring cause of worsened, harder-to-treat pigmentation. If you are using a cream that lightens rapidly and you do not know its full ingredient list, bring it to your consultation.",
      },
    ],
    related: ["skin-brightening-medifacials", "acne-and-scar-care"],
  },

  /* ================================================================== */
  {
    slug: "skin-brightening-medifacials",
    name: "Medifacials & Skin Brightening",
    heroTitle: "Medifacials — Clinical, Not Cosmetic",
    heroSub:
      "Performed in a clinic, chosen by a doctor after assessing your skin, with no downtime.",
    directAnswer:
      "Medifacials at Dolce Estetica are clinic-performed treatments that deep-cleanse, hydrate and brighten without downtime. The range runs from Med Facial Premium and Aqua Luxe Signature through Aqua Luxe Deluxe and Aqua Luxe Platinum, with carbon peel and Hollywood peel available at selected clinics. Which one suits you is decided by a doctor rather than picked from a menu. Sessions take 50 to 80 minutes and you can return to work the same day.",
    forWhom: [
      "Dull, tired-looking skin that good products alone have not fixed",
      "Congestion, blackheads and open pores",
      "Dry or dehydrated skin needing a clinical hydration boost",
      "Anyone preparing for a wedding, shoot or event",
      "First-time patients who want a clinical treatment with no downtime",
    ],
    notFor: [
      "Active, inflamed acne — this is assessed and treated differently first",
      "Broken skin, active infection or a cold sore in the area",
      "Anyone expecting a facial to correct pigmentation, scarring or laxity — those need different treatments",
      "Skin that has just had resurfacing, until healing is complete",
    ],
    steps: [
      {
        title: "Skin assessment",
        text: "A doctor decides which medifacial suits your skin, rather than you choosing from a menu. Dull skin, congestion and dehydration each point to a different option.",
      },
      {
        title: "Cleanse and prepare",
        text: "Deep cleansing and gentle exfoliation of the surface, tailored to how sensitive or oily your skin is.",
      },
      {
        title: "Active treatment",
        text: "Hydration, brightening or clarifying actives delivered clinically. Carbon peel and Hollywood peel are used where suitable and available.",
      },
      {
        title: "Finish and protect",
        text: "Soothing and sun protection applied. You can wear makeup and return to work the same day.",
      },
    ],
    results:
      "A visible freshness, better hydration and a cleaner texture after a single session, typically most noticeable over the first few days. Medifacials work on the surface and on hydration — they do not treat pigmentation, scarring or laxity, and lasting change in skin quality comes from a planned course rather than one appointment. Anyone selling a single facial as a transformation is overselling it.",
    pricing: [
      { label: "Which medifacial your skin needs", price: "Signature, Deluxe and Platinum differ in depth and time" },
      { label: "Session length", price: "From 50 to 80 minutes depending on the treatment" },
      { label: "Single session or a course", price: "A planned course is quoted as one figure" },
      { label: "Add-on treatments", price: "Carbon or Hollywood peel where suitable and available" },
    ],
    pricingNote: CONSULT_NOTE,
    availability:
      "Medifacials and the Aqua Luxe range are available at all four clinics. Carbon peel and Hollywood peel are currently available at Cherthala and Edapally.",
    faqs: [
      {
        q: "How much does a medifacial cost?",
        a: "It depends on which medifacial your skin actually needs — Signature, Deluxe and Platinum differ in depth, actives and session length — and on whether you are having a single session or a planned course. We quote at consultation or on WhatsApp once we know what you are looking for.",
      },
      {
        q: "What is the difference between a medifacial and a salon facial?",
        a: "A medifacial is performed in a clinic under medical supervision, using clinical-grade actives and equipment, with the choice of treatment made after a doctor assesses your skin. A salon facial is a cosmetic treatment chosen from a menu.",
      },
      {
        q: "Is there any downtime after a medifacial?",
        a: "No. Mild flushing may last a short while afterwards. You can apply makeup and return to work the same day, which is why medifacials are often chosen before events.",
      },
      {
        q: "How often should I have a medifacial?",
        a: "That depends on your skin and your goal, and is planned at consultation. A course spaced over weeks produces more lasting change in skin quality than occasional single sessions.",
      },
      {
        q: "Will a medifacial remove my pigmentation or acne scars?",
        a: "No. Medifacials improve hydration, cleanliness and surface radiance. Pigmentation and scarring are separate clinical problems needing peels, laser or microneedling, and are assessed separately.",
      },
    ],
    related: ["pigmentation-and-peels", "anti-ageing-skin-boosters"],
  },

  /* ================================================================== */
  {
    slug: "anti-ageing-skin-boosters",
    name: "Skin Boosters & Skin Quality",
    heroTitle: "Skin Boosters — Hydration Placed Inside the Skin",
    heroSub:
      "For skin that has become dry, dull and crepey. Not a filler — these do not add volume or change your face.",
    directAnswer:
      "Skin boosters are injectable hydration placed inside the skin to improve texture, firmness and glow. They are not fillers and do not add volume or change facial shape. At Dolce Estetica the skin-quality range includes Skin Booster and Swiss Skin Booster, alongside PRP, GFC and Exosome therapy for the face and skin mesotherapy. Which is right for you depends on your skin and your goal over a course of months. Results develop over weeks, not overnight.",
    forWhom: [
      "Skin that feels dry, dull and has lost its bounce despite good skincare",
      "Fine crepey texture on the face or neck",
      "Anyone wanting skin quality improved without changing facial shape",
      "Patients in their 30s and 40s starting preventive skin care",
      "Anyone preparing for an event over a period of months rather than days",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding",
      "Anyone with a known allergy to hyaluronic acid or any component used",
      "Active infection, acne lesions or broken skin at the injection sites",
      "Anyone on blood thinners, without discussing bruising risk with their doctor first",
      "Patients whose real concern is sagging or lost volume — a booster will not deliver what they are asking for",
    ],
    steps: [
      {
        title: "Assessment",
        text: "A doctor establishes whether your concern is skin quality or facial structure. These are different problems and only one of them is answered by a booster.",
      },
      {
        title: "Numbing",
        text: "Topical anaesthetic is applied and given time to work before any injection.",
      },
      {
        title: "The session",
        text: "Product is placed across the treatment area through fine needles at multiple points. Sessions take around 40 minutes.",
      },
      {
        title: "Aftercare",
        text: "Small bumps at each point are expected and usually settle within hours to a day. Bruising is possible. Makeup is avoided for the rest of the day.",
      },
    ],
    results:
      "Change is gradual, typically visible over four to eight weeks rather than immediately, and boosters are usually planned as a short course rather than a single session. They improve hydration, texture and firmness. They do not lift, reposition tissue or restore lost volume. Duration varies with age, skin condition, sun exposure and general health, and maintenance is normally discussed at the outset rather than presented later as an upsell.",
    pricing: [
      { label: "Which treatment suits your skin", price: "PRP, GFC, Exosome and skin boosters differ in cost" },
      { label: "Volume of product used", price: "Boosters are quoted by volume, so you pay for what is used" },
      { label: "Number of sessions", price: "Boosters work as a short course, quoted together" },
      { label: "Area treated", price: "Face, neck or under-eye each priced separately" },
    ],
    pricingNote: CONSULT_NOTE,
    availability:
      "Skin boosters, GFC, Exosome and PRP for the face are available at all four clinics. Glow Booster is currently available at our Edapally (Kochi) clinic.",
    faqs: [
      {
        q: "How much do skin boosters cost?",
        a: "It depends on which treatment suits your skin, how much product is used and how many sessions your course runs to — PRP, GFC, Exosome therapy and skin boosters all sit at different price points. Boosters are quoted by volume so you pay for what is actually used. Full pricing is given at consultation.",
      },
      {
        q: "Are skin boosters the same as fillers?",
        a: "No. A filler adds volume in a specific place and changes contour. A skin booster spreads through the skin to improve hydration and firmness without adding projection or altering facial shape. They answer different concerns.",
      },
      {
        q: "How long do skin boosters take to work?",
        a: "Change develops gradually, usually over four to eight weeks rather than overnight. This is the most common source of disappointment with boosters and the reason expectations are set before the first session, not after.",
      },
      {
        q: "What is the difference between GFC, PRP and Exosome for the face?",
        a: "PRP uses your own concentrated plasma. GFC uses growth factors prepared from your own blood. Exosome therapy uses cell-signalling material and is the most advanced of the three. Which suits you depends on your skin, your goal and your budget over a course, and is decided at consultation.",
      },
      {
        q: "Do skin boosters tighten sagging skin?",
        a: "No. Boosters improve the quality of the skin but do not lift or reposition tissue. Significant laxity is a separate clinical problem and needs a different conversation at consultation.",
      },
      {
        q: "Is there downtime after skin boosters?",
        a: "Small raised bumps at each injection point are expected and usually settle within a few hours to a day. Bruising is possible. Most people return to normal activity the same day and avoid makeup until the following morning.",
      },
    ],
    related: ["botox-fillers-and-threads", "skin-brightening-medifacials"],
  },

  /* ================================================================== */
  {
    slug: "botox-fillers-and-threads",
    name: "Botox, Fillers & Thread Lifts",
    heroTitle: "Injectables — Conservative, Doctor-Performed, Quoted Per Unit",
    heroSub:
      "Botox is charged by the unit, so you pay for what is actually used — agreed with you before we begin.",
    directAnswer:
      "Botox, dermal fillers and thread lifts are doctor-performed injectable treatments for expression lines, volume loss and facial contour. At Dolce Estetica, Botox and Meso Botox are charged by the unit rather than by the area, so you pay for what your face actually needs and the number of units is agreed with you before treatment starts. Fillers are quoted per syringe and thread lifts by the type and number of threads used.",
    forWhom: [
      "Frown lines, forehead lines or crow's feet that show at rest",
      "Loss of definition along the jawline or in the mid-face",
      "Anyone wanting a conservative, gradual result rather than an obvious change",
      "Patients who want a clear per-unit price rather than a package figure",
      "Anyone who has been quoted a flat rate elsewhere and wants to understand what they are paying for",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding",
      "Active infection or inflamed skin at the treatment site",
      "Certain neuromuscular conditions, which must be disclosed before Botox",
      "Anyone on blood thinners, without discussing it with their prescribing doctor first",
      "Anyone seeking a dramatic change — we work conservatively and will say so at consultation",
      "Anyone with unrealistic expectations of what injectables can achieve",
    ],
    steps: [
      {
        title: "Consultation",
        text: "A doctor assesses your face at rest and in movement, and tells you honestly what injectables can and cannot change. Some concerns are better answered another way.",
      },
      {
        title: "Plan and quote",
        text: "The number of units or syringes is agreed before anything begins, so you know the cost before treatment rather than after.",
      },
      {
        title: "The procedure",
        text: "Topical numbing where appropriate, then treatment. Botox takes around 35 minutes, fillers around 55, and a cog thread lift 75 to 115 minutes.",
      },
      {
        title: "Review",
        text: "Botox is reviewed after it has taken full effect, as it develops over days rather than immediately. Adjustments are made at that review rather than on the day.",
      },
    ],
    results:
      "Botox softens expression lines gradually over several days and wears off over months, so it is a repeated treatment rather than a one-time fix. Fillers give an immediate change that settles over the following weeks. Thread lifts give support that reduces over time. All three are temporary by design. Duration varies considerably between individuals, and outcomes depend on your anatomy — which is why assessment happens before any promise.",
    pricing: [
      { label: "Units of Botox your face needs", price: "Charged per unit, agreed before we begin" },
      { label: "Number of filler syringes", price: "Quoted per syringe after assessment" },
      { label: "Type and number of threads", price: "Mono, single-insertion cog or a full cog lift" },
      { label: "How long the effect is designed to last", price: "Longer-lasting options cost more" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      {
        q: "How much does Botox cost?",
        a: "Botox is charged by the unit rather than by the area, so the total depends on how many units your face actually needs. That number is decided at consultation and agreed with you before anything is done — you will never be surprised by the bill afterwards. Ask us on WhatsApp and we will explain how it is worked out.",
      },
      {
        q: "Why is Botox priced per unit instead of per area?",
        a: "Because different faces need different amounts for the same area. Per-unit pricing means you pay for what is actually used rather than a flat rate that may include more or less than you need. The number of units is agreed with you before treatment.",
      },
      {
        q: "How much do dermal fillers cost?",
        a: "Fillers are quoted per syringe, and how many you need is decided after a doctor assesses your face. The full cost is confirmed before treatment begins rather than added up afterwards.",
      },
      {
        q: "How much does a thread lift cost?",
        a: "It depends on the type of thread and how many are used — mono threads, a single-insertion cog thread and a full cog thread lift are very different procedures at very different price points. Which is appropriate depends on your facial assessment, and the figure is confirmed at consultation.",
      },
      {
        q: "How long does Botox last?",
        a: "Botox is temporary and wears off over months, with the exact duration varying between individuals depending on dose, the muscle treated and your own metabolism. It is a repeated treatment, and your doctor will discuss a realistic interval at consultation.",
      },
      {
        q: "Will Botox make my face look frozen?",
        a: "Not when it is dosed conservatively, which is how we work. The aim is softening rather than immobility. If you want a dramatic change, we will tell you at consultation what we are and are not willing to do.",
      },
    ],
    related: ["anti-ageing-skin-boosters", "skin-brightening-medifacials"],
  },

  /* ================================================================== */
  {
    slug: "hair-restoration-prp-gfc",
    name: "Hair Restoration — PRP, GFC & Exosome",
    heroTitle: "Hair Loss — Assessed Before It Is Treated",
    heroSub:
      "Hair fall has many causes and not all of them are treated with injections. Assessment first, always.",
    directAnswer:
      "Hair loss is assessed medically before treatment, because thyroid problems, iron deficiency, post-delivery changes and pattern hair loss all look similar and are treated differently. At Dolce Estetica the treatments available are PRP, GFC, Exosome therapy, hair mesotherapy and scalp microneedling. Blood investigations are frequently advised before starting a course, because treating the scalp while an internal cause continues rarely gives a lasting result.",
    forWhom: [
      "General hair fall or diffuse thinning",
      "A widening parting or thinning at the crown",
      "Hair fall that started after delivery or after an illness",
      "Patchy or thin beard growth",
      "Anyone who wants the cause investigated rather than a package sold",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding",
      "Active scalp infection, or an inflamed or broken scalp",
      "Anyone with a bleeding disorder or on blood thinners, without discussing it first",
      "Anyone expecting treatment to work without addressing an underlying medical cause such as thyroid dysfunction or anaemia",
      "Sudden patchy hair loss, which needs a diagnosis before any procedure",
    ],
    steps: [
      {
        title: "Medical assessment",
        text: "A doctor examines the scalp and pattern of loss and takes a full history. Blood investigations are often advised, because treating the scalp while an internal cause continues rarely works.",
      },
      {
        title: "Blood draw and preparation",
        text: "For PRP and GFC, your own blood is drawn and processed to concentrate the platelets or growth factors. Exosome therapy uses a prepared cell-signalling material instead.",
      },
      {
        title: "The session",
        text: "The scalp is cleaned, numbed where needed, and the preparation is injected across the affected area. Sessions take 50 to 70 minutes.",
      },
      {
        title: "Course and review",
        text: "Treatment is given as a course over months with review between sessions. Home care and any medical treatment for an underlying cause run alongside it.",
      },
    ],
    results:
      "Hair responds slowly. Change is judged over months, not weeks, because the hair cycle itself is measured in months. A realistic aim is reduced shedding and improvement in hair calibre and density over a course, with maintenance afterwards. Response varies considerably and depends heavily on the cause, how long the loss has been present and whether any underlying medical factor is corrected. No responsible clinic guarantees regrowth.",
    pricing: [
      { label: "Which treatment your assessment points to", price: "PRP, GFC and Exosome sit at different price points" },
      { label: "Length of the course", price: "Hair is treated over months, quoted as a course" },
      { label: "Blood investigations", price: "Lab charges where the doctor advises them" },
      { label: "Home care and any medical treatment", price: "Discussed openly at the same visit" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      {
        q: "What is the difference between PRP and GFC for hair?",
        a: "Both use your own blood. PRP uses concentrated platelets from your plasma. GFC concentrates the growth factors released from those platelets. GFC is the more processed of the two and is priced higher. Which suits you is decided at consultation based on your assessment and the course planned.",
      },
      {
        q: "How much does PRP or GFC for hair cost?",
        a: "PRP, GFC and Exosome therapy sit at different price points, and what matters more is how many sessions your course runs to — which is decided after medical assessment rather than quoted over the phone. We give you the full course figure at consultation, including any blood investigations, before you commit to anything.",
      },
      {
        q: "Do I need blood tests before hair treatment?",
        a: "Often, yes. Thyroid dysfunction, iron deficiency and other internal causes produce hair loss that looks identical to pattern loss. Treating the scalp while an internal cause continues rarely gives a lasting result, so investigation comes first.",
      },
      {
        q: "How long before I see a change in my hair?",
        a: "Months, not weeks. The hair growth cycle itself runs over months, so response is assessed across a course rather than after one or two sessions. Expect reduced shedding before you see visible density change.",
      },
      {
        q: "Is hair loss after delivery permanent?",
        a: "Post-partum hair shedding is common and usually settles on its own over months. It is assessed rather than immediately treated, because the management differs from pattern hair loss. This is a consultation matter.",
      },
      {
        q: "Does PRP hurt?",
        a: "The scalp is numbed where needed and most patients tolerate it well, describing pressure and brief stinging. The session takes around 70 minutes including preparation of your blood sample.",
      },
    ],
    related: ["scalp-and-hair-treatments"],
  },

  /* ================================================================== */
  {
    slug: "scalp-and-hair-treatments",
    name: "Scalp & Hair Treatments",
    heroTitle: "Scalp Health — The Part Most People Skip",
    heroSub:
      "Dandruff, build-up, dryness and frizz treated clinically, after the scalp is examined.",
    directAnswer:
      "Dolce Estetica offers clinical scalp and hair treatments for dandruff, build-up, dryness and damage — Anti-Dandruff Treatment with or without a hair wash, Root Revival, Pure Scalp Detox for dandruff with heavy build-up, Intense Repair for frizz and damage, and Hydra Nourish for hydration. Sessions take about 55 minutes. These treat the condition of the scalp and are not a substitute for medical assessment of hair loss.",
    forWhom: [
      "Persistent dandruff, itching or flaking",
      "Product build-up and a scalp that feels heavy or congested",
      "Dry, frizzy or chemically damaged hair",
      "Anyone whose scalp needs preparing before starting a hair restoration course",
      "Anyone wanting a clinical scalp treatment rather than a salon service",
    ],
    notFor: [
      "Active scalp infection, open sores or a severe inflamed rash — this needs medical assessment first",
      "Anyone expecting a scalp treatment to reverse hair loss — that is assessed and treated separately",
      "Recently chemically treated hair, until the scalp has settled",
    ],
    steps: [
      {
        title: "Scalp assessment",
        text: "The scalp is examined to establish whether the problem is dandruff, build-up, dryness or something requiring medical treatment.",
      },
      {
        title: "Cleanse and treat",
        text: "The scalp is cleansed and the appropriate treatment applied — anti-dandruff, detox, repair or hydration depending on what was found.",
      },
      {
        title: "Massage and absorption",
        text: "Application is worked through the scalp so the actives reach where they are needed rather than sitting on the hair.",
      },
      {
        title: "Home care",
        text: "You are given a routine to follow, because in-clinic sessions alone do not maintain a healthy scalp between visits.",
      },
    ],
    results:
      "Most people notice relief from itching and flaking and a cleaner-feeling scalp after a session, with lasting control coming from a short course plus consistent home care rather than a single visit. These treatments improve scalp condition. They are not a treatment for hair loss, which is a separate medical assessment.",
    pricing: [
      { label: "Which treatment your scalp needs", price: "Decided after the scalp is examined" },
      { label: "Whether a hair wash is included", price: "Offered as an add-on to some treatments" },
      { label: "Single session or a short course", price: "A course is quoted as one figure" },
      { label: "Home care products", price: "Optional, priced separately and never pushed" },
    ],
    pricingNote: CONSULT_NOTE,
    faqs: [
      {
        q: "How much does a dandruff treatment cost?",
        a: "It depends on which treatment your scalp actually needs and whether a hair wash is included — a basic anti-dandruff session and a full Pure Scalp Detox are different treatments. Sessions run around 50 to 60 minutes. We confirm the figure when you book or at your visit.",
      },
      {
        q: "What is the difference between anti-dandruff treatment and scalp detox?",
        a: "Anti-dandruff treatment targets flaking and itching. Pure Scalp Detox is a deeper cleanse aimed at dandruff combined with product and oil build-up that has left the scalp congested. Which you need is decided after the scalp is examined.",
      },
      {
        q: "Will a scalp treatment stop my hair fall?",
        a: "Not on its own. Scalp treatments improve the condition of the scalp. Hair loss has separate causes that need medical assessment, often including blood investigations, and is treated differently.",
      },
      {
        q: "How often should I have a scalp treatment?",
        a: "A short course is usually more effective than occasional single sessions, with the interval decided by what was found on examination and how your scalp responds.",
      },
    ],
    related: ["hair-restoration-prp-gfc"],
  },

  /* ================================================================== */
  {
    slug: "body-contouring",
    name: "Body Contouring & ThermaLuxe",
    heroTitle: "Body Contouring — Honest About What It Is",
    heroSub:
      "Radiofrequency contouring for specific areas. It is not a weight-loss treatment, and we will tell you so.",
    directAnswer:
      "ThermaLuxe is a radiofrequency and massage treatment used to contour specific areas — small areas such as the arms or double chin, medium areas such as love handles, and large areas such as the abdomen or thighs. Lipolytic injections are available where appropriate. Body contouring targets specific areas and does not reduce body weight; weight itself is a separate medical assessment and we will say so rather than sell you the wrong treatment.",
    forWhom: [
      "A stubborn pocket that has not responded to diet and exercise",
      "Love handles, upper arm or inner thigh fullness",
      "Fullness under the chin",
      "Anyone already managing their weight who wants specific areas addressed",
      "Post-pregnancy tummy concerns, once cleared by your doctor",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding",
      "Anyone looking for weight loss — this treats areas, not body weight, and we will tell you so at consultation",
      "Anyone with a pacemaker or implanted electronic device, without clearance",
      "Active skin infection, open wounds or a recent surgical scar in the area",
      "Anyone expecting a single session to produce a visible change",
    ],
    steps: [
      {
        title: "Assessment and measurement",
        text: "A doctor assesses the area and whether contouring is the right answer at all. Where the real issue is overall weight, that is said plainly and a different plan discussed.",
      },
      {
        title: "The session",
        text: "Radiofrequency with massage applied to the area. A small area takes about 45 minutes, a large area about 70.",
      },
      {
        title: "Course",
        text: "Contouring works across a course rather than in a single session. The number is planned at the outset so you know the total cost before starting.",
      },
      {
        title: "Support",
        text: "Results hold better alongside activity and nutrition. Where relevant, this is planned with our team rather than left to chance.",
      },
    ],
    results:
      "Change is gradual and measured across a course, and it is area-specific. Contouring does not reduce body weight and does not replace nutrition and activity. Realistic outcomes are improvement in the treated area's shape and firmness. Anyone promising dramatic change from radiofrequency alone is overstating it.",
    pricing: [
      { label: "Size of the area", price: "Small, medium and large areas are quoted differently" },
      { label: "How many areas you treat", price: "Combined areas are quoted together" },
      { label: "Number of sessions in the course", price: "Planned upfront so you know the total before starting" },
      { label: "Whether injections are added", price: "Lipolytic injections are quoted by volume used" },
    ],
    pricingNote: CONSULT_NOTE,
    availability:
      "ThermaLuxe and lipolytic injections are available at all four clinics. EMS sessions are currently available at our Edapally (Kochi) clinic.",
    faqs: [
      {
        q: "How much does body contouring cost?",
        a: "It depends on the size of the area, how many areas you treat and how many sessions your course runs to. We plan the full course at your first consultation and quote it as one figure, so you know the total before starting rather than being asked to extend part-way through.",
      },
      {
        q: "Is body contouring a weight-loss treatment?",
        a: "No. Body contouring treats specific areas and does not reduce body weight. If overall weight is the concern, that is a separate medical assessment and we will say so at consultation rather than sell you the wrong treatment.",
      },
      {
        q: "How many ThermaLuxe sessions will I need?",
        a: "Contouring works across a course rather than a single session. The number is planned at your first consultation after the area is assessed, so you know the total cost before starting rather than being asked to extend part-way through.",
      },
      {
        q: "Does ThermaLuxe hurt?",
        a: "It is generally described as a warm massage rather than a painful treatment. A small area takes around 45 minutes and a large area around 70.",
      },
      {
        q: "Which clinics offer EMS?",
        a: "EMS sessions are currently available at our Edapally (Kochi) clinic. ThermaLuxe body contouring and lipolytic injections are available at all four clinics.",
      },
    ],
    related: ["iv-therapy-and-wellness", "medical-weight-management"],
  },

  /* ================================================================== */
  {
    slug: "iv-therapy-and-wellness",
    name: "IV Therapy & Wellness Infusions",
    heroTitle: "IV Infusions — Doctor-Assessed, Not Walk-In",
    heroSub:
      "Hydration and nutrient infusions given under medical supervision, after assessment — never on request.",
    directAnswer:
      "IV infusions at Dolce Estetica are given under medical supervision after a doctor assessment, not on request. Sessions take around 65 minutes. Infusions are supportive treatments used alongside a plan — they are not a treatment for any medical condition, and any suspected deficiency should be investigated rather than assumed and repeatedly infused.",
    forWhom: [
      "Patients already under our care who need hydration or nutrient support as part of a plan",
      "Anyone whose blood work has shown a deficiency that a doctor has decided to address this way",
      "Patients on a metabolic or wellness programme where an infusion has been advised",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding, without specific clearance",
      "Anyone with kidney or heart conditions, without clearance from their treating physician",
      "Anyone wanting an infusion without assessment — we do not provide infusions on request",
      "Anyone expecting an infusion to treat a medical condition",
    ],
    steps: [
      {
        title: "Doctor assessment",
        text: "A doctor decides whether an infusion is appropriate for you at all, and whether blood investigations are needed first.",
      },
      {
        title: "Preparation",
        text: "The infusion is prepared according to what has been prescribed for you, not chosen from a menu.",
      },
      {
        title: "The infusion",
        text: "Given in a comfortable setting under supervision, taking around 65 minutes.",
      },
      {
        title: "Review",
        text: "Response is reviewed as part of your overall plan rather than treated as a standalone service.",
      },
    ],
    results:
      "Infusions are supportive. They are used as part of a plan, and their value depends entirely on whether there was an actual reason to give one. They do not treat medical conditions, and a genuine deficiency should be investigated and understood rather than repeatedly infused.",
    pricing: [
      { label: "Which infusion has been prescribed", price: "Decided by the doctor, not chosen from a menu" },
      { label: "Whether investigations are needed first", price: "Lab charges where the doctor advises them" },
      { label: "Single infusion or a planned series", price: "Quoted together as part of your plan" },
    ],
    pricingNote: CONSULT_NOTE,
    availability:
      "IV infusions are available at all four clinics.",
    faqs: [
      {
        q: "How much does an IV infusion cost?",
        a: "It depends on which infusion the doctor has decided is appropriate for you and whether any investigations are advised first. Because infusions are prescribed rather than chosen from a menu, the figure is given once that decision is made. Sessions take around 65 minutes.",
      },
      {
        q: "Can I just book an IV drip?",
        a: "No. Infusions are given after a doctor assessment, not on request. Depending on what you are describing, blood investigations may be advised first so that anything given is based on a finding rather than an assumption.",
      },
      {
        q: "Are IV vitamin infusions safe?",
        a: "They are given under medical supervision, which is the point of receiving one in a clinic. They are not appropriate for everyone — kidney and heart conditions and pregnancy require clearance, and every patient is assessed before an infusion is offered.",
      },
      {
        q: "Do IV infusions treat any medical condition?",
        a: "No. They are supportive treatments used as part of a plan. Any symptom that has brought you in should be investigated on its own terms rather than treated with repeated infusions.",
      },
    ],
    related: ["body-contouring", "medical-weight-management"],
  },

  /* ================================================================== */
  {
    slug: "medical-weight-management",
    name: "Weight & Metabolic Consultation",
    heroTitle: "Weight Concerns — A Medical Consultation, Not a Package",
    heroSub:
      "Assessment, investigation and a plan built for your metabolism. Consultation first, always.",
    directAnswer:
      "Weight and metabolic concerns at Dolce Estetica begin with a doctor consultation and investigation, not with a package or a prescription. Body composition, thyroid function, insulin resistance, PCOS and post-pregnancy changes all produce weight concerns that are managed differently. What is appropriate for you — including whether any medical therapy has a role at all — is decided by a doctor after assessment, and is not something that can responsibly be quoted or advertised in advance.",
    forWhom: [
      "Anyone whose weight has not responded to diet and exercise alone",
      "Weight regain after earlier successful efforts",
      "Irregular cycles alongside weight concerns",
      "A known or suspected thyroid or metabolic issue",
      "Anyone who wants their metabolism investigated rather than a programme sold to them",
    ],
    notFor: [
      "Anyone pregnant or breastfeeding, other than for post-pregnancy assessment at the appropriate time",
      "Anyone looking for a rapid result without medical assessment",
      "Anyone under 18, other than by paediatric referral",
      "Anyone seeking medication without consultation and investigation — we do not work that way",
    ],
    steps: [
      {
        title: "Consultation",
        text: "A doctor takes a full history, examines you and discusses what has and has not worked before. This appointment is about understanding the cause, not selling a plan.",
      },
      {
        title: "Investigation",
        text: "Body composition assessment and blood investigations where indicated, because thyroid dysfunction, insulin resistance and PCOS are common and each changes the plan.",
      },
      {
        title: "A plan built for you",
        text: "Nutrition, activity and clinical support appropriate to your findings. Where any medical therapy is considered, it is discussed in consultation with full information about what it does.",
      },
      {
        title: "Review",
        text: "Progress is reviewed against measurements rather than the scale alone, and the plan is adjusted as your body responds.",
      },
    ],
    results:
      "Sustainable change is measured across months and is judged on body composition, not weight alone. Outcomes vary considerably depending on the underlying cause, and the plan is adjusted along the way. We do not publish outcome figures or promise a result, because doing so for weight would be both clinically dishonest and not permitted.",
    pricing: [
      { label: "What your investigations show", price: "Thyroid, insulin resistance and PCOS change the plan" },
      { label: "Which elements your plan includes", price: "Nutrition, activity and clinical support" },
      { label: "Length of the programme", price: "Measured in months, planned at the outset" },
    ],
    pricingNote:
      "Weight and metabolic care is planned individually after consultation and investigation. Because Indian advertising regulations restrict what may be published about treatment for weight, specific therapies and their costs are discussed with you in clinic rather than listed here. Ask us at your consultation and you will get a complete, itemised answer.",
    faqs: [
      {
        q: "Do you offer weight-loss injections?",
        a: "Any medical therapy for weight is a prescription decision made by a doctor after consultation and investigation. It is not something we can discuss or price on a website under Indian advertising regulations, and not something that should be started without assessment. Book a consultation and you will get a complete answer in clinic.",
      },
      {
        q: "What happens at a weight and metabolic consultation?",
        a: "A doctor takes a full history, examines you, and arranges body composition assessment and blood investigations where indicated. Thyroid dysfunction, insulin resistance and PCOS are common and change the plan entirely, which is why investigation comes before any programme.",
      },
      {
        q: "Why can't I see weight-loss prices on your website?",
        a: "Indian regulations restrict advertising treatment for weight to the public. We keep the website compliant and give you full, itemised pricing at consultation instead. This is a legal constraint, not an attempt to hide costs.",
      },
      {
        q: "Is body contouring the same as weight management?",
        a: "No. Body contouring treats specific areas and does not reduce body weight. Weight management addresses the metabolic picture. If you ask for one when you need the other, we will tell you at consultation.",
      },
      {
        q: "Do I need blood tests?",
        a: "Usually yes, where indicated. Weight concerns driven by thyroid dysfunction, insulin resistance or PCOS look identical from the outside but respond to completely different management, so investigation comes first.",
      },
    ],
    related: ["body-contouring", "iv-therapy-and-wellness"],
  },
];

export function getTreatment(slug: string) {
  return treatmentPages.find((t) => t.slug === slug);
}
