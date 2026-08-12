export type Review = { author: string; rating: number; relative_time: string; text: string; initial: string; color: string; isLocalGuide: boolean; reviewsCount: number };
export const reviews: Review[] = [
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
  }
];
