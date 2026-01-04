"use client";

import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    EventInput,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

/* ------------------ Leave types & colors ------------------ */
const leaveTypes: Record<string, string> = {
    "Sick Leave": "danger",
    "Planned Leave": "success",
    "Optional Holiday": "primary",
    "Work From Home": "warning",
};

/* ------------------ Pending leaves ------------------ */
const pendingLeaves = [
    {
        label: "Sick Leave",
        count: 6,
        color: "bg-red-500",
        light: "bg-red-50",
    },
    {
        label: "Planned Leave",
        count: 12,
        color: "bg-green-500",
        light: "bg-green-50",
    },
    {
        label: "Optional Holiday",
        count: 2,
        color: "bg-blue-500",
        light: "bg-blue-50",
    },
];

interface CalendarEvent extends EventInput {
    extendedProps: {
        leaveType: string;
        reason?: string;
    };
}

/* ------------------ Date helpers (UTC SAFE) ------------------ */

// Inclusive → Exclusive
const toExclusiveEnd = (inclusiveEnd: string) => {
    const [y, m, d] = inclusiveEnd.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().split("T")[0];
};

// Exclusive → Inclusive
const toInclusiveEnd = (exclusiveEnd: string) => {
    const [y, m, d] = exclusiveEnd.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    date.setUTCDate(date.getUTCDate() - 1);
    return date.toISOString().split("T")[0];
};

const LeaveCalendar: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    const { isOpen, openModal, closeModal } = useModal();
    const calendarRef = useRef<FullCalendar>(null);

    const resetForm = () => {
        setSelectedEvent(null);
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
    };

    /* ------------------ Calendar handlers ------------------ */

    const handleDateSelect = (info: DateSelectArg) => {
        resetForm();
        setStartDate(info.startStr);
        setEndDate(toInclusiveEnd(info.endStr)); // FIXED
        openModal();
    };

    const handleEventClick = (info: EventClickArg) => {
        const evt = info.event;
        setSelectedEvent(evt);
        setLeaveType(evt.extendedProps.leaveType);
        setReason(evt.extendedProps.reason || "");
        setStartDate(evt.startStr);
        setEndDate(evt.endStr ? toInclusiveEnd(evt.endStr) : evt.startStr);
        openModal();
    };

    const handleSave = () => {
        if (!leaveType || !startDate || !endDate) {
            alert("Leave type, start date and end date are mandatory");
            return;
        }

        const exclusiveEnd = toExclusiveEnd(endDate);

        const newEvent: CalendarEvent = {
            id: selectedEvent?.id ?? Date.now().toString(),
            title: leaveType,
            start: startDate,
            end: exclusiveEnd,
            allDay: true,
            extendedProps: { leaveType, reason },
        };

        setEvents((prev) =>
            selectedEvent
                ? prev.map((e) => (e.id === selectedEvent.id ? newEvent : e))
                : [...prev, newEvent]
        );

        closeModal();
        resetForm();
    };

    /* ------------------ Event render ------------------ */

    const renderEventContent = (eventInfo: EventContentArg) => {
        const colorClass = `fc-bg-${leaveTypes[eventInfo.event.extendedProps.leaveType] || "primary"
            }`;

        return (
            <div className={`fc-event-main ${colorClass} p-1 rounded-md text-white`}>
                {eventInfo.event.title}
            </div>
        );
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Leave Calendar" />

            {/* ================= Leave Report Cards ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pendingLeaves.map((item) => (
                    <div
                        key={item.label}
                        className={`${item.light} rounded-xl p-6 shadow-sm border`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {item.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {item.count}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Remaining this year
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                            >
                                {item.count}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= Calendar ================= */}
            <div className="rounded-2xl border bg-white dark:bg-white/[0.03]">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next addEventButton",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    customButtons={{
                        addEventButton: {
                            text: "Add Leave +",
                            click: openModal,
                        },
                    }}
                    selectable
                    events={events}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                />
            </div>

            {/* ================= Modal ================= */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">
                        {selectedEvent ? "Edit Leave" : "Add Leave"}
                    </h2>

                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="">Select leave type</option>
                        {Object.keys(leaveTypes).map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason (optional)"
                        className="border rounded-lg px-3 py-2"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={closeModal}
                            className="border px-4 py-2 rounded-lg"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-brand-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LeaveCalendar;
