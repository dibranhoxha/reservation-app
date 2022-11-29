export interface Timeslot {
  start_time: string;
  end_time: string;
}

export interface SelectedCompanyTimeSlot extends Timeslot {
  companyId: number;
}

export interface HighlightedSelectedCompanyTimeSlot
  extends SelectedCompanyTimeSlot {
  highlighted: boolean;
}

export type Company = {
  id: number;
  name: string;
  type: string;
  time_slots: Timeslot[];
};

export type GroupedTimeSlots = {
  [key: string]: Timeslot[];
};

export type ReservationTimesType = {
  [key: string]: {
    start_time: string;
    end_time: string;
  };
};

export type InitialStateType = {
  reservationTimes: ReservationTimesType;
};
