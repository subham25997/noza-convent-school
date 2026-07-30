import { motion } from "framer-motion";
import { MdSchool } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { RiShieldStarFill } from "react-icons/ri";

const iconMap: Record<string, React.ReactNode> = {
  academic: <MdSchool size={28} className="text-amber-500" />,
  faculty: <FaChalkboardTeacher size={28} className="text-amber-500" />,
  holistic: <GiSkills size={28} className="text-amber-500" />,
  nurturing: <RiShieldStarFill size={28} className="text-amber-500" />,
};

const highlights = [
  {
    title: "Quality Education",
    description: "Focused on academic excellence and all-round development.",
    icon: "academic",
  },
  {
    title: "Experienced Faculty",
    description:
      "Dedicated and qualified teachers who inspire and guide every student.",
    icon: "faculty",
  },
  {
    title: "Holistic Development",
    description:
      "Encouraging creativity, confidence, and character building across activities.",
    icon: "holistic",
  },
  {
    title: "Safe & Nurturing Environment",
    description:
      "A secure and welcoming campus for your child’s growth and happiness.",
    icon: "nurturing",
  },
];

export function HorizontalBox() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="md:absolute w-full md:w-[calc(100%-2rem)] lg:max-w-7xl md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 bg-white flex flex-col sm:flex-col md:flex-row items-center justify-center shadow-sm py-4 sm:py-6"
    >
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="flex flex-col justify-center w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 md:last:border-r-0 px-6 py-3 sm:p-4 md:px-6"
        >
          <div className="bg-amber-50 rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4">
            {iconMap[highlight.icon]}
          </div>
          <h3 className="text-lime-600 text-md md:text-lg">
            {highlight.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {highlight.description}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
