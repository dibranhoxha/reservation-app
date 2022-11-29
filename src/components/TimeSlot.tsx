import React from "react";
import {
  HighlightedSelectedCompanyTimeSlot,
  ReservationTimesType,
} from "../types";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setReservation } from "../redux/timeSlots-slice";
import { dateRangeOverlaps } from "../utility/helper";

const checkIsDisabled = (
  reservationTimes: ReservationTimesType,
  s_time: string,
  e_time: string,
  companyId: number
) => {
  return Object.entries(reservationTimes).some(
    ([key, { start_time, end_time }]) =>
      key !== companyId.toString() &&
      dateRangeOverlaps(start_time, end_time, s_time, e_time)
  );
};

const TimeSlot = ({
  start_time,
  end_time,
  companyId,
  highlighted,
}: HighlightedSelectedCompanyTimeSlot) => {
  const dispatch = useAppDispatch();
  const { reservationTimes } = useAppSelector((state) => state.timeSlots);

  const selectReservationTime = (
    start_time: string,
    end_time: string,
    companyId: number
  ) => {
    dispatch(setReservation({ start_time, end_time, companyId }));
  };

  return (
    <button
      className={`h-24 my-2 bg-gradient-to-r from-amber-100 to-fuchsia-50 flex justify-center items-center p-3 rounded-xl border-2 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative disabled:opacity-25 ${
        highlighted ? "border-slate-800" : "border-slate-100"
      }`}
      onClick={() => selectReservationTime(start_time, end_time, companyId)}
      disabled={checkIsDisabled(
        reservationTimes,
        start_time,
        end_time,
        companyId
      )}
    >
      <div className="text-slate-800 text-center">
        <div>
          {moment(start_time).format("LLLL")} -{" "}
          {moment(end_time).format("LLLL")}
        </div>
      </div>
    </button>
  );
};

export default TimeSlot;
