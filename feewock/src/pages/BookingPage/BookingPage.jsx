import React, { useState } from 'react'
import Layouts from '../../layouts/Layouts'
import {
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
  import { format } from "date-fns";
  import { DayPicker } from "react-day-picker";
  import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
   

function BookingPage() {
    const [date, setDate] = useState()
  return (
    <Layouts>
    
        <div className="w-screen">
    <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-custom-blue py-32 text-center shadow-xl shadow-gray-300">
        <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book an appointment</h1>
        <p className="mt-6 text-lg text-white">Get an appointment with our experienced Employee</p>
        <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="" alt="" />
    </div>

    <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
     

        <div className="p-24">
        <Popover placement="bottom">
            <PopoverHandler>
            <Input
                label="Select a Date"
                onChange={() => null}
                value={date ? format(date, "PPP") : ""}
            />
            </PopoverHandler>
            <PopoverContent>
            <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="border-0"
                classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
                }}
                components={{
                IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                }}
            />
            </PopoverContent>
        </Popover>
        </div>


        <button className="mt-8 w-56 rounded-full border-8  bg-custom-blue px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">Book Now</button>
    </div>
    </div>

    </Layouts>
  )
}

export default BookingPage
