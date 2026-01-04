"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

/* ---------------- TYPES ---------------- */

type EntryType = "WORK" | "LEAVE" | "HOLIDAY";

type Status = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

interface DayEntry {
    id: string;
    project: string;
    type: EntryType;
    hours: number;
    notes: string;
}

interface WeeklyTimesheet {
    weekStart: string;
    status: Status;
    entries: Record<string, DayEntry[]>;
}

/* ---------------- MOCK DATA ---------------- */

const projects = ["None", "Project Alpha", "Project Beta", "Internal Tool"];

const today = new Date();

/* ---------------- HELPERS ---------------- */

const startOfWeek = (date: Date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
};

const formatDate = (d: Date) => d.toISOString().split("T")[0];

const addDays = (d: Date, days: number) => {
    const nd = new Date(d);
    nd.setDate(nd.getDate() + days);
    return nd;
};

/* ---------------- COMPONENT ---------------- */

export default function TimesheetPage() {
    const [weekStart, setWeekStart] = useState(startOfWeek(today));
    const [timesheet, setTimesheet] = useState<WeeklyTimesheet>({
        weekStart: formatDate(startOfWeek(today)),
        status: "DRAFT",
        entries: {},
    });

    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const isEditable = timesheet.status === "DRAFT";
    const isFutureWeek = weekStart > startOfWeek(today);

    /* ---------------- WEEK DAYS ---------------- */

    const days = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => {
            const d = addDays(weekStart, i);
            return {
                label: d.toLocaleDateString("en-US", { weekday: "short" }),
                date: formatDate(d),
                day: d.getDate(),
            };
        });
    }, [weekStart]);

    /* ---------------- ENTRY ACTIONS ---------------- */

    const addEntry = (date: string) => {
        if (!isEditable) return;

        setTimesheet((prev) => ({
            ...prev,
            entries: {
                ...prev.entries,
                [date]: [
                    ...(prev.entries[date] || []),
                    {
                        id: crypto.randomUUID(),
                        project: "None",
                        type: "WORK",
                        hours: 8,
                        notes: "",
                    },
                ],
            },
        }));
    };

    const updateEntry = (
        date: string,
        id: string,
        field: keyof DayEntry,
        value: any
    ) => {
        setTimesheet((prev) => ({
            ...prev,
            entries: {
                ...prev.entries,
                [date]: prev.entries[date].map((e) =>
                    e.id === id ? { ...e, [field]: value } : e
                ),
            },
        }));
    };

    const deleteEntry = (date: string, id: string) => {
        setTimesheet((prev) => ({
            ...prev,
            entries: {
                ...prev.entries,
                [date]: prev.entries[date].filter((e) => e.id !== id),
            },
        }));
    };

    /* ---------------- SUBMIT ---------------- */

    const submitWeek = () => {
        if (isFutureWeek || !isEditable) return;
        setTimesheet((prev) => ({ ...prev, status: "SUBMITTED" }));
    };

    /* ---------------- NAVIGATION ---------------- */

    const changeWeek = (dir: number) => {
        const newWeek = addDays(weekStart, dir * 7);
        setWeekStart(newWeek);
        setTimesheet({
            weekStart: formatDate(newWeek),
            status: "DRAFT",
            entries: {},
        });
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="p-6">
            <PageBreadcrumb pageTitle="Timesheet" />

            {/* STATUS BAR */}
            <div className="flex justify-between items-center mb-4">
                <div
                    className={`px-4 py-1 rounded-full text-sm font-medium ${timesheet.status === "DRAFT"
                            ? "bg-gray-200"
                            : timesheet.status === "SUBMITTED"
                                ? "bg-blue-200"
                                : timesheet.status === "APPROVED"
                                    ? "bg-green-200"
                                    : "bg-red-200"
                        }`}
                >
                    {timesheet.status}
                </div>

                <button
                    disabled={!isEditable || isFutureWeek}
                    onClick={submitWeek}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
                >
                    Submit Week
                </button>
            </div>

            {/* WEEK HEADER */}
            <div className="flex items-center justify-between mb-4">
                <ChevronLeft onClick={() => changeWeek(-1)} className="cursor-pointer" />
                <h2 className="font-semibold">
                    Week of {weekStart.toDateString()}
                </h2>
                <ChevronRight
                    onClick={() => !isFutureWeek && changeWeek(1)}
                    className={`cursor-pointer ${isFutureWeek ? "opacity-30" : ""
                        }`}
                />
            </div>

            {/* CALENDAR GRID */}
            <div className="grid grid-cols-7 border rounded-lg overflow-hidden">
                {days.map((d) => (
                    <div
                        key={d.date}
                        onClick={() => isEditable && setSelectedDate(d.date)}
                        className="h-32 border p-2 cursor-pointer hover:bg-gray-50"
                    >
                        <div className="font-medium text-sm mb-1">
                            {d.label} {d.day}
                        </div>

                        {(timesheet.entries[d.date] || []).map((e) => (
                            <div
                                key={e.id}
                                className={`text-xs px-2 py-1 rounded mb-1 ${e.type === "WORK"
                                        ? "bg-blue-100"
                                        : e.type === "LEAVE"
                                            ? "bg-yellow-100"
                                            : "bg-purple-100"
                                    }`}
                            >
                                {e.project} ({e.type})
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* DAY MODAL */}
            <Modal
                isOpen={!!selectedDate}
                onClose={() => setSelectedDate(null)}
                className="max-w-lg p-6"
            >
                {selectedDate && (
                    <>
                        <h3 className="font-semibold mb-3">{selectedDate}</h3>

                        {(timesheet.entries[selectedDate] || []).map((e) => (
                            <div key={e.id} className="border rounded p-3 mb-3 space-y-2">
                                <select
                                    value={e.project}
                                    disabled={!isEditable}
                                    onChange={(ev) =>
                                        updateEntry(selectedDate, e.id, "project", ev.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                >
                                    {projects.map((p) => (
                                        <option key={p}>{p}</option>
                                    ))}
                                </select>

                                <select
                                    value={e.type}
                                    disabled={!isEditable}
                                    onChange={(ev) =>
                                        updateEntry(selectedDate, e.id, "type", ev.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                >
                                    <option value="WORK">Working</option>
                                    <option value="LEAVE">Leave</option>
                                    <option value="HOLIDAY">Holiday</option>
                                </select>

                                <input
                                    type="number"
                                    value={e.type === "WORK" ? e.hours : 0}
                                    disabled={!isEditable || e.type !== "WORK"}
                                    onChange={(ev) =>
                                        updateEntry(
                                            selectedDate,
                                            e.id,
                                            "hours",
                                            Number(ev.target.value)
                                        )
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />

                                <input
                                    value={e.notes}
                                    disabled={!isEditable}
                                    onChange={(ev) =>
                                        updateEntry(selectedDate, e.id, "notes", ev.target.value)
                                    }
                                    placeholder="Notes"
                                    className="w-full border rounded px-2 py-1"
                                />

                                {isEditable && (
                                    <Trash2
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => deleteEntry(selectedDate, e.id)}
                                    />
                                )}
                            </div>
                        ))}

                        {isEditable && (
                            <button
                                onClick={() => addEntry(selectedDate)}
                                className="flex items-center gap-2 text-blue-600"
                            >
                                <Plus size={16} /> Add Entry
                            </button>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
}
