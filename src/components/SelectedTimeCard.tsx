import React from "react";
import { InitialStateType } from "../types";
import moment from "moment";
import { useAppSelector } from "../hooks";

const SelectedTimeCard = ({ companyId }: { companyId: number }) => {
  const { reservationTimes } = useAppSelector((state) => state.timeSlots);
  const selectedTime = reservationTimes[companyId];

  return (
    <div className="h-24 my-4 bg-gradient-to-r from-amber-200 to-fuchsia-50 flex justify-center items-center p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
      {selectedTime ? (
        <div className="text-slate-800 text-center">
          {moment(selectedTime?.start_time).format("LLLL")} -{" "}
          {moment(selectedTime?.end_time).format("LLLL")}
        </div>
      ) : (
        "Doesn't have any time selected yet!"
      )}
    </div>
  );
};

export default SelectedTimeCard;
