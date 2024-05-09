import Image from "next/legacy/image";

type Link = {
  label: string;
  url: string;
};

const socialLinks: Link[] = [
  { label: "Facebook", url: "https://www.facebook.com", icon: "url" },
  { label: "Instagram", url: "https://www.instagram.com", icon: "url" },
  { label: "Twitter", url: "https://www.twitter.com", icon: "url" },
  { label: "LinkedIn", url: "https://www.linkedin.com", icon: "url" },
];

const links: { label: string; links: Link[] }[] = [
  {
    label: "Social",
    links: [
      { label: "About me", url: "/about" },
      { label: "Contact", url: "/contact" },
      { label: "Blog", url: "/blog" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Web Development", url: "/web-development" },
      { label: "Design", url: "/design" },
      { label: "Marketing", url: "/marketing" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", url: "/about" },
      { label: "Careers", url: "/careers" },
      { label: "Press", url: "/press" },
    ],
  },
  {
    label: "Helpful Links",
    links: [
      { label: "Help", url: "/help" },
      { label: "Support", url: "/support" },
      { label: "Privacy", url: "/privacy" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Terms", url: "/terms" },
      { label: "Privacy", url: "/privacy" },
      { label: "Cookies", url: "/cookies" },
    ],
  },
];

export default function Footer({ socialLinks, links }: FooterProps) {
  return (
    <>
      <footer className="bg-neutral border-t-2 drop-shadow-sm">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-teal-600">
              <Image
                src="/images/placeholder.png"
                alt="alt"
                width={200}
                height={50}
              />
            </div>

            <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-y-12 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
            {links.map((group, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold text-gray-900">
                  {group.label}
                </h2>
                <ul className="mt-4 space-y-4">
                  {group.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="text-gray-500 hover:text-gray-900 transition"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            &copy; 2022. Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
