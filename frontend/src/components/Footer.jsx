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

function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md: grid-col-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-blue-400 to-blue-500 rounded-lg text-white">
                Zudo's{" "}
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              {" "}
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsproject.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 Js Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zudo's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              {" "}
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/kirigaya07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              {" "}
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Term &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Auther blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="https://github.com/kirigaya07" icon={BsGithub} />
            <Footer.Icon
              href="https://x.com/AnmolChandraka4"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="https://stackoverflow.com/users/26657689/anmol-chandrakar"
              icon={BsStackOverflow}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
