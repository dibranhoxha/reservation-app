import { useAppSelector } from "../hooks";
import { Timeslot } from "../types";
import TimeSlot from "./TimeSlot";
import { checkTimeSlotIsSelected } from "../utility/helper";

type Timeslots = Timeslot[];

const TimeSlotsList = ({
  time_slots,
  companyId,
}: {
  time_slots: Timeslots;
  companyId: number;
}) => {
  const { reservationTimes } = useAppSelector((state) => state.timeSlots);
  return (
    <div className="bg-white flex flex-col overflow-auto whitespace-no-wrap py-3 px-4 text-center h-96">
      {time_slots?.map(({ start_time, end_time }, idx) => (
        <TimeSlot
          key={idx}
          start_time={start_time}
          end_time={end_time}
          companyId={companyId}
          highlighted={checkTimeSlotIsSelected(
            start_time,
            end_time,
            reservationTimes[companyId]
          )}
        />
      ))}
    </div>
  );
};

export default TimeSlotsList;
