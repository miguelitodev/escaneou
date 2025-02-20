import { Form } from "./components/Form";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center gap-4 text-center">
			<div className="">
				<h1 className="font-montserrat text-6xl font-bold">Escaneou!</h1>
				<p>Que tal um QR Code?</p>
			</div>

			<Form />
		</main>
	);
}
