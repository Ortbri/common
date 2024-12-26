"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
	const navItems = [
		{ name: "Projects", href: "/projects" },
		{ name: "About", href: "/about" },
		{ name: "Services", href: "/services" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<div>
			<div
				className={
					"fixed inset-x-10 z-[5000] mx-auto flex max-w-7xl items-center justify-between px-5 py-2"
				}
				style={{
					backdropFilter: "blur(8px) saturate(180%)",
					backgroundColor: "rgba(255, 255, 255, 0.80)",
				}}
			>
				{/* Desktop Navigation */}
				<nav className="hidden flex-1 items-center justify-end space-x-8 md:flex">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="group relative text-sm font-medium text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
						>
							{item.name}
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full dark:bg-white" />
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
};

export default Header;
