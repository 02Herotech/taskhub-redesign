import Button from "@/components/global/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: (value: boolean) => void;
  links: {
    label: string;
    url: string;
  }[];
};

const HomeMobileNavigation = ({ setShowMobileNav, links }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setShowMobileNav(false)}
        className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-transparent"
      ></div>
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: "just" } }}
        exit={{ x: 100, opacity: 0, transition: { type: "just", delay: 0.1 } }}
        className="container fixed right-0 top-0 z-50 flex h-screen w-[calc(100%-150px)] flex-col justify-between space-y-8 overflow-auto bg-white py-4 drop-shadow-md"
      >
        <div>
          <button onClick={() => setShowMobileNav(false)} type="button">
            <IoMdCloseCircle className="h-9 w-9 text-primary" />
          </button>
          <ul className="mt-[70px] space-y-7">
            {links.map((link) => {
              return (
                <li key={link.label} className="">
                  <Link
                    onClick={() => setShowMobileNav(false)}
                    href={link.url}
                    passHref
                    className={cn("font-bold text-dark", {
                      "text-primary":
                        link.url === "/" && pathname === "/"
                          ? true
                          : link.url !== "/" && pathname.includes(link.url)
                            ? true
                            : false,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="">
            <Link href="/auth">
              <Button className="my-7 w-full rounded-full">Sign Up</Button>
            </Link>
            <Link href="/auth/login">
              <Button
                theme="outline"
                className="w-full rounded-full bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default HomeMobileNavigation;
