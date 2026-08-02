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
    id: "arts-science-creativity",
    title: "Arts & Science Creativity",
    subtitle: "Nurturing imagination through colour, design, and handmade expression.",
    image: "/images/creative.jpg",
    images: ["/images/science.jpg", "/images/science-drawing.jpg", "/images/art1.jpg", "/images/art2.jpg", "/images/art3.jpg"],
    layout: "stack",
    accent: "orange",
    items: [
      {
        title: "Drawing & Painting",
        description: "Students explore colours, shading, and creative themes to express ideas with confidence.",
      },
      {
        title: "Science & Innovation",
        description: "Hands-on experiments and projects spark curiosity, problem-solving, and critical thinking skills.",
      },
    ],
  },
  {
    id: "rangoli-craft-club",
    title: "Rangoli & Craft Club",
    subtitle: "Creating beauty through traditional art forms and creative expression.",
    image: "/images/rangoli.jpg",
    images: ["/images/rangoli1.jpg", "/images/rangoli2.jpg", "/images/rangoli3.jpg", "/images/rangoli4.jpg"],
    layout: "stack",
    accent: "green",
    items: [
      {
        title: "Rangoli Designing",
        description: "Students learn to create intricate patterns using colored powders and natural materials. This activity enhances focus, patience, and cultural appreciation. ",
      },
    ],
  },
  {
    id: "performing-arts",
    title: "Performing Arts",
    subtitle: "Bringing rhythm, movement, voice and stagecraft to life.",
    image: "/images/independence-day-1.jpg",
    images: ["/images/republic-day.jpg", "/images/independence-day-2.jpg", "/images/republic-day-2.jpg", "/images/independence-day.jpg"],
    layout: "stack",
    accent: "purple",
    items: [
      {
        title: "Republic Day Performances",
        description: "Students showcase patriotic spirit through music, dance, and drama during the annual Republic Day celebrations.",
      },
      {
        title: "Independence Day Performances",
        description: "Students express national pride and cultural heritage through performances, speeches, and artistic presentations on Independence Day.",
      },
    ],
  },
  {
    id: "fun-and-tours",
    title: "Fun & Tours",
    subtitle: "Exploring the world beyond the classroom.",
    image: "/images/tour.jpg",
    images: ["/images/tour1.jpg", "/images/tour2.jpg", "/images/tour3.jpg", "/images/tour4.jpg"],
    layout: "stack",
    accent: "purple",
    items: [
      {
        title: "Tours",
        description: "Students enjoy educational and recreational trips to various destinations. These excursions foster curiosity, social skills, and a broader understanding of the world.",
      },
    ],
  },
  {
    id: "sports-physical-education",
    title: "Sports & Physical Education",
    subtitle: "Building health, focus and team spirit through active participation.",
    image: "/images/sports.jpeg",
    images: ["/images/holistic.jpg", "/images/park.jpeg", "/images/physical-edu-1.jpg", "/images/physical-edu-2.jpg"],
    layout: "stack",
    accent: "green",
    items: [
      {
        title: "Sports & Games",
        description: "Students engage in various sports and games to develop physical fitness, teamwork, and strategic thinking.",
      },
      {
        title: "Physical Education",
        description: "Structured physical activities and exercises promote overall health, coordination, and discipline among students.",
      },
      
    ],
  },
];
