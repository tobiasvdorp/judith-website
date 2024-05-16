import Image from "next/legacy/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// type Link = {
//   linkSectionTitle: string;
//   links: { label: string; url: string }[];
// };

// type SocialLink = Link & { icon: string };

type FooterProps = {
  links: { groupTitle: string; links: { label: string; url: string }[] }[];
  logo: string;
};

type SocialLink = {
  label: string;
  icon: string;
  url: string;
};

export default function Footer({ links, logo }: FooterProps) {
  const socialLinks: SocialLink[] = [
    {
      label: "Facebook",
      icon: "Facebook",
      url: "https://www.facebook.com",
    },
    {
      label: "Twitter",
      icon: "Twitter",
      url: "https://www.twitter.com",
    },
    {
      label: "Instagram",
      icon: "Instagram",
      url: "https://www.instagram.com",
    },
    {
      label: "LinkedIn",
      icon: "LinkedIn",
      url: "https://www.linkedin.com",
    },
  ];
  return (
    <>
      <footer className="bg-neutral border-t-2 shadow-[0_1px_20px_-15px_rgba(0,0,0)]">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 pt-6 sm:px-6 lg:space-y-12 lg:px-8">
          <div className="sm:flex sm:items-center flex justify-between">
            <Link className="relative w-20 h-20" href={"/"}>
              <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
            </Link>

            <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                    aria-label={link.label}
                  >
                    {
                      {
                        Facebook: (
                          <FaFacebook
                            size={24}
                            className="hover:text-blue-800"
                          />
                        ),
                        Twitter: <FaXTwitter size={24} />,
                        Instagram: <FaInstagram size={24} />,
                        LinkedIn: (
                          <FaLinkedin
                            size={24}
                            className="hover:text-blue-800"
                          />
                        ),
                      }[link.icon]
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-y-12 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold text-gray-900">
                  {link.groupTitle}
                </h2>
                <ul className="mt-4 space-y-4">
                  {link.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={`${link.url}`}
                        className="text-gray-600 hover:text-gray-900 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600">
            &copy; 2024 - Judith van Dorp. Alle rechten voorbehouden.
            <br />
            <br />
            Deze website is ontworpen en ontwikkeld door{" "}
            <a href="https://www.linkedin.com/in/tobiasvandorp/">
              Tobias van Dorp
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
