import React from "react";

function Hero() {
	return (
		<div className="flex h-screen flex-1 bg-slate-100">
			<div className="bg-slate-40 flex flex-1 items-center justify-center">
				<div className="flex flex-col">
					<h1 className="text-7xl font-bold">Title here</h1>
					<p className="text-3xl">paragraph here</p>
				</div>
			</div>
			{/* background gradient below content */}
		</div>
	);
}

export default Hero;
