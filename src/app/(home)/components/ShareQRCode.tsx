import { FaTelegramPlane, FaFacebookF, FaTwitter } from "react-icons/fa";

type Platform = "telegram" | "facebook" | "twitter";

interface ShareQRCodeProps {
	platform: Platform;
	qrCodeUrl: string;
}

export const ShareQRCode = ({ platform, qrCodeUrl }: ShareQRCodeProps) => {
	const platformLinks: Record<Platform, string> = {
		telegram: `https://t.me/share/url?url=${encodeURIComponent(qrCodeUrl)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			qrCodeUrl
		)}`,
		twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			`Check out this QR Code: ${qrCodeUrl}`
		)}`,
	};

	const platformIcon: Record<Platform, React.ReactNode> = {
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
