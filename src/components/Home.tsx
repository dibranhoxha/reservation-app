import React from "react";
import { usePromiseGetAll } from "../hooks/usePromise";
import { Company, Timeslot, GroupedTimeSlots } from "../types/index";
import CompanyCard from "./CompanyCard";
import SelectedTimeCard from "./SelectedTimeCard";
import TimeSlotsList from "./TimeSlotsList";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "../hooks/index";
import { useGetCompaniesQuery } from "../services/companies";

const api = import.meta.env.VITE_BASE_URL;

const groupTimeSlotsByDay = (time_slots: Timeslot[]) => {
  return time_slots?.reduce((acc: any, curr: any) => {
    const weekday = `${moment(curr.start_time).format("dddd")}`;

    if (!acc[weekday]) {
      acc[weekday] = [];
    }

    acc[weekday].push(curr);

    return acc;
  }, {});
};

const sortTimeSlots = (time_slots: Timeslot[]) => {
  return time_slots?.sort((a, b) => a.start_time.localeCompare(b.start_time));
};

const Home = () => {
  const { data = [], isLoading: companiesLoading } = useGetCompaniesQuery();

  // const companiesConfig = {
  //   initialData: {
  //     data: [],
  //   },
  // };

  // const { data, isFetching: companiesLoading } = usePromiseGetAll(
  //   "companies",
  //   `${api}/companies`,
  //   companiesConfig
  // );

  let timeSlots: GroupedTimeSlots;

  if (data.length) {
    const [all_time_slots] = data?.map(
      (company: Company) => company.time_slots
    );
    let sortedTimeSlots = sortTimeSlots([...all_time_slots]);
    timeSlots = groupTimeSlotsByDay(sortedTimeSlots);
  }

  return (
    <div className="px-6 pb-6 flex justify-center">
      {!companiesLoading && (
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8 h-auto">
          {data.map(({ id, name, type }: Company) => (
            <div key={id} className="rounded">
              <CompanyCard name={name} />
              <SelectedTimeCard companyId={id} />
              {Object.keys(timeSlots)?.map((day) => (
                <div key={day}>
                  <div className="bg-white whitespace-no-wrap px-4 text-center py-3">
                    {day}
                  </div>
                  <TimeSlotsList time_slots={timeSlots[day]} companyId={id} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {companiesLoading && (
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        ></div>
      )}
    </div>
  );
};

export default Home;
