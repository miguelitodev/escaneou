"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDownload, FaSearch, FaClipboard } from "react-icons/fa";
import { ShareQRCode } from "./ShareQRCode";
import Image from "next/image";
import { useReward } from "react-rewards";
import { motion } from "motion/react";

type FormData = {
	content: string;
};

export const Form = () => {
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const contentField = watch("content");
	const [search, setSearch] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { reward, isAnimating } = useReward("rewardId", "confetti");

	const onSubmit = (data: FormData) => {
		reward();
		setIsLoading(true);
		setSearch(data.content);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const downloadQRCode = async () => {
		const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${search}`;
		const response = await fetch(qrCodeUrl);
		const blob = await response.blob();
		const link = document.createElement("a");

		const urlBlob = URL.createObjectURL(blob);
		link.href = urlBlob;
		link.download = `qrcode-${search}.png`;
		link.click();
		URL.revokeObjectURL(urlBlob);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(
			`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${search}`
		);
		alert("QR Code link copied to clipboard!");
	};

	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${search}`;

	return (
		<>
			{search === contentField && search !== "" && (
				<div>
					{!isLoading && (
						<motion.div initial={{ x: 100 }} animate={{ x: 0 }}>
							<Image
								className="shadow-lg p-4 mx-auto bg-white rounded"
								src={qrCodeUrl}
								alt="qrcode"
								width={250}
								height={250}
							/>
							<div className="flex gap-4 mt-4">
								<button
									onClick={downloadQRCode}
									className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
								>
									<FaDownload />
								</button>
								<button
									onClick={handleCopy}
									className="flex items-center gap-2 p-4 bg-green-500 text-white rounded-md hover:bg-green-600"
								>
									<FaClipboard />
								</button>
								<ShareQRCode platform="telegram" qrCodeUrl={qrCodeUrl} />
								<ShareQRCode platform="facebook" qrCodeUrl={qrCodeUrl} />
								<ShareQRCode platform="twitter" qrCodeUrl={qrCodeUrl} />
							</div>
						</motion.div>
					)}

					{isLoading && (
						<svg
							aria-hidden="true"
							className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-gray-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
					)}
				</div>
			)}

			<motion.form
				initial={{ x: 9999 }}
				animate={{ x: 0 }}
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center"
			>
				<div
					className={`bg-white rounded flex justify-between items-center shadow-sm ${
						errors.content ? "shadow-red-400 shadow-2xl" : ""
					}`}
				>
					<input
						className="p-4 outline-none"
						type="text"
						id="content"
						{...register("content", { required: "E necessário digitar algo" })}
					/>
					<button className="p-6" type="submit" disabled={isAnimating}>
						<FaSearch />
						<span id="rewardId" />
					</button>
				</div>
				{errors.content && (
					<p className="text-red-600 text-sm p-1">{errors.content.message}</p>
				)}
			</motion.form>
		</>
	);
};
