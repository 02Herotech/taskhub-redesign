import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSortDown } from 'react-icons/fa';
import axios from 'axios';
import Button from '@/components/global/Button';
import { cn } from '@/lib/utils';
import {
  homeLinks,
  mobileCustomerLinks,
  mobileServiceProviderLinks,
} from '@/lib/links';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: (value: boolean) => void;
};

interface NavLink {
  label: string;
  url?: string;
  icon?: React.ReactNode;
  sublinks?: NavLink[];
}

const MobileNavigation: React.FC<Props> = ({ showMobileNav, setShowMobileNav }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openSubDropdown, setOpenSubDropdown] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const userRole = session?.data?.user?.user?.roles;
  const isServiceProvider = userRole && userRole[0] === 'SERVICE_PROVIDER';
  const isAuth = session.status === 'authenticated';

  const currentLinks: NavLink[] = !isAuth
    ? homeLinks
    : isServiceProvider
      ? mobileServiceProviderLinks
      : mobileCustomerLinks;

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: 'https://taskhub.com.au/home' });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push('/home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {showMobileNav && (
        <div
          onClick={() => setShowMobileNav(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
        />
      )}
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: showMobileNav ? 0 : '-100%', transition: { type: 'tween', duration: 0.3 } }}
        exit={{ x: '-100%', transition: { type: 'tween', duration: 0.3 } }}
        className="fixed left-0 top-0 z-50 flex h-screen w-4/5 flex-col justify-between shadow overflow-hidden rounded-tr-xl rounded-br-xl bg-white p-5 drop-shadow-md"
      >
        <div>
          <div className="flex w-full items-center justify-between border-b border-primary pb-3">
            <IoCloseCircleOutline onClick={() => setShowMobileNav(false)} type="button" className="size-6 text-primary" />
            {isServiceProvider ? (
              <Button className='bg-tc-orange rounded-full border-tc-orange' onClick={() => router.push("/provide-service")}>
                Provide a service
              </Button>
            ) : (
                <Button className='rounded-full' onClick={() => router.push("/customer/add-task")}>
                Add a task
              </Button>
            )}
          </div>

          <ul className="mt-8 space-y-4 overflow-y-scroll small-scrollbar h-[70vh]">
            {currentLinks.map((link) => {
              const isActive =
                (link.url === '/' && pathname === '/') ||
                (link.url !== '/' && pathname.includes(link.url!));
              const sublinkIsActive = link.sublinks?.some((sublink) => pathname.includes(sublink.url!));

              return (
                <li key={link.label} className="w-full">
                  {link.sublinks ? (
                    <>
                      <button
                        className={cn(
                          'flex items-center justify-between w-full py-3 px-5 text-lg font-bold rounded-md text-primary',
                          (openDropdown || sublinkIsActive) && 'bg-[#EBE9F4] rounded-full'
                        )}
                        onClick={() => toggleDropdown()}
                      >
                        <div className={cn(
                          'flex items-center text-lg font-bold rounded-md text-primary',
                          openDropdown || isActive && 'bg-[#EBE9F4] rounded-full'
                        )}>
                          {link.icon && <span className="mr-5">{link.icon}</span>}
                          <h4 className="text-lg font-bold text-primary">
                            {link.label}
                          </h4>
                        </div>
                        <FaSortDown
                          className={cn('size-4 text-tc-orange transition-all', {
                            'rotate-180': openDropdown,
                          })}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown && (
                          <motion.ul
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="ml-6 pl-6 mt-4 border-l-[1.5px] border-[#C1BADB] space-y-4"
                          >
                            {link.sublinks.map((sublink) => (
                              sublink.sublinks ? (
                                <li key={sublink.label} className="w-full">
                                  <button
                                    className={cn(
                                      'flex items-center justify-between w-full py-3 px-5 text-lg font-bold rounded-md text-primary',
                                    )}
                                    onClick={() => setOpenSubDropdown(!openSubDropdown)}
                                  >
                                    <div className={cn(
                                      'flex items-center text-lg font-bold rounded-md text-primary',
                                    )}>
                                      {sublink.icon && <span className="mr-5">{sublink.icon}</span>}
                                      <h4 className="text-lg font-bold text-primary">
                                        {sublink.label}
                                      </h4>
                                    </div>
                                    <FaSortDown
                                      className={cn('size-4 text-tc-orange transition-all', {
                                        'rotate-180': openSubDropdown,
                                      })}
                                    />
                                  </button>
                                  <AnimatePresence>
                                    {openSubDropdown && (
                                      <motion.ul
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        className="ml-6 pl-6 mt-3 border-l-[1.5px] border-[#C1BADB] space-y-2"
                                      >
                                        {sublink.sublinks.map((subsublink) => (
                                          <li key={subsublink.label}>
                                            <Link
                                              onClick={() => setShowMobileNav(false)}
                                              href={subsublink.url!}
                                              className={cn('flex items-center py-2 px-5 text-lg font-bold text-primary', {
                                                'bg-[#EBE9F4] rounded-full': pathname.includes(subsublink.url!),
                                              })}
                                            >
                                              {subsublink.icon && <span className="mr-5">{subsublink.icon}</span>}
                                              {subsublink.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </li>
                              ) : (
                                <li key={sublink.label} className="w-full">
                                  <Link
                                    onClick={() => setShowMobileNav(false)}
                                    href={sublink.url!}
                                    className={cn('flex items-center py-2 px-5 text-lg font-bold text-primary', {
                                      'bg-[#EBE9F4] rounded-full': pathname.includes(sublink.url!),
                                    })}
                                  >
                                    {sublink.icon && <span className="mr-5">{sublink.icon}</span>}
                                    {sublink.label}
                                  </Link>
                                </li>
                              )))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
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
                  )}

                </li>
              );
            })}
          </ul>
          <div className={cn(
            'flex items-center text-lg font-bold rounded-md text-primary fixed bottom-10 py-3 px-5',
          )} onClick={handleLogout}>
            <FiLogOut className='mr-5 text-primary size-6' />
            <h4 className="text-lg font-bold text-primary">
              Logout
            </h4>
          </div>
        </div>

      </motion.nav >
    </>
  );
};

export default MobileNavigation;