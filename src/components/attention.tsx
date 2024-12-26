import React from "react";
import Image from "next/image";

function Attention() {
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
			<div className="relative w-full px-4 md:max-w-6xl">
				{/* Main container with mobile-first layout */}
				<div className="relative flex flex-col items-center md:flex-row md:items-start">
					{/* Image container - smaller on mobile, larger on desktop */}
					<div className="relative mx-auto h-[500px] w-full max-w-4xl sm:h-[600px] md:h-[700px]">
						<Image
							src="/dawn.png"
							alt="Architectural dawn view"
							fill
							className="animate-fadeIn object-contain object-center"
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					Copy
					<div className="animate-fadeIn absolute flex flex-col">
						<div>
							<h1 className="text-8xl font-semibold">UWU</h1>
						</div>
						<div>
							<p className="text-5xl font-thin text-gray-400">ARCH</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Attention;
