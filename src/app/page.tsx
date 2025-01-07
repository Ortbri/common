export default function Home() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<a
				href="/testing"
				className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
			>
				Testing route
			</a>
		</div>
	);
}
