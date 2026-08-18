/**
 * Blog / knowledge articles.
 *
 * These pages are written for two readers at once:
 *   1. A patient researching a decision before they ever call us.
 *   2. An answer engine (Google AI Overviews, ChatGPT, Perplexity, Gemini)
 *      looking for a self-contained, sourced, extractable answer.
 *
 * Structural rules that must be preserved when adding articles:
 *   - `directAnswer` answers the title question completely, on its own, in
 *     roughly 40-90 words. It is rendered first and is what gets quoted.
 *   - Every `h2` is phrased as a real patient question.
 *   - The block immediately under each `h2` must make full sense if extracted
 *     alone, with zero surrounding context.
 *   - Include real numbers (session counts, downtime in days, price bands) and
 *     name primary sources rather than saying "studies show".
 *   - No keyword stuffing. It measurably reduces citation rates.
 *
 * COMPLIANCE (India) — non-negotiable. Every article must stay inside the
 * informational/educational category:
 *   - No before-and-after imagery, no patient testimonials, no success stories.
 *   - No outcome guarantees, no "permanent", "cure", "100%", "best", "No.1".
 *   - No superlative or comparative claims against named competitors.
 *   - Drugs & Magic Remedies (Objectionable Advertisements) Act 1954 schedules
 *     include obesity, baldness and skin disorders. Content touching these must
 *     be written as patient education and risk information, never as an
 *     advertisement for treatment of the condition.
 *   - Every article ends with an in-person assessment caveat.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string; attribution: string };

export type FAQ = { q: string; a: string };

export type BlogSource = { label: string; url?: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  /** Shown in listings and used as the meta description. */
  excerpt: string;
  coverImage: string;
  author: string;
  /** Rendered under the byline. Kept factual — no self-laudatory wording. */
  authorCredentials?: string;
  reviewedBy?: string;
  date: string;
  dateModified?: string;
  category?: string;
  readingMinutes?: number;
  /**
   * Self-contained answer to the title question. Rendered in a highlighted
   * block directly under the heading, before anything else.
   */
  directAnswer: string;
  content: ContentBlock[];
  faqs: FAQ[];
  sources?: BlogSource[];
  /** Slugs from lib/data/treatment-pages.ts */
  relatedTreatments?: string[];
};

const REVIEWER = "Reviewed by the Dolce Estetica medical team";
const AUTHOR = "Dolce Estetica Medical Team";
const CREDENTIALS = "Written and reviewed by practising aesthetic physicians";

