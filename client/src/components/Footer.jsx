/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsStackOverflow,
} from "react-icons/bs";
import { motion } from "framer-motion";

function FooterCom() {
  return (
    <Footer
      container
      className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid w-full justify-between sm:flex md:grid-cols-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5"
          >
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white hover:opacity-80 transition-opacity duration-200"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 rounded-lg text-white shadow-md">
                Zudo's
              </span>{" "}
              Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6"
          >
            <div>
              <Footer.Title
                title="About"
                className="text-gray-900 dark:text-white font-semibold tracking-wide uppercase text-xs"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  Resources
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  Zudo's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Follow Us"
                className="text-gray-900 dark:text-white font-semibold tracking-wide uppercase text-xs"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/kirigaya07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Legal"
                className="text-gray-900 dark:text-white font-semibold tracking-wide uppercase text-xs"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-gray-500 dark:text-gray-400"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </motion.div>
        </motion.div>

        <Footer.Divider className="border-gray-100 dark:border-gray-800" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full sm:flex sm:items-center sm:justify-between"
        >
          <Footer.Copyright
            href="#"
            by="Zudo's Blog"
            year={new Date().getFullYear()}
            className="text-gray-400 dark:text-gray-500"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-5 sm:mt-0 mt-4 sm:justify-center"
          >
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            />
            <Footer.Icon
              href="https://github.com/kirigaya07"
              icon={BsGithub}
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            />
            <Footer.Icon
              href="https://x.com/AnmolChandraka4"
              icon={BsTwitter}
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            />
            <Footer.Icon
              href="https://stackoverflow.com/users/26657689/anmol-chandrakar"
              icon={BsStackOverflow}
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            />
          </motion.div>
        </motion.div>
      </div>
    </Footer>
  );
}

export default FooterCom;
