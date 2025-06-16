import { motion } from "framer-motion";
import {
  FaBook,
  FaTools,
  FaVideo,
  FaCode,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";

function Resources() {
  const resources = [
    {
      title: "Learning Paths",
      icon: <FaBook className="w-6 h-6" />,
      description:
        "Structured learning paths for different skill levels and technologies",
      items: [
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "DevOps & Cloud",
      ],
    },
    {
      title: "Development Tools",
      icon: <FaTools className="w-6 h-6" />,
      description: "Essential tools and utilities for modern development",
      items: [
        "Code Editors & IDEs",
        "Version Control",
        "Package Managers",
        "Development Environments",
      ],
    },
    {
      title: "Video Tutorials",
      icon: <FaVideo className="w-6 h-6" />,
      description: "Step-by-step video guides for hands-on learning",
      items: [
        "Web Development Basics",
        "Advanced JavaScript",
        "React & Next.js",
        "Node.js & Express",
      ],
    },
    {
      title: "Code Snippets",
      icon: <FaCode className="w-6 h-6" />,
      description: "Reusable code examples and solutions",
      items: [
        "Common Patterns",
        "Best Practices",
        "Performance Tips",
        "Security Guidelines",
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: <FaLaptopCode className="w-6 h-6" />,
      description: "Popular frameworks and libraries with usage guides",
      items: ["React Ecosystem", "Vue.js & Nuxt", "Angular", "Express & Koa"],
    },
    {
      title: "Career Resources",
      icon: <FaRocket className="w-6 h-6" />,
      description: "Resources to help advance your tech career",
      items: [
        "Interview Preparation",
        "Resume Building",
        "Portfolio Development",
        "Career Growth",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Developer{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              Resources
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated collection of tools, tutorials, and resources to help you
            excel in your development journey.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {resource.description}
              </p>
              <ul className="space-y-2">
                {resource.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explore our comprehensive resources and start your journey to
            becoming a better developer.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Resources;
