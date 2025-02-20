"use client";
import { motion } from "motion/react";

export const Hero = () => {
	return (
		<motion.div initial={{ x: -9999 }} animate={{ x: 0 }} className="">
			<h1 className="font-montserrat text-6xl font-bold">Escaneou!</h1>
			<p>Que tal um QR Code?</p>
		</motion.div>
	);
};
