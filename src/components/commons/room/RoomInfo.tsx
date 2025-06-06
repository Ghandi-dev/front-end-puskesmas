import { FC } from "react";
import { CalendarClock, UserCheck, UserCog } from "lucide-react";
import { format } from "date-fns";
import { RoomSelected } from "@/types/Room";

interface RoomInfoProps {
	room: RoomSelected;
}

export const RoomInfo: FC<RoomInfoProps> = ({ room }) => {
	return (
		<div className="grid gap-4 mt-4">
			<div className="flex items-start gap-3">
				<UserCheck className="text-primary w-5 h-5 mt-1" />
				<div>
					<p className="text-sm text-muted-foreground">Dibuat oleh</p>
					<p className="font-medium text-base">{room?.createdBy?.fullname}</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<UserCog className="text-primary w-5 h-5 mt-1" />
				<div>
					<p className="text-sm text-muted-foreground">Terakhir diperbarui oleh</p>
					<p className="font-medium text-base">{room?.updatedBy?.fullname}</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<CalendarClock className="text-primary w-5 h-5 mt-1" />
				<div>
					<p className="text-sm text-muted-foreground">Dibuat pada</p>
					<p className="text-base">{room?.createdAt ? format(new Date(room.createdAt), "dd MMMM yyyy HH:mm") : "Tidak tersedia"}</p>
				</div>
			</div>

			<div className="flex items-start gap-3">
				<CalendarClock className="text-primary w-5 h-5 mt-1" />
				<div>
					<p className="text-sm text-muted-foreground">Diperbarui pada</p>
					<p className="text-base">{room?.updatedAt ? format(new Date(room.updatedAt), "dd MMMM yyyy HH:mm") : "Tidak tersedia"}</p>
				</div>
			</div>
		</div>
	);
};
