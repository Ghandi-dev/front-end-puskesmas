"use client";

import { Button } from "@/components/ui/button";
import { Eye, QrCode, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PropTypes {
	id?: string;
	onPressButtonDetail?: () => void;
	onPressButtonDelete?: () => void;
	hiddenButtonQR?: boolean;
	hideButtonDelete?: boolean;
	hiddenButtonDetail?: boolean;
	isPendingActivate?: boolean;
}

const ButtonAction = ({
	id,
	onPressButtonDetail,
	onPressButtonDelete,
	hideButtonDelete = false,
	hiddenButtonQR = false,
	hiddenButtonDetail = false,
}: PropTypes) => {
	return (
		<TooltipProvider>
			<div className="flex items-center gap-2">
				{!hiddenButtonQR && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" onClick={() => window.open(`/cetak-qr/${id}`, "_blank")}>
								<QrCode className="w-4 h-4 text-black" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" className="w-fit">
							<p>Cetak QR</p>
						</TooltipContent>
					</Tooltip>
				)}
				{!hiddenButtonDetail && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" onClick={onPressButtonDetail}>
								<Eye className="w-4 h-4 text-blue-600" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" className="w-fit">
							<p>Detail</p>
						</TooltipContent>
					</Tooltip>
				)}

				{!hideButtonDelete && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" onClick={onPressButtonDelete}>
								<Trash2 className="w-4 h-4 text-destructive" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" className="w-fit">
							<p>Hapus</p>
						</TooltipContent>
					</Tooltip>
				)}
			</div>
		</TooltipProvider>
	);
};

export default ButtonAction;
