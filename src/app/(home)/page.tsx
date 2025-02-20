import { Form } from "./components/Form";
import { Hero } from "./components/Hero";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center gap-4 text-center">
			<Hero />
			<Form />
		</main>
	);
}
