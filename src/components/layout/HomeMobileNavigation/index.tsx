import { homeMobileLinks, LinkRouteTypes } from "@/lib/links";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCloseCircleOutline } from "react-icons/io5";

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: (value: boolean) => void;
  links: LinkRouteTypes[];
};

const HomeMobileNavigation = ({ showMobileNav, setShowMobileNav }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setShowMobileNav(false)}
        className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black bg-opacity-30"
      ></div>
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: showMobileNav ? 0 : '-100%', transition: { type: 'tween', duration: 0.3 } }}
        exit={{ x: '-100%', transition: { type: 'tween', duration: 0.3 } }}
        className="fixed left-0 top-0 z-50 flex h-screen w-4/5 flex-col justify-between overflow-auto bg-white p-5 drop-shadow-md"
      >
        <div>
          <div className="flex w-full items-center justify-between border-b border-primary pb-3">
            <IoCloseCircleOutline onClick={() => setShowMobileNav(false)} className="size-6 text-primary cursor-pointer" />
          </div>

          <ul className="my-8 space-y-4">
            {homeMobileLinks.map((link) => {
              const isActive =
                (link.url === '/' && pathname === '/') ||
                (link.url !== '/' && pathname.includes(link.url!));

              return (
                <li key={link.label} className="w-full">
                  <Link
                    onClick={() => setShowMobileNav(false)}
                    href={link.url!}
                    className={cn('flex items-center py-2 px-5 text-lg font-bold text-primary', {
                      'bg-[#EBE9F4] rounded-full': isActive,
                    })}
                  >
                    {link.icon && <span className="mr-5">{link.icon}</span>}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default HomeMobileNavigation;
