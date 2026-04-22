"use client";

import { Download, Star, Package, Calendar, Clock, MapPin } from "lucide-react";
import ReviewModal from "./ReviewModal";
import { useState } from "react";

interface Booking {
  id: string;
  instituteName: string;
  status: "Completed" | "Pending" | "Cancelled";
  bookingId: string;
  amount: number;
  treatmentType: string;
  treatmentDates: string;
  selectedShift: string;
  location: string;
}

const bookings: Booking[] = [
  {
    id: "1",
    instituteName: "City Health Institute",
    status: "Completed",
    bookingId: "BK-2024-1234",
    amount: 450.0,
    treatmentType: "Dialysis HD",
    treatmentDates: "Dec 15, 2024 - Dec 22, 2024",
    selectedShift: "Morning",
    location: "New York, NY",
  },
  {
    id: "2",
    instituteName: "City Health Institute",
    status: "Completed",
    bookingId: "BK-2024-1234",
    amount: 450.0,
    treatmentType: "Dialysis HD",
    treatmentDates: "Dec 15, 2024 - Dec 22, 2024",
    selectedShift: "Morning",
    location: "New York, NY",
  },
];

const statusStyles: Record<Booking["status"], string> = {
  Completed: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};

const BookingCard = ({ booking }: { booking: Booking }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-6 py-5">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-gray-800">{booking.instituteName}</h3>
          <span
            className={`text-xs font-medium px-3 py-0.5 rounded-full ${statusStyles[booking.status]}`}
          >
            {booking.status}
          </span>
        </div>
        <span className="text-base font-semibold text-gray-800">
          ${booking.amount.toFixed(2)}
        </span>
      </div>

      {/* Booking ID */}
      <p className="text-xs text-gray-400 mb-5">Booking ID: {booking.bookingId}</p>

      {/* Info Grid */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {/* Treatment Type */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Package className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Treatment Type</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{booking.treatmentType}</p>
        </div>

        {/* Treatment Dates */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Treatment Dates</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{booking.treatmentDates}</p>
        </div>

        {/* Selected Shift */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Selected Shift</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{booking.selectedShift}</p>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Location</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{booking.location}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4" />

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-xs bg-gray-300 text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Download Receipt
        </button>
         <button
                onClick={() => {
                  setSelectedBooking(booking);
                  setOpenModal(true);
                }}
                className="flex items-center gap-1.5 text-xs bg-gray-300 text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <Star size={14} /> Review
              </button>
      </div>
      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          console.log("Review Submitted:", {
            booking: selectedBooking,
            ...data,
          });
        }}
      />
    </div>
  );
};

const BookingHistory = () => {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-3xl bg-gray-100">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingHistory;