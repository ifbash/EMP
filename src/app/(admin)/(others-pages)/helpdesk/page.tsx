"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

/* ================= TYPES ================= */

type Status =
    | "Draft"
    | "Submitted"
    | "In Progress"
    | "On Hold"
    | "Resolved"
    | "Rejected";

type Priority = "Low" | "Medium" | "High" | "Critical";
type Source = "Web" | "Chat" | "Integration" | "Email";

interface TimelineItem {
    status: Status;
    user: string;
    time: string;
}

interface Ticket {
    id: number;
    summary: string;
    description: string;
    status: Status;
    priority: Priority;
    category: string;
    subcategory: string;
    assignmentGroup: string;
    assignedTo: string;
    caller: string;
    ci: string;
    source: Source;
    createdAt: string;
    timeline: TimelineItem[];
}

/* ================= CONSTANTS ================= */

const STATUS: Status[] = [
    "Draft",
    "Submitted",
    "In Progress",
    "On Hold",
    "Resolved",
    "Rejected",
];

const PRIORITY: Priority[] = ["Low", "Medium", "High", "Critical"];

const GROUP_USERS: Record<string, string[]> = {
    IT: ["John", "Alice"],
    HR: ["Priya"],
    Finance: ["David"],
};

const CATEGORY_MAP: Record<string, string[]> = {
    IT: ["Hardware", "Software", "Access"],
    HR: ["Payroll", "Leave"],
    Finance: ["Invoice", "Reimbursement"],
};

const CI_LIST = ["Laptop", "VPN", "Email", "Payroll"];

/* ================= COLORS ================= */

const STATUS_COLOR: Record<Status, string> = {
    Draft: "bg-gray-100 text-gray-700",
    Submitted: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "On Hold": "bg-orange-100 text-orange-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
};

const PRIORITY_COLOR: Record<Priority, string> = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
};

/* ================= UI HELPERS ================= */

function Badge({
    children,
    color,
}: {
    children: React.ReactNode;
    color: string;
}) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {children}
        </span>
    );
}

/* ================= PAGE ================= */

