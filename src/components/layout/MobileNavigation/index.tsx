import Button from "@/components/global/Button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Logo from "../Logo";
import { homeLinks, mobileCustomerLinks, mobileServiceProviderLinks } from "@/lib/links";
import SmallLogo from "../SmallLogo";
import { useState } from "react";

type Props = {
	showMobileNav: boolean;
	setShowMobileNav: (value: boolean) => void;
};

const MobileNavigation = ({ setShowMobileNav }: Props) => {
	const [openDropdown, setOpenDropdown] = useState(null);
	const pathname = usePathname();
	const router = useRouter()
	const session = useSession();
	const serviceProviderParams = new URLSearchParams({ userType: "serviceProvider" });
	const profileImage = session?.data?.user.user.profileImage;
	const userRole = session?.data?.user.user.roles;
	const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";
	const isAuth = session.status === "authenticated";
	// const isCustomer = userRole && userRole[0] === "CUSTOMER";
	const notificationLength = session.data?.user.user.appNotificationList.length

	const currentLinks = !isAuth ? homeLinks : isServiceProvider ? mobileServiceProviderLinks : mobileCustomerLinks;
	const currentYear = new Date().getFullYear();

	const handleLogout = async () => {
		try {
			router.push("/home");
			await signOut();

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	const toggleDropdown = (index: any) => {
		setOpenDropdown(openDropdown === index ? null : index);
	};

	return (
		<>
			<div
				onClick={() => setShowMobileNav(false)}
				className='bg-transparent fixed top-0 z-40 right-0 left-0 bottom-0'></div>
			<motion.nav
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1, transition: { type: "just" } }}
				exit={{ x: 100, opacity: 0, transition: { type: "just", delay: 0.1 } }}
				className='bg-white drop-shadow-md overflow-auto flex flex-col justify-between space-y-8 container p-8 h-screen w-full z-50 fixed top-0 right-0'>
				<div className="relative h-screen font-satoshi">
					<div className="w-full flex items-center justify-between">
						<Logo />
						<button onClick={() => setShowMobileNav(false)} type='button'>
							<IoMdCloseCircle className="text-primary w-9 h-9" />
						</button>
					</div>
					{!isAuth && (
						<div className="mt-8 w-full flex items-center justify-center">
							<button
								className="rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] px-3 py-2 hover:bg-[#e79823]"
							>
								<Link
									href={`/auth/sign-up?${serviceProviderParams.toString()}`}
									className="flex items-center justify-center"
								>
									<p className="">Become a Service Provider</p>

								</Link>
							</button>
						</div>
					)}
					<ul className='space-y-7 my-[40px]'>
						{currentLinks.map((link, index) => {
							const isActive = link.url === "/" && pathname === "/" || link.url !== "/" && pathname.includes(link.url!);

							return (
								<li key={link.label} className='w-full'>
									{link.sublinks ? (
										<>
											<button className="w-full flex items-center justify-between" onClick={() => toggleDropdown(index)}>
												<h4
													className={cn("text-primary font-medium text-lg", { "text-tc-orange": isActive })}
												>
													{link.label}
												</h4>
												<FaAngleDown className={cn("text-primary transition-all size-4", {
													"rotate-[180deg]": openDropdown,
												})} />
											</button>
											{openDropdown === index && (
												<ul>
													{link.sublinks.map((sublink) => (
														<li key={sublink.label} className='pl-2 pt-3 space-y-7'>
															<Link
																onClick={() => setShowMobileNav(false)}
																href={sublink.url}
																passHref
																className={cn("text-primary font-medium text-lg", {
																	"text-tc-orange":
																		sublink.url === "/" && pathname === "/"
																			? true
																			: sublink.url !== "/" && pathname.includes(sublink.url)
																				? true
																				: false,
																})}
															>
																{sublink.label}
															</Link>
														</li>
													))}
												</ul>
											)}
										</>
									) : (
										<Link
											onClick={() => setShowMobileNav(false)}
											href={link.url!}
											passHref
											className={cn("text-primary font-medium text-lg", { "text-tc-orange": isActive })}
										>
											{link.label}
										</Link>
									)}
								</li>
							);
						})}
						<div onClick={handleLogout} className="text-primary font-medium text-lg cursor-pointer">
							Logout
						</div>
					</ul>
					<div className="absolute bottom-0 w-full">
						{!isAuth && (
							<div className="flex items-center w-full my-5 justify-center space-x-5">
								<Link href="/auth">
									<Button className="rounded-full">Sign Up</Button>
								</Link>
								<Link href="/auth/login">
									<Button theme="outline" className="rounded-full bg-transparent">
										Log in
									</Button>
								</Link>
							</div>
						)}
						<div className="flex flex-col justify-center items-center space-y-8">
							<SmallLogo />
							<p className="text-primary font-normal text-center text-[13px]">Online platform that connects Service Provider with Customers who are seeking various services. The platform offers a wide range of services.</p>
							<div className="flex items-center justify-center space-x-3">
								<Link href="/faq" className="text-primary font-medium underline underline-offset-2 text-[13px]">FAQs</Link>
								<div className="w-[4px] h-[4px] rounded-full bg-primary" />
								<Link href="/terms-and-conditions" className="text-primary font-medium underline underline-offset-2 text-[13px]">Terms and Conditions</Link>
								<div className="w-[4px] h-[4px] rounded-full bg-primary" />
								<Link href="/privacy" className="text-primary font-medium underline underline-offset-2 text-[13px]">Privacy</Link>
							</div>
							<h5 className="text-black text-[10px] text-center">{currentYear} TaskHub. All Rights Reserved.</h5>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default MobileNavigation;
