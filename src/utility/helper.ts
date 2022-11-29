import moment from "moment";
import { Timeslot } from "../types";

export const checkTimeSlotIsSelected = (
  start_time: string,
  end_time: string,
  reservationTimeSlot: Timeslot
) => {
  return (
    moment(reservationTimeSlot?.start_time).isSame(start_time) &&
    moment(reservationTimeSlot?.end_time).isSame(end_time)
  );
};

export const dateRangeOverlaps = (
  a_start: string,
  a_end: string,
  b_start: string,
  b_end: string
) => {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
};
