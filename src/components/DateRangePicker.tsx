import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isAfter, isBefore, isEqual, addDays, subDays } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { start: Date; end: Date }) => void;
}

const presets = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: 1 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: startDate,
    to: endDate
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = days === 0 ? end : subDays(end, days);
    setSelectedRange({ from: start, to: end });
    onChange({ start, end });
    setIsOpen(false);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setSelectedRange(range);
      onChange({ start: range.from, end: range.to });
    }
  };

  const formatDateRange = () => {
    if (!selectedRange.from || !selectedRange.to) {
      return 'Select date range';
    }

    if (isEqual(selectedRange.from, selectedRange.to)) {
      return format(selectedRange.from, 'MMM d, yyyy');
    }

    return `${format(selectedRange.from, 'MMM d, yyyy')} - ${format(selectedRange.to, 'MMM d, yyyy')}`;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
      >
        <CalendarIcon size={16} />
        <span>{formatDateRange()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 grid grid-cols-[200px_1fr] gap-4">
            {/* Presets */}
            <div className="border-r pr-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Select</h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetClick(preset.days)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="p-2">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
                numberOfMonths={2}
                showOutsideDays
                className="rdp-custom"
                modifiersClassNames={{
                  selected: 'bg-primary-600 text-white hover:bg-primary-700',
                  today: 'font-bold',
                }}
                components={{
                  IconLeft: () => <ChevronLeft size={16} />,
                  IconRight: () => <ChevronRight size={16} />,
                }}
              />
            </div>
          </div>

          <div className="border-t p-4 bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedRange.from && selectedRange.to) {
                  onChange({ start: selectedRange.from, end: selectedRange.to });
                }
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
};