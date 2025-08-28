"use client";
import { useState } from "react";
import { DateRange } from "react-date-range";
import type { RangeKeyDict, Range } from "react-date-range";
import { format } from "date-fns";
import { IconRenderer } from "../IconRenderer";

export type DateRangeValue = {
  startDate: string;
  endDate: string;
};

interface DateRangePickerProps {
  defaultRange?: Range;
  onApply: (value: DateRangeValue) => void;
  isDisabled?: boolean;
}

export default function DateRangePicker({
  defaultRange,
  onApply,
  isDisabled = false,
}: DateRangePickerProps) {
    const [range, setRange] = useState<Range[]>([
        defaultRange ?? {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [isSelect, setIsSelect] = useState<string>("selection")
    const [showPicker, setShowPicker] = useState<boolean>(false); // 👉 kontrol tampilan date picker

    const handleApply = () => {
        const start = format(range[0]?.startDate ?? new Date(), "yyyy-MM-dd");
        const end = format(range[0]?.endDate ?? new Date(), "yyyy-MM-dd");
        if(start == end){
            console.log("Invalid date range selected")
            return
        }
        onApply({ startDate: start, endDate: end });
        setIsSelect("reset")
        setShowPicker(false); // hide after apply
    };

    const handleChange = (item: RangeKeyDict) => {
        if (item.selection) {
            setRange([item.selection]);
        }
    };

    const handleReset = () => {
        const resetVal = {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        };
        setRange([resetVal]);
        onApply({
            startDate: format(resetVal.startDate, "yyyy-MM-dd"),
            endDate: format(resetVal.endDate, "yyyy-MM-dd"),
        });
        setIsSelect("selection")
        setShowPicker(false); // hide after apply
    };

    return (
        <div className={`p-4 ` + (showPicker ? "bg-background dark:bg-gray-700 rounded shadow-md w-full max-w-md" : "")}>
        {isDisabled ? (
            <div className="text-gray-500">Date Range Picker is disabled</div>
        ) : (
            <>
            {!showPicker && (
                <button
                    className="px-4 py-2 bg-background dark:bg-indigo-600 rounded hover:bg-gray-300 dark:text-background text-sm cursor-pointer"
                    onClick={() => setShowPicker(true)}
                >
                    <IconRenderer
                        lib="bs"
                        name="BsCalendar2Date"
                        size={16}
                        className="inline mr-3 mb-1"
                    />
                    Pilih Tanggal
                </button>
            )}

            {showPicker && (
                <div className="mt-4">
                <DateRange
                    editableDateInputs
                    onChange={handleChange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    rangeColors={["#2563eb"]}
                    
                />
                <div className="flex justify-end gap-4 mt-2">
                    <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm cursor-pointer"
                    onClick={() => setShowPicker(false)}
                    >
                    Batal
                    </button>
                    {isSelect == "reset" ? (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 text-sm cursor-pointer"
                        >
                            Reset
                        </button>
                        ) : (
                        <button
                            type="button"
                            onClick={handleApply}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 text-sm cursor-pointer"
                        >
                            Apply
                        </button>
                    )}
                </div>
                </div>
            )}
            </>
        )}
        </div>
    );
}
