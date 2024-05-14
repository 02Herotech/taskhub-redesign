import Button from "@/components/global/Button";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	showMobileNav: boolean;
	setShowMobileNav: (value: boolean) => void;
	links: {
		label: string;
		url: string;
	}[];
};

const MobileNavigation = ({ setShowMobileNav, links }: Props) => {
	const pathname = usePathname();

	return (
		<>
			<div
				onClick={() => setShowMobileNav(false)}
				className='bg-transparent fixed top-0 z-40 right-0 left-0 bottom-0'></div>
			<motion.nav
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1, transition: { type: "just" } }}
				exit={{ x: 100, opacity: 0, transition: { type: "just", delay: 0.1 } }}
				className='bg-white drop-shadow-md overflow-auto flex flex-col justify-between space-y-8 container py-4 h-screen w-[calc(100%-150px)] z-50 fixed top-0 right-0'>
				<div>
					<button onClick={() => setShowMobileNav(false)} type='button'>
						{/* <Icons.CloseIcon /> */}
					</button>
					<ul className='space-y-7 mt-[70px]'>
						{links.map((link) => {
							return (
								<li key={link.label} className='text-pc-01'>
									<Link
										onClick={() => setShowMobileNav(false)}
										href={link.url}
										passHref
										className={cn("text-sm text-dark", {
											"text-primary":
												link.url === "/" && pathname === "/"
													? true
													: link.url !== "/" && pathname.includes(link.url)
														? true
														: false,
										})}>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
					<div className='space-y-3 flex flex-col mt-10 w-full'>
						<Link
							className='flex-1'
							href="/auth/sign-up"
						>
							<Button className='text-xs w-full lg:text-sm font-medium py-2.5'>
								Create account
							</Button>
						</Link>
						<Link
							className='flex-1'
							href="/auth/login"
						>
							<Button theme="outline" className='text-xs text-primary border border-primary w-full lg:text-sm font-medium py-2.5'>
								Login
							</Button>
						</Link>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default MobileNavigation;
