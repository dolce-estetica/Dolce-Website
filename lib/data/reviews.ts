export type Review = { author: string; rating: number; relative_time: string; text: string; initial: string; color: string; isLocalGuide: boolean; reviewsCount: number; batch?: number };
export const reviews: Review[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Batch 1 — the original 3 hand-written seed reviews. No `batch` field.
  // ─────────────────────────────────────────────────────────────────────────────
  {
    "author": "Neha Sharma",
    "rating": 5,
    "relative_time": "2 weeks ago",
    "text": "The best aesthetics clinic in Kerala! From the moment I walked in, I felt relaxed and cared for. The team explained every step clearly, and the results of my treatment are subtle yet transformative. Highly recommend!",
    "initial": "N",
    "color": "bg-blue-600",
    "isLocalGuide": true,
    "reviewsCount": 12
  },
  {
    "author": "Farah Jamshed",
    "rating": 5,
    "relative_time": "1 month ago",
    "text": "They really listen to your concerns and offer honest guidance. My skin feels refreshed, and the improvements look beautifully natural. It's rare to find such personalized care in a modern clinic like this.",
    "initial": "F",
    "color": "bg-green-600",
    "isLocalGuide": false,
    "reviewsCount": 4
  },
  {
    "author": "Karan Bharadwaj",
    "rating": 5,
    "relative_time": "2 months ago",
    "text": "Professional, gentle, and clean. I appreciate how the entire experience was tailored to my needs. The results are exactly what I wanted. Dolce Estetica is definitely my go-to for skin treatments now.",
    "initial": "K",
    "color": "bg-orange-600",
    "isLocalGuide": true,
    "reviewsCount": 28
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Batch 2 — separately imported Google reviews, marked with `batch: 2` so
  // they are distinguishable from the originals above. Filtered to 4★+ with
  // written feedback; `initial` and `color` were generated for this batch.
  // ─────────────────────────────────────────────────────────────────────────────
  {
    "author": "Mariya Stephy",
    "rating": 5,
    "relative_time": "a month ago",
    "text": "I had a wonderful experience at dolce estetica,cherthala.I had been struggling with dull skin and pigmentation for a long time and had consulted several clinics without much success. Finally, I tried five sessions of IV glutathione treatment at dolce estetica,along with the products and the results have been amazing. The doctor and staff are extremely professional and took the time to explain everything thoroughly with a very warm!!Highly recommend Dolce estetica!!!",
    "initial": "M",
    "color": "bg-purple-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Saumya Aneesh",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "I’m happy with my consultation at Dolce Estetica Clinic. The doctor was knowledgeable, patient, and explained everything in detail. The staff were friendly and the clinic was well maintained. I felt comfortable and confident starting the treatment. Would recommend to others.",
    "initial": "S",
    "color": "bg-rose-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Anjana S",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "I've struggled with dull, damaged hair for a while and tried plenty of treatments with mixed results. The medspa experience at Dolce Estetica was genuinely different. The consultation was thorough, the treatment targeted exactly what my hair needed, and the results were visible almost immediately, stronger, shinier and healthier looking hair with a texture I haven't felt in years. It didn't feel like a routine treatment, it felt like my hair was actually being taken care of. The level of expertise and personalised care that goes into a session at Dolce admirable. Highly recommend.",
    "initial": "A",
    "color": "bg-teal-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Aneena Agnas Thomas",
    "rating": 5,
    "relative_time": "7 months ago",
    "text": "I visited Dolce Estetica for tanning concerns and I’m really happy with the treatment and the overall experience. I did the AI face analyzer, which gave a detailed analysis of my skin and highlighted the issues clearly. The doctor explained everything and gave me a treatment plan that included glutathione and a chemical peel. The nurses were very friendly, and the entire staff made me feel comfortable throughout the process. It has been two weeks now and I’m genuinely satisfied with the changes I’m seeing. Thank you, Dolce Estetica!",
    "initial": "A",
    "color": "bg-indigo-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Resmibiju",
    "rating": 5,
    "relative_time": "2 months ago",
    "text": "I went this clinic with dandruff issues and they started treatment in the first consultation. Iam extremely happy with the result. Also all staff are very amiable. Thank you all..",
    "initial": "R",
    "color": "bg-pink-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Millennia George",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Had a great consultation at Dolce Estetica Clinic. The dermatologist took the time to explain everything clearly and the treatment plan was very well-tailored. The staff is welcoming, and the clinic maintains a very clean, clinical yet comfortable environment.",
    "initial": "M",
    "color": "bg-cyan-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Veena R Nair",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Had an incredible medspa experience at Dolce Estetica. My hair felt noticeably stronger, healthier and had a shine I honestly hadn't seen in years. The team clearly knows what they're doing. Already planning my next visit.thank u dolce estetica clinic",
    "initial": "V",
    "color": "bg-violet-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Ashly Lukose",
    "rating": 5,
    "relative_time": "3 months ago",
    "text": "I have been visiting Dolce estetica clinic cherthala for my acne scar treatment and after multiple sessions of microneedling my skin looks so much better. Thanks to Dolce estetica . I highly recommend them for their efficiency and professionalism",
    "initial": "A",
    "color": "bg-amber-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Shalu Raj",
    "rating": 5,
    "relative_time": "7 months ago",
    "text": "Excellent experience! The team was incredibly attentive and made me feel comfortable throughout my visit. A special thanks to Dr. Risha for her support and reassurance. Highly recommend!",
    "initial": "S",
    "color": "bg-emerald-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "Achu Achu",
    "rating": 5,
    "relative_time": "3 months ago",
    "text": "I took iv glutathione and chemical peel treatment from dolce estetica clinic for my pigmentation and tanning issue of skin and after 2 sessions I got very good results ..Staff was also very friendly and cooperative ..thank you",
    "initial": "A",
    "color": "bg-fuchsia-600",
    "isLocalGuide": true,
    "reviewsCount": 12,
    "batch": 2
  },
  {
    "author": "Sreeja narayanan",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Recently i visited dolce estetica clinic.. Am fully satisfied with the treatment nd i got visible results with a short period of time.. The staffs are very corporate and friendly... For sure i will visit again and recommend for everyone who needs a happy face... Thank you team ❤️",
    "initial": "S",
    "color": "bg-sky-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Gopika S Nair",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "it was a nice experience. hydrafacial was pretty good. skin tag removal was also quick and efficient. staff is friendly and cooperative.",
    "initial": "G",
    "color": "bg-red-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "Drishya sarath",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Very nice experience. The doctors and staff are very friendly. Dolce Estetica is a one step solution for all skin &hair concerns.",
    "initial": "D",
    "color": "bg-lime-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "Ajaykumar Mg",
    "rating": 5,
    "relative_time": "2 months ago",
    "text": "I visited Dolce Estetica clinic recently for my pigmentation treatment..The overall service was very good and satisfying..staffs are very friendly..",
    "initial": "A",
    "color": "bg-purple-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Sreekumar",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "It was a nice experience.Lot of changes has happened to my hair. Thank you dolce estetica clinic",
    "initial": "S",
    "color": "bg-rose-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Anakha Pradeepan",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Recently I visited dolce clinic for worst situation of dandruff...Dr Risha advised to do a dandruff treatment, after that I get more relief from dandruff...Am fully satisfied with the treatment and also I prebook for a Korean hair spa...For sure I recommend everyone to do visit in dolce clinic... Thankyou dolce and team",
    "initial": "A",
    "color": "bg-teal-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Divya Soman",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Tried a hydrafacial and honestly, it was good. My skin felt refreshed and looked brighter right away. Definitely worth it🔥",
    "initial": "D",
    "color": "bg-indigo-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Sruthimol p r",
    "rating": 5,
    "relative_time": "7 months ago",
    "text": "I recommend this clinic to anyone looking for quality skin and hair care services.The staffs were very friendly, professional and had a very comfortable experience.",
    "initial": "S",
    "color": "bg-pink-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Devika Devu",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Positive ambience..friendly and welcoming staff’s.I’m fully satisfied with Dolce estetica clinic.",
    "initial": "D",
    "color": "bg-cyan-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Radhu Babu",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Effective clinic reviews should highlight professional staff, clean facilities, accurate diagnoses, and attentive care❤️❤️",
    "initial": "R",
    "color": "bg-violet-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Govind Sabu",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "Nice experience..... excellent at dolce clinic,Friendly staffs.felt comfortable and satisfied with the visit ❤️",
    "initial": "G",
    "color": "bg-amber-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Abhinav Sachin",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "It was a good experience. I came for a dandruff treatment and it was good and now i have a relief from dandruff. The Hospitality was good",
    "initial": "A",
    "color": "bg-emerald-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Ricin Cherian",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "1 months agoI visited with acne marks and pimples, and I can clearly see the improvement now. Completely satisfied.",
    "initial": "R",
    "color": "bg-fuchsia-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "ANCY ALPHA ACADEMY",
    "rating": 5,
    "relative_time": "9 months ago",
    "text": "Best result my skin tone improvement. Thanks to Dolce Estetica clinic. I recoment to this clinic",
    "initial": "A",
    "color": "bg-sky-600",
    "isLocalGuide": true,
    "reviewsCount": 7,
    "batch": 2
  },
  {
    "author": "Lijitha S Kumar",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "Very satisfied. Good services. I strongly recommend 🤗🤗",
    "initial": "L",
    "color": "bg-red-600",
    "isLocalGuide": false,
    "reviewsCount": 7,
    "batch": 2
  },
  {
    "author": "Akshay Shijimol",
    "rating": 5,
    "relative_time": "a year ago",
    "text": "Iam extremely satisfied with their service .They are using most advanced technology of Ai skin analyzer and scalp analyzer for providing accurate treatment methods for all skin and hair problems .compared to another skin clinic at cherthala Dolce Estetica Skin clinic is the best solution for all skin and hair problems, Thank you .",
    "initial": "A",
    "color": "bg-lime-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Roshni Saji",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Nice experience with Dolce...Special thanks to staffs...",
    "initial": "R",
    "color": "bg-purple-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "Mr Mani",
    "rating": 5,
    "relative_time": "10 months ago",
    "text": "We are very much satisfied with the treatment......Great hospitality from the Doctor as we as the staff....",
    "initial": "M",
    "color": "bg-rose-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "mhd khaif",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "Best serviceTreatment was so nice",
    "initial": "M",
    "color": "bg-teal-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "Athira Gopinath",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Nice experience & friendly behavior 🥰",
    "initial": "A",
    "color": "bg-indigo-600",
    "isLocalGuide": false,
    "reviewsCount": 7,
    "batch": 2
  },
  {
    "author": "punnekkattu Jibin",
    "rating": 5,
    "relative_time": "a year ago",
    "text": "Very good experience. And the staff's and doctor are very polite and friendly.",
    "initial": "P",
    "color": "bg-pink-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Christeena Tomy8899",
    "rating": 4,
    "relative_time": "a year ago",
    "text": "Good service and comfortable.... satisfaction level is very very High 💓100% result.... thank you .....🥰",
    "initial": "C",
    "color": "bg-cyan-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Aathira Manojkumar",
    "rating": 5,
    "relative_time": "8 months ago",
    "text": "Very friendly staff and a good treatment experience",
    "initial": "A",
    "color": "bg-violet-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Fathimathul misiriya s.s",
    "rating": 5,
    "relative_time": "a year ago",
    "text": "One stop solution for all your skin and hair related problems. Great hospitality from the doctor and staffs",
    "initial": "F",
    "color": "bg-amber-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "BRIDAL INNOVATION by Neethu Unni",
    "rating": 5,
    "relative_time": "11 months ago",
    "text": "Good service, friendly staff, Clean & Hygiene atmosphere",
    "initial": "B",
    "color": "bg-emerald-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "sudheesh c s",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Nice experience effective result",
    "initial": "S",
    "color": "bg-fuchsia-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "My Miss Shiji",
    "rating": 5,
    "relative_time": "11 months ago",
    "text": "Good service and staffs and doctor are friendly amazing service",
    "initial": "M",
    "color": "bg-sky-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "arundhathy DEEPAK",
    "rating": 4,
    "relative_time": "4 months ago",
    "text": "Very Good experience",
    "initial": "A",
    "color": "bg-red-600",
    "isLocalGuide": false,
    "reviewsCount": 4,
    "batch": 2
  },
  {
    "author": "RADIO SONG",
    "rating": 5,
    "relative_time": "7 months ago",
    "text": "Good 🥰",
    "initial": "R",
    "color": "bg-lime-600",
    "isLocalGuide": false,
    "reviewsCount": 7,
    "batch": 2
  },
  {
    "author": "Haripriya Harizzz",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Good experience",
    "initial": "H",
    "color": "bg-purple-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Manitha Anand",
    "rating": 5,
    "relative_time": "a year ago",
    "text": "Amazing service👍 thank you so much❤️",
    "initial": "M",
    "color": "bg-rose-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Lakshmi Gayathri",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "Good treatment",
    "initial": "L",
    "color": "bg-teal-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Robin R R",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "good",
    "initial": "R",
    "color": "bg-indigo-600",
    "isLocalGuide": false,
    "reviewsCount": 3,
    "batch": 2
  },
  {
    "author": "Nidhiya Grigari",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Nice experience",
    "initial": "N",
    "color": "bg-pink-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Binu Kumar",
    "rating": 5,
    "relative_time": "5 months ago",
    "text": "Good service",
    "initial": "B",
    "color": "bg-cyan-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Josmy James",
    "rating": 5,
    "relative_time": "7 months ago",
    "text": "Good",
    "initial": "J",
    "color": "bg-violet-600",
    "isLocalGuide": false,
    "reviewsCount": 6,
    "batch": 2
  },
  {
    "author": "Divya Syamkumar",
    "rating": 5,
    "relative_time": "a year ago",
    "text": "Good experience",
    "initial": "D",
    "color": "bg-amber-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Devika N A",
    "rating": 4,
    "relative_time": "a year ago",
    "text": "Good",
    "initial": "D",
    "color": "bg-emerald-600",
    "isLocalGuide": false,
    "reviewsCount": 1,
    "batch": 2
  },
  {
    "author": "Akhil T Nair",
    "rating": 5,
    "relative_time": "6 months ago",
    "text": "I had a very good experience at dolce estetica clinic.the clinic is clean,well maintained and the staff are professional and courteous-very approachable,knowledgeable and takes time to guide patients properly. Overall a smooth and satisfying experience. Highly recommended.",
    "initial": "A",
    "color": "bg-fuchsia-600",
    "isLocalGuide": false,
    "reviewsCount": 2,
    "batch": 2
  },
  {
    "author": "Anjali VV",
    "rating": 4,
    "relative_time": "7 months ago",
    "text": "I head to John for hair and laser treatment and doctor risha is a very recommended doctor for getting solutions on the same",
    "initial": "A",
    "color": "bg-sky-600",
    "isLocalGuide": false,
    "reviewsCount": 7,
    "batch": 2
  }
];
