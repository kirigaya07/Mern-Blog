/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaLightbulb,
  FaUsers,
  FaBookOpen,
  FaRocket,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              Zudo's Blog
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A platform dedicated to sharing insights, experiences, and knowledge
            in the world of web development and technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <FaCode className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              In-Depth Articles
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore a wide range of topics through detailed articles that
              offer valuable insights and practical advice for developers at all
              levels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <FaUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Community Hub
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a vibrant community of developers, share experiences, and
              collaborate on solving real-world challenges together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <FaLightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Industry Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay informed about current trends, challenges, and opportunities
              within the tech industry through thought-provoking content.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Welcome to my blog, a platform dedicated to sharing insights,
              experiences, and knowledge in the world of web development and
              technology. Here, I explore a wide range of topics through
              in-depth articles that offer valuable insights and practical
              advice for developers at all levels. Whether you're just starting
              out or looking to deepen your expertise, the content here is
              designed to help you navigate the complexities of web development
              with confidence.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our community is at the heart of everything we do. Through
              engaging discussions, collaborative problem-solving, and shared
              experiences, we create a supportive environment where developers
              can learn and grow together. You'll find a wealth of resources,
              from detailed tutorials to thought-provoking discussions, all
              designed to help you advance your skills and connect with
              like-minded individuals.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Beyond technical content, this blog features thought pieces that
              reflect on current trends, challenges, and opportunities within
              the tech industry. My goal is to create a space where ideas can be
              shared and discussed, fostering a community of learners and
              innovators. Whether you're here to gain new knowledge, connect
              with other developers, or stay informed about the latest industry
              trends, this blog is a resource designed to support your journey
              in the digital world. Thank you for being part of this community.
            </p>
          </div>
        </motion.div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                <FaBookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Learning Resources
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Access comprehensive tutorials, guides, and learning materials
              designed to help you master web development concepts and best
              practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                <FaRocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Career Growth
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Discover career advice, industry insights, and tips for
              professional development to help you advance in your tech career.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join our community, explore our articles, and take your development
            skills to the next level.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
          >
            Explore Blog
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
