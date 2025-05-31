"use client";

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PropTypes {
	onPressButtonDetail: () => void;
	onPressButtonDelete?: () => void;
	hideButtonActivate?: boolean;
	hideButtonDelete?: boolean;
	isPendingActivate?: boolean;
}

const ButtonAction = ({ onPressButtonDetail, onPressButtonDelete, hideButtonDelete = false }: PropTypes) => {
	return (
		<TooltipProvider>
			<div className="flex items-center gap-2">
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
