import Button from "@/components/global/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
						<IoMdCloseCircle className="text-primary w-9 h-9" />
					</button>
					<ul className='space-y-7 mt-[70px]'>
						{links.map((link) => {
							return (
								<li key={link.label} className='text-pc-01'>
									<Link
										onClick={() => setShowMobileNav(false)}
										href={link.url}
										passHref
										className={cn("text-dark font-bold", {
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
				</div>
			</motion.nav>
		</>
	);
};

export default MobileNavigation;
