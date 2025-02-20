"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	FaDownload,
	FaSearch,
	FaClipboard,
	FaTelegramPlane,
	FaFacebookF,
	FaTwitter,
} from "react-icons/fa";

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

	const onSubmit = (data: FormData) => {
		setSearch(data.content);
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

	const ShareQRCode = ({ platform }: { platform: string }) => {
		const platformLinks: Record<string, string> = {
			telegram: `https://t.me/share/url?url=${encodeURIComponent(qrCodeUrl)}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				qrCodeUrl
			)}`,
			twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				`Check out this QR Code: ${qrCodeUrl}`
			)}`,
		};

		const platformIcon: Record<string, React.ReactNode> = {
			telegram: <FaTelegramPlane />,
			facebook: <FaFacebookF />,
			twitter: <FaTwitter />,
		};

		return (
			<a
				href={platformLinks[platform]}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				{platformIcon[platform]}
			</a>
		);
	};

	return (
		<>
			{search === contentField && search !== "" && (
				<div>
					<img
						className="shadow-lg p-4 bg-white rounded"
						src={qrCodeUrl}
						alt="qrcode"
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
						<ShareQRCode platform="telegram" />
						<ShareQRCode platform="facebook" />
						<ShareQRCode platform="twitter" />
					</div>
				</div>
			)}

			<form
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
					<button className="p-6" type="submit">
						<FaSearch />
					</button>
				</div>
				{errors.content && (
					<p className="text-red-600 text-sm p-1">{errors.content.message}</p>
				)}
			</form>
		</>
	);
};
