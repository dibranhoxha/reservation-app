import { bindActionCreators, createSlice, current } from "@reduxjs/toolkit";
import { Timeslot, SelectedCompanyTimeSlot, InitialStateType } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { checkTimeSlotIsSelected } from "../utility/helper";

const initialState: InitialStateType = {
  reservationTimes: {},
};

const timeSlotsSlice = createSlice({
  name: "timeslots",
  initialState,
  reducers: {
    setReservation(state, action: PayloadAction<SelectedCompanyTimeSlot>) {
      if (
        !checkTimeSlotIsSelected(
          state.reservationTimes[action.payload.companyId]?.start_time,
          state.reservationTimes[action.payload.companyId]?.end_time,
          action.payload
        )
      ) {
        state.reservationTimes[action.payload.companyId] = action.payload;
        return;
      }
      delete state.reservationTimes[action.payload.companyId];
    },
  },
});

export const { setReservation } = timeSlotsSlice.actions;

export default timeSlotsSlice.reducer;
