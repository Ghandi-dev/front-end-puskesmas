"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

import { Spinner } from "@/components/ui/spinner";

interface AlertDialogUpdateProps {
	onClickUpdate: () => void;
	title: string;
	description: string;
	triggerLabel?: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	isLoading?: boolean;
}

const AlertDialogUpdate = ({ onClickUpdate, title, description, open, onOpenChange, isLoading = false }: AlertDialogUpdateProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<Image src="/illustrations/undraw_notify_rnwe.svg" alt="warning" width={200} height={200} className="mx-auto" />
					<AlertDialogDescription className="text-center">{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => onOpenChange(false)}>Batal</AlertDialogCancel>
					<AlertDialogAction onClick={onClickUpdate} disabled={isLoading}>
						{isLoading ? <Spinner size="small" /> : "Lanjutkan"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertDialogUpdate;
