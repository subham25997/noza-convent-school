export type CoCurricularItem = {
  title: string;
  description?: string;
  image?: string;
};

export type CoCurricularSectionData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  images?: string[];
  layout?: "split" | "stack" | "gallery";
  accent?: "orange" | "sky" | "green" | "purple";
  items: CoCurricularItem[];
};

export const coCurricularData: CoCurricularSectionData[] = [
  {
    id: "arts-creativity",
    title: "Arts & Creativity",
    subtitle: "Nurturing imagination through colour, design, and handmade expression.",
    image: "/images/creative.jpg",
    images: ["/images/pencils.jpg", "/images/rangoli.jpg"],
    layout: "stack",
    accent: "orange",
    items: [
      {
        title: "Drawing & Painting",
        description: "Students explore colours, shading, and creative themes to express ideas with confidence.",
      },
      {
        title: "Rangoli Making",
        description: "Beautiful patterns and traditional artistry bring joy, symmetry and cultural pride to school life.",
      },
    ],
  },
  {
    id: "performing-arts",
    title: "Performing Arts",
    subtitle: "Bringing rhythm, movement, voice and stagecraft to life.",
    image: "/images/school.jpeg",
    images: ["/images/school.jpeg", "/images/creative.jpg"],
    layout: "gallery",
    accent: "purple",
    items: [
      {
        title: "Dance",
        description: "Classical, folk and western dance forms help students develop grace, discipline and confidence.",
      },
      {
        title: "Music",
        description: "Vocal and instrumental practice inspire creativity, teamwork and appreciation for melody.",
      },
      {
        title: "Drama & Theatre",
        description: "Storytelling and performance build communication, expression and public speaking skills.",
      },
      {
        title: "Annual Day Performances",
        description: "Students shine on stage during grand showcases that celebrate talent and school spirit.",
      },
    ],
  },
  {
    id: "sports-physical-education",
    title: "Sports & Physical Education",
    subtitle: "Building health, focus and team spirit through active participation.",
    image: "/images/sports.jpeg",
    images: ["/images/sports.jpeg", "/images/park.jpeg"],
    layout: "stack",
    accent: "green",
    items: [
      {
        title: "Volleyball",
        description: "Coordination, teamwork and agility are strengthened through regular practice and friendly matches.",
      },
      {
        title: "Kabaddi",
        description: "Students learn strategy, stamina and endurance through this traditional sport.",
      },
      {
        title: "Kho-Kho",
        description: "Fast-paced play nurtures reflexes, quick thinking and team coordination.",
      },
      {
        title: "Yoga",
        description: "Mind-body balance, flexibility and concentration are developed through yoga sessions.",
      },
      {
        title: "Chess",
        description: "Strategic thinking, patience and planning are sharpened through this intellectual game.",
      },
    ],
  },
  {
    id: "academic-enrichment",
    title: "Academic Enrichment",
    subtitle: "Encouraging curiosity beyond the regular classroom curriculum.",
    image: "/images/olympiad-prize.jpeg",
    images: ["/images/olympiad-prize.jpeg", "/images/olympiad-prize-2.jpeg"],
    layout: "split",
    accent: "sky",
    items: [
      {
        title: "Olympiad",
        description: "Students participate in national-level competitive platforms to strengthen conceptual understanding.",
      },
      {
        title: "Quiz Competitions",
        description: "Quick-thinking and subject knowledge are celebrated through interactive quiz events.",
      },
    ],
  },
  {
    id: "cultural-activities",
    title: "Cultural Activities",
    subtitle: "Celebrating traditions, values and shared joy in the school community.",
    image: "/images/rakshabandhan.png",
    images: ["/images/rakshabandhan.png", "/images/school.jpeg"],
    layout: "gallery",
    accent: "orange",
    items: [
      {
        title: "Independence Day Celebration",
        description: "Patriotic spirit and national pride are expressed through speeches, performances and events.",
      },
      {
        title: "Republic Day Celebration",
        description: "The school commemorates the nation with unity, respect and cultural programs.",
      },
      {
        title: "Rakshabandhan Celebration",
        description: "Students celebrate the festival with warmth, tradition and joyful participation.",
      },
      {
        title: "Annual Function",
        description: "A memorable showcase of talent, culture and school spirit brings everyone together.",
      },
    ],
  },
];
