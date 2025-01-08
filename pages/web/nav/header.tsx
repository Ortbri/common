"use client";
import { ThemeToggle } from "../../../components/themeToggle";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const menuVariants = {
		closed: {
			opacity: 0,
			y: "100%",
			transition: {
				type: "tween",
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1],
			},
		},
		open: {
			opacity: 1,
			y: 0,
			transition: {
				type: "tween",
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1],
			},
		},
	};

	const menuItemVariants = {
		closed: { opacity: 0, y: 20 },
		open: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.14,
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1],
			},
		}),
	};

	const headerVariants = {
		top: {
			backgroundColor: "rgba(255, 255, 255, 0) ",
			backdropFilter: "blur(0px)",
		},
		scrolled: {
			backgroundColor: "light:rgba(255, 255, 255, 0.7) dark:rgba(0,0.0,.7)",
			backdropFilter: "blur(16px)",
		},
	};

	return (
		<>
			{/* floating header */}
			<motion.header
				className="fixed left-0 right-0 top-0 z-50"
				initial="top"
				animate={isScrolled ? "scrolled" : "top"}
				variants={headerVariants}
				transition={{ duration: 0.4 }}
			>
				<div className="mx-auto flex items-center justify-between px-4 py-4 lg:p-6">
					{/* uwu arch */}
					{/* <motion.div
						className="flex flex-col"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
					>
						<h1 className="text-2xl font-black">uwu</h1>
						<p className="text-lg font-thin tracking-wider">architecture</p>
					</motion.div> */}
					{/* LOGO will go here */}
					<div />

					{/* buttons */}
					<motion.div
						className="flex items-center gap-4"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
					>
						{/* contact button */}
						{/* <motion.button
							className="group relative cursor-pointer overflow-hidden rounded-full border-[1px] border-slate-300 bg-white px-6 py-2"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<motion.span className="relative z-10 transition-colors group-hover:text-black">
								contact
							</motion.span>
							<motion.div
								className="absolute inset-0"
								initial={{ x: "-100%" }}
								whileHover={{ x: 0 }}
								transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
							/>
						</motion.button> */}

						{/* menu button */}
						<motion.button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="bg-white light:bg-white dark:bg-black border-neutral flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] px-2"
							whileHover={{
								scale: 1.1,
							}}
							whileTap={{ scale: 0.95 }}
							aria-label="Toggle Menu"
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={isMenuOpen ? "close" : "open"}
									initial={{ opacity: 0, rotate: -90 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: 90 }}
									transition={{ duration: 0.2 }}
								>
									{isMenuOpen ? (
										<Cross1Icon height={15} width={15} />
									) : (
										<HamburgerMenuIcon height={15} width={15} />
									)}
								</motion.div>
							</AnimatePresence>
						</motion.button>
					</motion.div>
				</div>
			</motion.header>

			{/* open menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="light:bg-white/90 fixed inset-0 z-40 backdrop-blur-md dark:bg-black/20"
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
					>
						<nav className="flex h-full flex-col items-center justify-center">
							<ul className="space-y-8 text-center">
								{menuItems.map((item, i) => (
									<motion.li
										key={item.name}
										custom={i}
										variants={menuItemVariants}
									>
										<motion.a
											href={item.href}
											className="10 text-4xl font-bold"
											whileHover={{ opacity: 0.3 }}
										>
											{item.name}
										</motion.a>
									</motion.li>
								))}
							</ul>

							{/* theme toggle */}
							{/* later just use theme toggle classname rathter than a div wrapper */}
							<div className="absolute bottom-4 right-4">
								<ThemeToggle />
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

const menuItems = [
	{ name: "Pricing", href: "/details/pricing" },
	{ name: "About", href: "/details/about" },
	{ name: "Login", href: "/login" },
];


export default Header;