export const blogPosts: BlogPost[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "1",
    slug: "profhilo-india-cost-and-what-it-actually-does",
    title: "Profhilo in India: What It Costs, What It Actually Does, and Who Should Not Have It",
    excerpt:
      "A plain explanation of what Profhilo is, how it differs from filler and mesotherapy, realistic price bands in India, and the patients it is not suitable for.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Skin Boosters",
    readingMinutes: 8,
    directAnswer:
      "Profhilo is an injectable stabilised hyaluronic acid used to improve skin hydration and firmness. It is not a dermal filler and does not add volume or change facial shape. The standard protocol is two sessions four weeks apart, using five injection points per side of the face. In India it typically starts around ₹20,000 per syringe, with a two-session course usually falling between ₹36,000 and ₹45,000. Effects generally last six to nine months. It is not suitable during pregnancy, over active skin infection, or in anyone with a known hyaluronic acid allergy.",
    content: [
      {
        type: "h2",
        text: "What is Profhilo, and how is it different from a dermal filler?",
      },
      {
        type: "p",
        text: "Profhilo is a stabilised form of hyaluronic acid injected into the skin to improve hydration, elasticity and firmness. The critical difference from a dermal filler is intent. A filler is placed to add volume in a specific location — a cheek, a chin, a lip. Profhilo is placed to spread through the tissue and improve the quality of the skin itself. It does not project, lift or reshape.",
      },
      {
        type: "p",
        text: "This distinction matters because it decides whether the treatment is right for you at all. A patient who wants a more defined jawline is asking a volume question, and Profhilo is the wrong answer. A patient whose skin has become thin, crepey and dull despite good skincare is asking a skin-quality question, and this is the category that addresses it.",
      },
      {
        type: "p",
        text: "Profhilo is manufactured by IBSA Derma. Unlike most injectable hyaluronic acid products, it is stabilised thermally rather than with chemical cross-linking agents, which is why it behaves as a spreading hydrator rather than a structural gel.",
      },
      {
        type: "h2",
        text: "How much does Profhilo cost in India?",
      },
      {
        type: "p",
        text: "Pricing varies by city, by clinic and by how many syringes a face actually needs. The bands below reflect what is realistic in Indian metro and tier-2 practice in 2026. Treat any price dramatically below this range with caution — it usually signals a different product being described by the same name.",
      },
      {
        type: "table",
        caption: "Indicative price bands — skin boosters in India, 2026",
        headers: ["Treatment", "Typical starting price", "Standard course"],
        rows: [
          ["Profhilo — face", "From ₹20,000 per syringe", "2 sessions, 4 weeks apart"],
          ["Profhilo — face and neck", "From ₹28,000 (2 syringes)", "2 sessions, 4 weeks apart"],
          ["Profhilo — neck and décolletage", "From ₹24,000 (2 syringes)", "2 sessions, 4 weeks apart"],
          ["Polynucleotides — face", "From ₹15,000 per session", "3 sessions, 3-4 weeks apart"],
          ["NCTF mesotherapy — face", "From ₹10,000 per session", "3-4 sessions"],
        ],
      },
      {
        type: "callout",
        title: "Why a two-session course, not one",
        text: "The standard Profhilo protocol is two treatments four weeks apart. A single session is an incomplete course, and judging the result after one is judging half a treatment. If a clinic sells you one session as a complete treatment, ask why.",
      },
      {
        type: "h2",
        text: "How is Profhilo injected, and how long does it take?",
      },
      {
        type: "p",
        text: "The established technique uses five injection points on each side of the face — a total of ten — chosen to sit away from major vessels and to allow the product to spread evenly. The appointment itself takes roughly 20 to 30 minutes including numbing. Most people return to normal activity the same day.",
      },
      {
        type: "p",
        text: "Small raised bumps at each injection point are expected immediately afterwards and usually settle within a few hours to a day. Bruising is possible. Makeup is generally avoided for the rest of the day.",
      },
      {
        type: "h2",
        text: "How long do the effects last?",
      },
      {
        type: "p",
        text: "Most patients see effects lasting approximately six to nine months from a completed two-session course, after which maintenance is usually discussed. Results are gradual rather than immediate — the visible change typically develops over four to eight weeks rather than appearing the next morning. Duration varies with age, skin condition, sun exposure and general health, and no clinic can promise a specific figure for an individual.",
      },
      {
        type: "h2",
        text: "Who should not have Profhilo?",
      },
      {
        type: "p",
        text: "Profhilo is not appropriate for everyone, and a proper consultation exists partly to identify the people who should not have it.",
      },
      {
        type: "list",
        items: [
          "Anyone pregnant or breastfeeding — injectable aesthetic treatments are deferred as a standard precaution.",
          "Anyone with a known allergy or previous reaction to hyaluronic acid products.",
          "Active infection, active acne lesions or broken skin at the intended injection sites — treatment is postponed until the skin has settled.",
          "Anyone with an autoimmune or connective-tissue condition, or on immunosuppressive therapy, without prior discussion with their treating physician.",
          "Anyone on blood-thinning medication, where bruising risk must be weighed and the prescribing doctor consulted.",
          "Patients whose actual concern is volume loss or skin laxity — these need a different plan, and injecting a hydrator will not deliver what they are asking for.",
        ],
      },
      {
        type: "h2",
        text: "Profhilo or polynucleotides — which one?",
      },
      {
        type: "p",
        text: "They are not competitors so much as different tools. Profhilo works primarily on hydration and firmness across a broad area of skin. Polynucleotides, derived from purified DNA fragments, are used where the aim is tissue repair and improvement in skin quality in a more targeted region — the under-eye area being the most common example in Indian practice. Many treatment plans use them in sequence rather than choosing one.",
      },
      {
        type: "p",
        text: "The decision is clinical, not commercial. It depends on skin thickness, the specific area of concern, previous treatments and budget over a 12-month horizon rather than a single appointment.",
      },
      {
        type: "h2",
        text: "What should you ask before booking?",
      },
      {
        type: "list",
        items: [
          "Which specific product is being used, and can I see the packaging before it is opened?",
          "Is the price quoted per syringe or for the full two-session course?",
          "Who is performing the injection, and are they a qualified medical practitioner?",
          "What happens if I have a reaction — who do I contact, and when?",
          "Based on my skin, is this actually the right treatment, or am I asking for the wrong thing?",
        ],
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Nothing here is a diagnosis or a treatment recommendation for any individual. Suitability, dosing and expected outcome can only be established at an in-person medical consultation.",
      },
    ],
    faqs: [
      {
        q: "Is Profhilo a filler?",
        a: "No. Profhilo is a stabilised hyaluronic acid skin booster. A dermal filler adds volume to a specific area and changes contour; Profhilo spreads through the skin to improve hydration and firmness without adding projection or altering facial shape.",
      },
      {
        q: "How many Profhilo sessions do I need?",
        a: "The standard protocol is two sessions four weeks apart. A single session is half a course. Maintenance is usually discussed around six to nine months after the second session.",
      },
      {
        q: "Does Profhilo hurt?",
        a: "Discomfort is generally described as brief and mild. Topical numbing cream is applied beforehand, and there are ten injection points in total for a full face. The appointment usually takes 20 to 30 minutes.",
      },
      {
        q: "What is the downtime after Profhilo?",
        a: "Small raised bumps at each injection point are expected and usually settle within a few hours to a day. Bruising is possible. Most people return to normal activity the same day and avoid makeup for the rest of that day.",
      },
      {
        q: "How much does Profhilo cost in India?",
        a: "Prices generally start around ₹20,000 per syringe for the face, with a full two-session course commonly falling between ₹36,000 and ₹45,000. Face and neck treatment requires more product and costs more. Prices vary by city and clinic.",
      },
      {
        q: "Can I have Profhilo while pregnant?",
        a: "No. Injectable aesthetic treatments including Profhilo are deferred during pregnancy and breastfeeding as a standard precaution.",
      },
      {
        q: "Will Profhilo tighten sagging skin?",
        a: "No. Profhilo improves skin hydration and firmness but does not lift or reposition tissue. Significant laxity is a different clinical problem and needs a different discussion at consultation.",
      },
    ],
    sources: [
      { label: "IBSA Derma — Profhilo product information" },
      { label: "Journal of Cosmetic Dermatology — published literature on stabilised hyaluronic acid bio-remodelling" },
    ],
    relatedTreatments: ["anti-ageing-skin-boosters"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "2",
    slug: "skin-boosters-compared-profhilo-polynucleotides-nctf",
    title: "Profhilo, Polynucleotides or NCTF: Which Skin Booster Does What",
    excerpt:
      "Three injectable skin treatments are routinely confused with each other. Here is what each one actually does, which concern each suits, and how the costs compare in India.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Skin Boosters",
    readingMinutes: 9,
    directAnswer:
      "Profhilo, polynucleotides and NCTF are all injected into the skin, but they do different jobs. Profhilo is a stabilised hyaluronic acid used for broad hydration and firmness across the face or neck. Polynucleotides are purified DNA fragments used for tissue repair and skin quality, most often around thin under-eye skin. NCTF is a multi-ingredient mesotherapy cocktail of vitamins, amino acids and minerals used for overall radiance. None of them add volume or lift sagging tissue.",
    content: [
      {
        type: "h2",
        text: "Why are these three treatments so often confused?",
      },
      {
        type: "p",
        text: "Because they share a delivery method. All three are injected into the skin with fine needles across multiple points, all three are marketed under the loose heading of skin boosters, and all three produce gradual rather than immediate change. The similarity ends there. They contain entirely different substances and are chosen for different clinical reasons.",
      },
      {
        type: "p",
        text: "The confusion has a practical cost. Patients arrive having read about one and asking for it by name, when the concern they describe is better addressed by another.",
      },
      {
        type: "h2",
        text: "What does each one actually contain?",
      },
      {
        type: "table",
        headers: ["", "Profhilo", "Polynucleotides", "NCTF"],
        rows: [
          ["What it is", "Stabilised hyaluronic acid", "Purified polynucleotide chains", "Multi-ingredient mesotherapy cocktail"],
          ["Main purpose", "Hydration and firmness over a broad area", "Tissue repair and skin quality in a target zone", "Overall radiance and skin conditioning"],
          ["Typical area", "Full face, neck, décolletage", "Under-eyes, face, hands", "Face, face and neck"],
          ["Standard course", "2 sessions, 4 weeks apart", "3 sessions, 3-4 weeks apart", "3-4 sessions"],
          ["Starting price (India)", "From ₹20,000 per syringe", "From ₹12,000-₹15,000 per session", "From ₹10,000 per session"],
          ["Adds volume?", "No", "No", "No"],
        ],
      },
      {
        type: "h2",
        text: "Which one suits my concern?",
      },
      {
        type: "p",
        text: "The most useful way to choose is to start from the complaint rather than the product name.",
      },
      {
        type: "table",
        headers: ["If your concern is…", "The usual starting point"],
        rows: [
          ["Skin feels dry, dull and has lost bounce across the whole face", "Profhilo"],
          ["Crepey texture on the neck or décolletage", "Profhilo"],
          ["Thin, crepey, dark-looking under-eye skin", "Polynucleotides"],
          ["Skin looks tired and lacks glow before an event", "NCTF"],
          ["Overall skin quality maintenance through the year", "A planned combination, not one product"],
          ["Sagging jawline or loss of cheek volume", "None of these — this needs a different conversation"],
        ],
      },
      {
        type: "callout",
        title: "The most important row in that table is the last one",
        text: "If the concern is sagging or lost volume, no skin booster will address it. A clinic that sells you one anyway has answered a question you did not ask. Skin quality and facial structure are separate problems.",
      },
      {
        type: "h2",
        text: "Can they be combined?",
      },
      {
        type: "p",
        text: "Yes, and in practice they often are — but sequenced across months rather than stacked in one appointment. A common structure is a Profhilo course to address baseline hydration and firmness, followed by targeted polynucleotide sessions for the under-eye area, with NCTF used periodically for conditioning. What matters is that the sequence is planned at consultation with a clear reason for each step, not added one at a time at each visit.",
      },
      {
        type: "h2",
        text: "How long before I see anything?",
      },
      {
        type: "p",
        text: "All three are gradual. Expect four to eight weeks for visible change from a completed course, not overnight results. This is the single most common source of patient disappointment with skin boosters, and it is entirely avoidable by setting the expectation before the first injection rather than after it.",
      },
      {
        type: "p",
        text: "Anyone promising visible transformation the next morning is describing a different category of treatment, or overstating this one.",
      },
      {
        type: "h2",
        text: "What are the risks?",
      },
      {
        type: "list",
        items: [
          "Injection-point bumps, redness and swelling — expected, usually settling within hours to a day.",
          "Bruising — common, more likely on thin skin and in patients on blood thinners.",
          "Infection — uncommon, and the reason treatment is deferred over active skin infection or acne lesions.",
          "Allergic reaction — uncommon but possible, particularly relevant with multi-ingredient cocktails.",
          "Disappointment from mismatched expectations — the most frequent problem of all, and the one a proper consultation prevents.",
        ],
      },
      {
        type: "p",
        text: "All three are deferred in pregnancy and breastfeeding, and require disclosure of your full medical history and medication list before treatment.",
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Which treatment suits you — if any — depends on an in-person examination of your skin, your history and your goals. Nothing here substitutes for that consultation.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between Profhilo and polynucleotides?",
        a: "Profhilo is stabilised hyaluronic acid used for hydration and firmness across a broad area such as the full face or neck. Polynucleotides are purified DNA fragments used for tissue repair and skin quality in a targeted zone, most commonly the thin skin under the eyes.",
      },
      {
        q: "Is NCTF the same as mesotherapy?",
        a: "NCTF is a specific branded mesotherapy formulation containing vitamins, amino acids, minerals and hyaluronic acid. Mesotherapy is the broader technique of injecting such cocktails into the skin. All NCTF treatment is mesotherapy, but not all mesotherapy uses NCTF.",
      },
      {
        q: "Which skin booster is best for under-eye dark circles?",
        a: "Polynucleotides are the most commonly chosen option for thin, crepey under-eye skin. However, dark circles have several different causes — pigmentation, shadowing from volume loss, and visible vessels through thin skin — and each cause needs a different approach. Assessment first.",
      },
      {
        q: "Do skin boosters tighten loose skin?",
        a: "No. Skin boosters improve hydration, firmness and quality of the skin surface. They do not lift or reposition tissue. Significant laxity is a separate clinical problem requiring a different discussion.",
      },
      {
        q: "How much do skin boosters cost in India?",
        a: "As of 2026, NCTF generally starts from around ₹10,000 per session, polynucleotides from around ₹12,000-₹15,000 per session, and Profhilo from around ₹20,000 per syringe. Full courses cost more than single sessions; prices vary by city and clinic.",
      },
      {
        q: "How often do I need to repeat them?",
        a: "Profhilo effects commonly last six to nine months after a two-session course. Polynucleotide and NCTF maintenance intervals vary more widely by individual and area treated. Maintenance planning is part of the consultation, not an afterthought.",
      },
    ],
    sources: [
      { label: "IBSA Derma — Profhilo product information" },
      { label: "Filorga — NCTF product information" },
    ],
    relatedTreatments: ["anti-ageing-skin-boosters"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "3",
    slug: "laser-hair-reduction-aftercare-indian-skin",
    title: "Laser Hair Reduction Aftercare on Indian Skin: The First 72 Hours",
    excerpt:
      "Most laser complications on brown skin are avoidable and happen in the three days after the session. A practical, hour-by-hour guide to what to do and what to avoid.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Laser Hair Reduction",
    readingMinutes: 7,
    directAnswer:
      "For the first 72 hours after laser hair reduction on Indian skin: keep the area cool and clean, apply a bland moisturiser, use SPF 50 on any exposed area, and avoid heat, sweat and friction. Do not use hot water, steam, sauna, gym sessions, swimming pools, scrubs, exfoliating acids, retinoids, waxing or threading. Mild redness and follicular bumps for 24 to 48 hours are expected. Blistering, spreading pain or darkening patches are not — these need clinical review.",
    content: [
      {
        type: "h2",
        text: "Why does aftercare matter more on brown skin?",
      },
      {
        type: "p",
        text: "Skin with more melanin — Fitzpatrick types IV and V, which covers the majority of Indian patients — carries a higher risk of post-inflammatory hyperpigmentation. That means the skin responds to injury or inflammation by producing extra pigment, leaving darker patches that can take weeks or months to fade.",
      },
      {
        type: "p",
        text: "The laser session itself is a controlled thermal injury. Almost every avoidable complication comes not from the machine but from what happens in the 72 hours afterwards, when heat, friction or sun exposure adds a second insult to skin that is already inflamed. Most published aftercare advice online is written for lighter skin types and understates this.",
      },
      {
        type: "h2",
        text: "What is normal in the first 48 hours?",
      },
      {
        type: "list",
        items: [
          "Redness across the treated area, similar to mild sunburn — usually settles within 24 hours.",
          "Small raised bumps around each hair follicle, sometimes called follicular oedema — typically settles within 24 to 48 hours.",
          "A mild warm or tingling sensation for a few hours.",
          "Hairs appearing to grow out of the skin over the following one to three weeks — this is shedding, not regrowth, and it is expected.",
        ],
      },
      {
        type: "h2",
        text: "What should I do in the first 72 hours?",
      },
      {
        type: "table",
        headers: ["Time", "Do this"],
        rows: [
          ["First 4-6 hours", "Cool compress if uncomfortable. Nothing on the skin except what the clinic has given you."],
          ["Day 1", "Bland fragrance-free moisturiser twice daily. Lukewarm showers only. Loose cotton clothing over treated areas."],
          ["Day 1-3", "SPF 50 on any exposed area every morning, reapplied if outdoors. This is not optional in Kerala or coastal Karnataka."],
          ["Day 1-3", "Keep the area dry, clean and unrubbed. No tight waistbands or straps over treated skin."],
          ["Day 3 onwards", "Resume normal skincare gradually, leaving actives until last."],
        ],
      },
      {
        type: "h2",
        text: "What must I avoid?",
      },
      {
        type: "list",
        items: [
          "Hot water, steam, sauna, hot yoga — heat is the single biggest avoidable trigger for post-treatment pigmentation.",
          "Gym sessions and anything that makes you sweat heavily, for 48 hours.",
          "Swimming pools and the sea — chlorine, salt and shared water over freshly treated follicles.",
          "Direct sun on the treated area. Cover it or use SPF 50 and keep it covered where you can.",
          "Scrubs, loofahs, exfoliating acids (AHA, BHA), retinoids and vitamin C serums on treated skin for at least 3-5 days.",
          "Waxing, threading, epilation or plucking at any point between sessions — these remove the follicle the laser needs to target.",
          "Deodorant on treated underarms for 24 hours.",
          "Picking at or scratching bumps.",
        ],
      },
      {
        type: "callout",
        title: "Shaving is allowed. Waxing is not.",
        text: "Between laser sessions you may shave, because shaving cuts the hair at the surface and leaves the follicle intact. Waxing, threading and plucking remove the follicle from the root — which is exactly the target the laser needs at your next session. Patients who wax between sessions get poor results and often blame the laser.",
      },
      {
        type: "h2",
        text: "When should I contact the clinic?",
      },
      {
        type: "p",
        text: "Contact your clinic promptly if you notice any of the following. None of these are routine, and early review matters more than waiting to see if it settles.",
      },
      {
        type: "list",
        items: [
          "Blistering, crusting or broken skin.",
          "Pain that increases rather than decreases after the first few hours.",
          "Redness that spreads beyond the treated area, or feels hot and tender.",
          "Any discharge, or fever.",
          "Darkened patches appearing in the days or weeks afterwards.",
          "Pale or white patches in the treated area.",
        ],
      },
      {
        type: "h2",
        text: "How does the Kerala and coastal Karnataka climate change this?",
      },
      {
        type: "p",
        text: "Two local factors matter. First, the ultraviolet index along the Kerala and Karnataka coast stays high for most of the year, so the usual advice to simply avoid the sun for a few days is not practical — daily SPF 50 and physical covering are the realistic version. Second, sustained high humidity means sweat sits on the skin for longer, and sweat over freshly treated follicles is a genuine irritant. Cotton, loose fits and cool showers do more here than they would in a drier climate.",
      },
      {
        type: "p",
        text: "For the same reason, many patients find sessions easier to manage during the monsoon months, when sun exposure is naturally lower.",
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Aftercare instructions vary with the device used, the area treated and your own skin. Always follow the specific instructions given by the clinic that performed your treatment, and contact them directly with any concern.",
      },
    ],
    faqs: [
      {
        q: "Can I shave between laser hair reduction sessions?",
        a: "Yes. Shaving is permitted and often recommended because it cuts hair at the surface while leaving the follicle intact. Waxing, threading, plucking and epilation must be avoided, as they remove the follicle the laser needs to target.",
      },
      {
        q: "How long should I avoid the gym after laser hair removal?",
        a: "Avoid heavy exercise and anything that causes significant sweating for about 48 hours. Heat and sweat over freshly treated follicles increase the risk of irritation and post-inflammatory pigmentation, particularly on darker skin.",
      },
      {
        q: "Why are hairs still appearing after my laser session?",
        a: "Treated hairs are pushed out of the follicle over roughly one to three weeks after a session. This shedding looks like regrowth but is not. Do not pluck or wax them; they will fall out on their own.",
      },
      {
        q: "Is redness after laser hair removal normal?",
        a: "Mild redness and small raised bumps around the follicles are expected and usually settle within 24 to 48 hours. Blistering, spreading redness, increasing pain or any discharge is not routine and should be reviewed by your clinic.",
      },
      {
        q: "Can I use sunscreen immediately after laser hair removal?",
        a: "Yes, and you should on any exposed treated area from the day after treatment. A broad-spectrum SPF 50 is advised. Avoid applying products to skin that is broken or blistered, and check with your clinic first if it is.",
      },
      {
        q: "Why is aftercare stricter for Indian skin?",
        a: "Skin with more melanin has a higher risk of post-inflammatory hyperpigmentation, meaning it responds to inflammation by producing extra pigment and leaving darker patches. Heat, friction and sun exposure in the days after treatment all raise that risk.",
      },
    ],
    relatedTreatments: ["laser-hair-reduction"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "4",
    slug: "laser-hair-reduction-on-tanned-skin",
    title: "Can I Have Laser Hair Reduction If My Skin Is Tanned?",
    excerpt:
      "A common question in coastal Kerala and Karnataka, where sun exposure is year-round. What tanning actually changes, and why a clinic may ask you to wait.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Laser Hair Reduction",
    readingMinutes: 6,
    directAnswer:
      "Recent tanning raises the risk of burns and pigment changes during laser hair reduction, so most clinics ask patients to wait roughly two to four weeks after significant sun exposure before treatment. The reason is that laser targets melanin. A tan puts extra melanin in the surrounding skin, which competes with the hair follicle for the laser's energy. Treatment is often still possible with adjusted settings or a longer-wavelength device, but this must be assessed in person, not decided over the phone.",
    content: [
      {
        type: "h2",
        text: "Why does a tan matter for laser hair reduction?",
      },
      {
        type: "p",
        text: "Laser hair reduction works by targeting melanin, the pigment in the hair. The laser's energy is absorbed by the pigment in the hair shaft and follicle, converted to heat, and that heat damages the follicle's ability to produce new hair.",
      },
      {
        type: "p",
        text: "A tan means the surrounding skin has produced extra melanin. That pigment now competes with the hair for the same laser energy. More energy is absorbed by the skin rather than the follicle, which reduces effectiveness and increases the risk of burns, blistering and pigment changes. The darker the recent tan, the wider the gap in risk.",
      },
      {
        type: "callout",
        title: "This is a different question from skin tone",
        text: "Having naturally deeper skin does not disqualify you from laser hair reduction. Longer-wavelength devices such as Nd:YAG were developed specifically to treat darker skin types safely. The concern here is recent change — a fresh tan on top of your baseline tone — because it alters how your skin responds compared with the settings that would otherwise suit you.",
      },
      {
        type: "h2",
        text: "How long should I wait after sun exposure?",
      },
      {
        type: "p",
        text: "Most clinics ask for roughly two to four weeks between significant sun exposure and a laser session, and the same again after a session before deliberate sun exposure. The exact interval depends on how much colour you have actually taken, which is why it is assessed by looking at your skin rather than by counting days.",
      },
      {
        type: "table",
        headers: ["Situation", "Usual approach"],
        rows: [
          ["Beach holiday or long outdoor event in the last 2 weeks", "Defer and reassess"],
          ["Noticeable colour difference between covered and exposed skin", "Defer and reassess"],
          ["Routine daily outdoor commuting with sunscreen", "Usually proceed, settings adjusted"],
          ["Active sunburn — redness, peeling, tenderness", "Do not treat. Wait until fully healed"],
          ["Self-tan or spray tan applied", "Remove fully and wait; it interferes with assessment"],
        ],
      },
      {
        type: "h2",
        text: "Why is this such a common problem in Kerala and Mangalore?",
      },
      {
        type: "p",
        text: "The ultraviolet index along the Kerala and coastal Karnataka belt remains high for most of the year, not just in summer. Patients frequently arrive with more recent sun exposure than they realise, simply from commuting, outdoor work or weekend travel. It is one of the most common reasons a planned session gets rescheduled locally.",
      },
      {
        type: "p",
        text: "Practical consequence: patients who plan a course of sessions here do better by starting during the monsoon months, when natural sun exposure drops, and by treating daily sunscreen as part of the treatment plan rather than as general advice.",
      },
      {
        type: "h2",
        text: "What if I am told I can be treated anyway?",
      },
      {
        type: "p",
        text: "That may be entirely correct. An experienced practitioner may proceed using a longer-wavelength device, lower fluence, longer pulse duration and effective skin cooling — all of which reduce risk on more pigmented skin. What matters is that the decision was made after examining your skin, that the reasoning was explained, and that a test patch was offered if there was any doubt.",
      },
      {
        type: "p",
        text: "What should concern you is a clinic that does not ask about recent sun exposure at all. That question is a basic safety check.",
      },
      {
        type: "h2",
        text: "What should I ask at consultation?",
      },
      {
        type: "list",
        items: [
          "Which device and wavelength will be used on my skin, and why that one?",
          "Given my recent sun exposure, should we do a test patch first?",
          "What settings changes are you making for my skin type?",
          "How long before my session should I stay out of the sun, and for how long afterwards?",
          "If I get pigmentation afterwards, what is the plan?",
        ],
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Whether laser treatment is safe for you at a given time depends on an in-person assessment of your skin. Do not use this article to decide for yourself that treatment is safe or unsafe.",
      },
    ],
    faqs: [
      {
        q: "Can I get laser hair removal if I am tanned?",
        a: "Usually you will be asked to wait roughly two to four weeks after significant sun exposure. A tan adds melanin to the surrounding skin, which competes with the hair follicle for the laser's energy and increases the risk of burns and pigment changes. Assessment must be in person.",
      },
      {
        q: "Does dark skin mean I cannot have laser hair reduction?",
        a: "No. Longer-wavelength devices such as Nd:YAG are used specifically to treat darker skin types. The concern with tanning is recent change in pigmentation on top of your baseline tone, not your natural skin colour.",
      },
      {
        q: "How long after laser should I avoid the sun?",
        a: "Avoid deliberate sun exposure on treated areas for at least two weeks, and use SPF 50 daily on any exposed treated skin. In coastal Kerala and Karnataka, where UV levels stay high year-round, daily sunscreen should be treated as part of the treatment plan.",
      },
      {
        q: "Can I have laser hair removal after a spray tan?",
        a: "No. Self-tan and spray tan must be fully removed before treatment. They alter the skin's surface pigment and interfere with both the assessment and the laser's interaction with the skin.",
      },
      {
        q: "Is it better to do laser during the monsoon?",
        a: "Many patients in Kerala and coastal Karnataka find monsoon months easier for a course of sessions, because natural sun exposure is lower and it is simpler to keep treated skin protected between appointments.",
      },
    ],
    relatedTreatments: ["laser-hair-reduction"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "5",
    slug: "why-melasma-keeps-coming-back",
    title: "Why Melasma Keeps Coming Back — and When Laser Makes It Worse",
    excerpt:
      "Melasma is a chronic, relapsing condition, not a one-time problem to be removed. Understanding that changes what treatment you should accept.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Pigmentation",
    readingMinutes: 8,
    directAnswer:
      "Melasma recurs because it is a chronic, relapsing condition driven by ongoing triggers — ultraviolet and visible light, heat, hormonal factors and inflammation — rather than a stain that can be removed once. Sun protection is the single most important factor in keeping it controlled. Aggressive laser treatment can make melasma worse, particularly on brown skin, by provoking rebound pigmentation. Treatment aims at long-term control, not a permanent cure, and any clinic promising one is overstating what is achievable.",
    content: [
      {
        type: "h2",
        text: "Why does melasma come back after treatment?",
      },
      {
        type: "p",
        text: "Because the pigment you can see is a symptom, not the disease. Melasma involves pigment-producing cells that are overactive and remain sensitive to their triggers even after the visible discolouration has faded. Remove the pigment without changing the triggers and the same cells produce it again.",
      },
      {
        type: "p",
        text: "The main drivers are ultraviolet light, visible light — including from screens and indoor lighting — infrared heat, hormonal factors such as pregnancy and hormonal contraception, and skin inflammation from irritating products or procedures. In coastal Kerala and Karnataka, high year-round UV and ambient heat mean two of the strongest triggers are present almost daily.",
      },
      {
        type: "callout",
        title: "The framing that helps most",
        text: "Melasma behaves more like a chronic condition to be managed than a mark to be erased. Patients who understand that from the start do considerably better, because they maintain sun protection and maintenance therapy instead of stopping the moment their skin looks clear.",
      },
      {
        type: "h2",
        text: "When does laser make melasma worse?",
      },
      {
        type: "p",
        text: "Laser and energy-based treatment can worsen melasma when it delivers too much heat or too much energy into skin that is already primed to over-produce pigment. The result is rebound hyperpigmentation — the patch returns darker than before, sometimes weeks after treatment appeared successful. This risk is higher on Fitzpatrick IV to V skin, which describes most Indian patients.",
      },
      {
        type: "p",
        text: "Specific situations where caution is warranted:",
      },
      {
        type: "list",
        items: [
          "Actively inflamed or recently irritated melasma — treating through inflammation tends to worsen it.",
          "Aggressive settings chosen to produce fast visible clearing.",
          "Ablative or heavily thermal devices used as a first-line approach for melasma.",
          "Any treatment plan that has not established sun protection and topical control first.",
          "Treatment during pregnancy or while hormonal triggers remain uncontrolled.",
          "Repeated sessions continued despite the patch darkening after previous ones.",
        ],
      },
      {
        type: "p",
        text: "This does not mean lasers have no role in pigmentation. It means melasma specifically is the diagnosis where restraint matters most, and where the sequence — protect, then topical, then consider device treatment — matters more than the device itself.",
      },
      {
        type: "h2",
        text: "Is my pigmentation actually melasma?",
      },
      {
        type: "p",
        text: "This matters because the conditions look similar and respond very differently. Self-diagnosis from photographs online is unreliable, and treating the wrong one wastes months.",
      },
      {
        type: "table",
        headers: ["", "Melasma", "Post-inflammatory hyperpigmentation", "Freckles / sun spots"],
        rows: [
          ["Pattern", "Symmetrical patches, often cheeks, forehead, upper lip", "Follows exactly where a spot, injury or rash was", "Scattered small spots on sun-exposed areas"],
          ["Edges", "Irregular, blended", "Matches the shape of the original lesion", "Well-defined, small"],
          ["Common trigger", "Sun, heat, hormones", "Acne, eczema, injury, procedures", "Cumulative sun exposure"],
          ["Natural course", "Chronic, relapsing", "Usually fades over months", "Persistent, worsens with sun"],
          ["Response to aggressive laser", "May rebound darker", "May rebound darker", "Generally responds"],
        ],
      },
      {
        type: "h2",
        text: "What actually helps keep it controlled?",
      },
      {
        type: "list",
        items: [
          "Daily broad-spectrum sunscreen, reapplied — the single highest-impact factor. Tinted formulations containing iron oxide also block visible light, which matters in melasma specifically.",
          "Physical protection — hats, shade, avoiding peak sun. Relevant year-round in this climate, not seasonally.",
          "Managing heat exposure where practical, including cooking heat and hot showers on the face.",
          "Prescribed topical therapy, used consistently and reviewed by a doctor rather than continued indefinitely without supervision.",
          "Reviewing hormonal contributors with your physician or gynaecologist where relevant.",
          "Avoiding harsh scrubs, unregulated skin-lightening creams and frequent irritating procedures — inflammation is itself a trigger.",
          "Maintenance after clearing, rather than stopping treatment the moment the skin looks better.",
        ],
      },
      {
        type: "callout",
        title: "A word on unregulated lightening creams",
        text: "Products bought without prescription — particularly those containing undeclared steroids or mercury — are a recurring cause of worsened, harder-to-treat pigmentation in Indian practice. If you are using a cream that produces rapid lightening and you do not know its full ingredient list, bring the tube to your consultation.",
      },
      {
        type: "h2",
        text: "What should I expect from treatment realistically?",
      },
      {
        type: "p",
        text: "Realistic goals are meaningful lightening, slower and less frequent relapse, and a maintenance routine you can sustain. Timelines are measured in months, not weeks. Some patients achieve long stretches of near-clear skin; most will see some return with sun exposure, pregnancy or hormonal change, and will need maintenance.",
      },
      {
        type: "p",
        text: "Any promise of permanent removal is not consistent with how melasma behaves.",
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Pigmentation has multiple causes that look similar to the untrained eye. Diagnosis and treatment require an in-person medical examination. Do not start or stop any prescribed treatment based on this article.",
      },
    ],
    faqs: [
      {
        q: "Can melasma be cured permanently?",
        a: "No. Melasma is a chronic, relapsing condition. Treatment aims at long-term control — meaningful lightening, slower relapse and a sustainable maintenance routine — rather than permanent removal. Claims of a permanent cure are not consistent with how the condition behaves.",
      },
      {
        q: "Can laser make melasma worse?",
        a: "Yes. Aggressive or heavily thermal laser treatment can provoke rebound hyperpigmentation, where the patch returns darker than before. This risk is higher on darker skin types. Sun protection and topical control are established first, and device settings kept conservative.",
      },
      {
        q: "Why does my melasma come back every summer?",
        a: "Ultraviolet and visible light are among the strongest triggers, so pigmentation commonly deepens with increased sun exposure. In coastal Kerala and Karnataka, UV levels stay high through most of the year, which is why daily sunscreen matters more than seasonal precautions.",
      },
      {
        q: "How is melasma different from post-inflammatory hyperpigmentation?",
        a: "Melasma appears as symmetrical, blended patches usually on the cheeks, forehead and upper lip, and is chronic and relapsing. Post-inflammatory hyperpigmentation follows exactly where a spot, rash or injury was, matches that shape, and usually fades over months.",
      },
      {
        q: "Does sunscreen actually help melasma?",
        a: "It is the single most important factor in keeping melasma controlled. Broad-spectrum protection applied daily and reapplied is essential, and tinted formulations containing iron oxide additionally block visible light, which is a relevant trigger in melasma specifically.",
      },
      {
        q: "Is melasma caused by pregnancy?",
        a: "Hormonal factors including pregnancy and hormonal contraception are recognised triggers, which is why melasma is sometimes called the mask of pregnancy. It can also occur without any hormonal trigger. Treatment approach differs during pregnancy and must be discussed with your doctor.",
      },
    ],
    relatedTreatments: ["pigmentation-pico-laser", "skin-brightening-medifacials"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "6",
    slug: "acne-scar-types-and-which-treatment-suits",
    title: "Boxcar, Rolling or Icepick: Matching Acne Scar Type to Treatment",
    excerpt:
      "Acne scars are not one problem. The shape of the scar largely determines which treatment can help it — and which will waste your money.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    authorCredentials: CREDENTIALS,
    reviewedBy: REVIEWER,
    date: "2026-08-13",
    dateModified: "2026-08-13",
    category: "Acne & Scars",
    readingMinutes: 9,
    directAnswer:
      "Atrophic acne scars fall into three main shapes. Icepick scars are narrow and deep, and respond best to focal techniques rather than resurfacing alone. Boxcar scars are wider with sharp vertical edges, and respond to resurfacing such as fractional CO2 laser and microneedling. Rolling scars are broad with sloping edges caused by tethering beneath the skin, and usually need that tethering released rather than surface resurfacing. Most faces have a mix, which is why single-treatment plans usually underperform.",
    content: [
      {
        type: "h2",
        text: "Why does scar shape decide the treatment?",
      },
      {
        type: "p",
        text: "Because each shape represents a different structural problem. A narrow deep track, a sharp-walled depression and a broad tethered dip are three different anatomical situations, and a treatment that addresses one may do very little for another.",
      },
      {
        type: "p",
        text: "This is the most common reason patients feel a course of treatment underdelivered. They were treated for the category of acne scarring rather than for the specific scars on their face, and the scars that did not respond were the ones the chosen treatment was never going to reach.",
      },
      {
        type: "h2",
        text: "How do I recognise each type?",
      },
      {
        type: "table",
        headers: ["Type", "What it looks like", "Underlying problem", "Usual approach"],
        rows: [
          [
            "Icepick",
            "Small, narrow, deep — like a pinprick or a puncture",
            "A narrow tract extending deep into the skin",
            "Focal techniques such as TCA CROSS or punch methods; resurfacing alone rarely reaches the base",
          ],
          [
            "Boxcar",
            "Round or oval depression with sharp, steep edges",
            "Loss of tissue with defined vertical walls",
            "Fractional resurfacing — CO2 laser, microneedling — to soften the edges over multiple sessions",
          ],
          [
            "Rolling",
            "Broad, shallow, wave-like undulation; skin looks uneven in raking light",
            "Fibrous bands tethering the skin to deeper tissue",
            "Release of the tethering bands (subcision), often with volume support; resurfacing alone under-treats these",
          ],
          [
            "Hypertrophic / keloid",
            "Raised, firm, sometimes itchy — more common on jaw, chest, back",
            "Excess collagen deposition during healing",
            "Managed very differently — resurfacing is not the answer and can worsen them",
          ],
        ],
      },
      {
        type: "callout",
        title: "Raised scars are a different conversation",
        text: "Hypertrophic and keloid scars are not treated like depressed scars, and aggressive resurfacing can make them worse. This distinction matters particularly for patients with a personal or family history of keloids, which should always be disclosed before any procedure — including ear-lobe procedures, threads and laser.",
      },
      {
        type: "h2",
        text: "How many sessions will I need?",
      },
      {
        type: "p",
        text: "For fractional resurfacing of boxcar and mixed scarring, three to six sessions spaced roughly four to eight weeks apart is a common plan, with improvement continuing for several months after the final session as collagen remodels. Rolling scars often need their tethering addressed in one to three procedures before resurfacing adds much. Icepick scars are typically treated focally over repeated visits.",
      },
      {
        type: "p",
        text: "Honest framing: acne scar treatment produces improvement, not erasure. A realistic goal is meaningful softening of texture and shadow so that scars become far less noticeable in normal light. Complete restoration to pre-acne skin is not an outcome any clinic can promise.",
      },
      {
        type: "h2",
        text: "What does acne scar treatment cost in India?",
      },
      {
        type: "table",
        caption: "Indicative starting price bands, 2026",
        headers: ["Treatment", "Typical starting price", "Usual course"],
        rows: [
          ["Fractional CO2 laser — full face", "From ₹15,000 per session", "3-6 sessions"],
          ["Fractional CO2 — periocular or perioral", "From ₹8,000 per session", "3-6 sessions"],
          ["Pico laser — full face toning", "From ₹6,500 per session", "Varies; often combined"],
          ["Medifacial / peel adjuncts", "From ₹4,000 per session", "Course-based, supportive"],
        ],
      },
      {
        type: "p",
        text: "Be cautious with quotes that are dramatically lower or higher than these bands. Very low pricing usually indicates a less effective device or a shorter session than the plan requires; very high pricing sometimes reflects surgical scar revision costs being quoted for what is actually a laser treatment.",
      },
      {
        type: "h2",
        text: "What are the risks on Indian skin?",
      },
      {
        type: "p",
        text: "The main concern with resurfacing on Fitzpatrick IV to V skin is post-inflammatory hyperpigmentation — darkening of the treated area during healing. It is usually temporary but can take weeks to months to settle, and it is the reason conservative settings, careful patient selection and strict aftercare matter more here than in lighter skin.",
      },
      {
        type: "list",
        items: [
          "Post-inflammatory hyperpigmentation — the most common issue; minimised by conservative settings, sun avoidance and pre-treatment preparation of the skin.",
          "Prolonged redness after fractional resurfacing — expected for days, occasionally longer.",
          "Infection or delayed healing — uncommon, but why aftercare instructions are specific rather than general.",
          "Worsening of raised scarring in keloid-prone individuals.",
          "Active acne must be controlled before scar treatment begins — treating scars while acne is active means creating new ones.",
        ],
      },
      {
        type: "h2",
        text: "What should I ask at consultation?",
      },
      {
        type: "list",
        items: [
          "Which scar types do I actually have, and can you show me on my own face?",
          "Which of my scars will this treatment help, and which will it not?",
          "How many sessions before we reassess, and what will we do if response is poor?",
          "What is the plan if I develop pigmentation afterwards?",
          "Does my acne need to be controlled first?",
        ],
      },
      {
        type: "callout",
        title: "This article is general information",
        text: "Scar assessment requires examining skin in person, often in raking light. Nothing here is a diagnosis or a treatment recommendation for any individual.",
      },
    ],
    faqs: [
      {
        q: "What are the different types of acne scars?",
        a: "Depressed (atrophic) acne scars are usually grouped as icepick — narrow and deep; boxcar — wider with sharp vertical edges; and rolling — broad and shallow with sloping edges caused by tethering beneath the skin. Raised hypertrophic and keloid scars are a separate category treated very differently.",
      },
      {
        q: "Which treatment is best for rolling acne scars?",
        a: "Rolling scars are caused by fibrous bands tethering the skin to deeper tissue, so they generally need that tethering released rather than surface resurfacing alone. Resurfacing may be added afterwards, but used by itself it commonly under-treats this scar type.",
      },
      {
        q: "How many CO2 laser sessions do I need for acne scars?",
        a: "Three to six sessions spaced roughly four to eight weeks apart is a common plan, with improvement continuing for several months after the final session as collagen remodels. The number depends on scar type, depth and how your skin responds.",
      },
      {
        q: "Can acne scars be removed completely?",
        a: "No. Acne scar treatment produces improvement rather than erasure. A realistic goal is meaningful softening of texture and shadow so scars become far less noticeable in normal light. Complete restoration to pre-acne skin is not an achievable promise.",
      },
      {
        q: "Is CO2 laser safe for Indian skin?",
        a: "It is used on Indian skin, with the main concern being post-inflammatory hyperpigmentation during healing. This risk is managed with conservative settings, preparation of the skin beforehand, strict sun avoidance and careful patient selection. Suitability is assessed individually.",
      },
      {
        q: "Should I treat active acne before treating scars?",
        a: "Yes. Active acne needs to be controlled first. Treating scars while acne is still active risks creating new scars, and inflamed skin responds less predictably to resurfacing.",
      },
      {
        q: "What does acne scar treatment cost in Kochi or Calicut?",
        a: "As of 2026, fractional CO2 laser for the full face commonly starts from around ₹15,000 per session, with most plans running three to six sessions. Smaller areas cost less. Final cost depends on scar type, area and the number of sessions your skin actually needs.",
      },
    ],
    relatedTreatments: ["acne-and-scar-care", "pigmentation-pico-laser"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "7",
    slug: "welcome-to-dolce-estetica",
    title: "Welcome to Dolce Estetica",
    excerpt:
      "Beauty isn't created, it's revealed. An introduction to our doctor-led approach to aesthetics and wellness.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: AUTHOR,
    reviewedBy: REVIEWER,
    date: "2026-01-15",
    dateModified: "2026-08-13",
    category: "About Dolce",
    readingMinutes: 3,
    directAnswer:
      "Dolce Estetica is a doctor-led aesthetic medicine and wellness group with clinics at Edapally (Kochi), Cherthala, Calicut and Mangalore. Every treatment plan begins with a medical consultation rather than a package, pricing is stated openly, and treatments are delivered under physician supervision.",
    content: [
      {
        type: "p",
        text: "At Dolce Estetica, we believe beauty isn't created, it's revealed. It's the quiet harmony between how you feel and how you choose to show up to the world.",
      },
      {
        type: "p",
        text: "Born from a collective of practising doctors in aesthetic and wellness medicine, Dolce Estetica embodies a deep respect for evidence and for the person in front of us. Every experience we design begins with an assessment, not a sales conversation.",
      },
      {
        type: "h2",
        text: "Where are the Dolce Estetica clinics?",
      },
      {
        type: "p",
        text: "Our clinics are at Edapally in Kochi, Cherthala in Alappuzha district, Calicut, and Mangalore in coastal Karnataka. Each offers physician-supervised skin, hair, body and wellness care, with consultation first and pricing stated openly.",
      },
      {
        type: "h2",
        text: "What should I expect at a first consultation?",
      },
      {
        type: "p",
        text: "A conversation about what is actually bothering you, an examination of the relevant skin, hair or body concern, an honest view of what can and cannot be achieved, and a plan with the costs stated before anything begins. If a treatment is not right for you, we would rather say so at that appointment than after you have paid for it.",
      },
    ],
    faqs: [
      {
        q: "Where are Dolce Estetica clinics located?",
        a: "Dolce Estetica has clinics at Edapally in Kochi, Cherthala in Alappuzha district, Calicut, and Mangalore in coastal Karnataka.",
      },
      {
        q: "Do I need an appointment?",
        a: "Consultations are by appointment so that adequate time is set aside for assessment. You can book by phone or WhatsApp with your preferred clinic.",
      },
      {
        q: "Is the first consultation with a doctor?",
        a: "Yes. Treatment planning at Dolce Estetica begins with a medical consultation, and treatments are delivered under physician supervision.",
      },
    ],
  },
];