export default function HelpDeskPage() {
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [editTicket, setEditTicket] = useState<Ticket | null>(null);

    /* ===== FILTER STATE ===== */
    const [filters, setFilters] = useState({
        status: "",
        priority: "",
        assignmentGroup: "",
        assignedTo: "",
        caller: "",
    });

    /* ===== PAGINATION ===== */
    const pageSize = 5;
    const [page, setPage] = useState(1);

    /* ===== FILTER LOGIC ===== */
    const filteredTickets = useMemo(() => {
        return tickets.filter((t) => {
            return (
                (!filters.status || t.status === filters.status) &&
                (!filters.priority || t.priority === filters.priority) &&
                (!filters.assignmentGroup ||
                    t.assignmentGroup === filters.assignmentGroup) &&
                (!filters.assignedTo || t.assignedTo === filters.assignedTo) &&
                (!filters.caller ||
                    t.caller.toLowerCase().includes(filters.caller.toLowerCase()))
            );
        });
    }, [tickets, filters]);

    /* ===== PAGINATED DATA ===== */
    const totalPages = Math.ceil(filteredTickets.length / pageSize);
    const paginatedTickets = filteredTickets.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <PageBreadcrumb pageTitle="Help Desk" />
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold"></h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setEditTicket(createEmptyTicket())}
                >
                    New Ticket
                </button>
            </div>

            {/* FILTERS */}
            <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-5 gap-3">
                <select
                    className="border rounded px-3 py-2"
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                    }
                >
                    <option value="">All Status</option>
                    {STATUS.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>

                <select
                    className="border rounded px-3 py-2"
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters({ ...filters, priority: e.target.value })
                    }
                >
                    <option value="">All Priority</option>
                    {PRIORITY.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>

                <select
                    className="border rounded px-3 py-2"
                    value={filters.assignmentGroup}
                    onChange={(e) =>
                        setFilters({ ...filters, assignmentGroup: e.target.value })
                    }
                >
                    <option value="">All Groups</option>
                    {Object.keys(GROUP_USERS).map((g) => (
                        <option key={g}>{g}</option>
                    ))}
                </select>

                <select
                    className="border rounded px-3 py-2"
                    value={filters.assignedTo}
                    onChange={(e) =>
                        setFilters({ ...filters, assignedTo: e.target.value })
                    }
                >
                    <option value="">Assigned To</option>
                    {Object.values(GROUP_USERS)
                        .flat()
                        .map((u) => (
                            <option key={u}>{u}</option>
                        ))}
                </select>

                <input
                    className="border rounded px-3 py-2"
                    placeholder="Caller"
                    value={filters.caller}
                    onChange={(e) =>
                        setFilters({ ...filters, caller: e.target.value })
                    }
                />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded shadow">
                <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Summary</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Priority</th>
                            <th className="p-3">Group</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTickets.map((t) => (
                            <tr key={t.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{t.id}</td>

                                <td
                                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => router.push(`/helpdesk/${t.id}`)}
                                >
                                    {t.summary}
                                </td>

                                <td className="p-3">
                                    <Badge color={STATUS_COLOR[t.status]}>{t.status}</Badge>
                                </td>

                                <td className="p-3">
                                    <Badge color={PRIORITY_COLOR[t.priority]}>
                                        {t.priority}
                                    </Badge>
                                </td>

                                <td className="p-3">{t.assignmentGroup}</td>

                                <td className="p-3">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => setEditTicket(t)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedTickets.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No tickets found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex justify-between items-center p-4">
                    <span className="text-sm text-gray-600">
                        Page {page} of {totalPages || 1}
                    </span>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <button
                            disabled={page === totalPages || totalPages === 0}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {editTicket && (
                <EditModal
                    ticket={editTicket}
                    onClose={() => setEditTicket(null)}
                    onSave={(updated) => {
                        setTickets((prev) =>
                            prev.some((p) => p.id === updated.id)
                                ? prev.map((p) => (p.id === updated.id ? updated : p))
                                : [...prev, updated]
                        );
                        setEditTicket(null);
                    }}
                />
            )}
        </div>
    );
}

/* ================= MODAL ================= */

function EditModal({
    ticket,
    onClose,
    onSave,
}: {
    ticket: Ticket;
    onClose: () => void;
    onSave: (t: Ticket) => void;
}) {
    const [form, setForm] = useState<Ticket>(ticket);

    const users = GROUP_USERS[form.assignmentGroup] ?? [];
    const subcats = CATEGORY_MAP[form.category] ?? [];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[900px] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Edit Ticket #{form.id}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label>Summary</label>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={form.summary}
                            onChange={(e) =>
                                setForm({ ...form, summary: e.target.value })
                            }
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Description</label>
                        <textarea
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </div>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value as Status })
                        }
                    >
                        {STATUS.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.priority}
                        onChange={(e) =>
                            setForm({ ...form, priority: e.target.value as Priority })
                        }
                    >
                        {PRIORITY.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category: e.target.value,
                                subcategory: "",
                            })
                        }
                    >
                        {Object.keys(CATEGORY_MAP).map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.subcategory}
                        onChange={(e) =>
                            setForm({ ...form, subcategory: e.target.value })
                        }
                    >
                        <option value="">Subcategory</option>
                        {subcats.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.assignmentGroup}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                assignmentGroup: e.target.value,
                                assignedTo: "",
                            })
                        }
                    >
                        {Object.keys(GROUP_USERS).map((g) => (
                            <option key={g}>{g}</option>
                        ))}
                    </select>

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.assignedTo}
                        onChange={(e) =>
                            setForm({ ...form, assignedTo: e.target.value })
                        }
                    >
                        <option value="">Assigned To</option>
                        {users.map((u) => (
                            <option key={u}>{u}</option>
                        ))}
                    </select>

                    <input
                        className="border px-3 py-2 rounded"
                        placeholder="Caller"
                        value={form.caller}
                        onChange={(e) =>
                            setForm({ ...form, caller: e.target.value })
                        }
                    />

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.ci}
                        onChange={(e) =>
                            setForm({ ...form, ci: e.target.value })
                        }
                    >
                        <option value="">CI / Asset</option>
                        {CI_LIST.map((ci) => (
                            <option key={ci}>{ci}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => onSave(form)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ================= UTIL ================= */

function createEmptyTicket(): Ticket {
    return {
        id: Date.now(),
        summary: "",
        description: "",
        status: "Draft",
        priority: "Medium",
        category: "IT",
        subcategory: "",
        assignmentGroup: "IT",
        assignedTo: "",
        caller: "",
        ci: "",
        source: "Web",
        createdAt: new Date().toISOString(),
        timeline: [],
    };
}
