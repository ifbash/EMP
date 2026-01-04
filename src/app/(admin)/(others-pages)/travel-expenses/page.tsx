"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";

type RecordType = "Travel" | "Reimbursement";

interface UserInfo {
    name: string;
    avatar?: string;
}

interface ExpenseRecord {
    id: number;
    type: RecordType;
    tripName?: string; // for Travel
    from?: string;
    to?: string;
    travelType?: "Flight" | "Train" | "Cab";
    reimbursementTitle?: string; // for Reimbursement
    amount: number;
    status: "Draft" | "Submitted" | "Approved" | "Rejected";
    month: string;
    attachments: File[];
    user: UserInfo;
}

// Initial dummy data
const initialRecords: ExpenseRecord[] = [
    {
        id: 1,
        type: "Travel",
        tripName: "Client Visit",
        travelType: "Flight",
        from: "New York",
        to: "Boston",
        amount: 350,
        status: "Draft",
        month: "January",
        attachments: [],
        user: { name: "John Doe", avatar: "/images/user/user-17.jpg" },
    },
    {
        id: 2,
        type: "Reimbursement",
        reimbursementTitle: "Hotel Stay",
        amount: 200,
        status: "Submitted",
        month: "January",
        attachments: [],
        user: { name: "Alice Smith", avatar: "/images/user/user-18.jpg" },
    },
    {
        id: 3,
        type: "Travel",
        tripName: "Client Visit",
        travelType: "Flight",
        from: "New York",
        to: "Boston",
        amount: 350,
        status: "Draft",
        month: "January",
        attachments: [],
        user: { name: "John Doe", avatar: "/images/user/user-17.jpg" },
    },
    {
        id: 4,
        type: "Reimbursement",
        reimbursementTitle: "Hotel Stay",
        amount: 200,
        status: "Submitted",
        month: "January",
        attachments: [],
        user: { name: "Alice Smith", avatar: "/images/user/user-18.jpg" },
    },
    {
        id: 5,
        type: "Travel",
        tripName: "Client Visit",
        travelType: "Flight",
        from: "New York",
        to: "Boston",
        amount: 350,
        status: "Draft",
        month: "January",
        attachments: [],
        user: { name: "John Doe", avatar: "/images/user/user-17.jpg" },
    },
    {
        id: 6,
        type: "Reimbursement",
        reimbursementTitle: "Hotel Stay",
        amount: 200,
        status: "Submitted",
        month: "January",
        attachments: [],
        user: { name: "Alice Smith", avatar: "/images/user/user-18.jpg" },
    },
];

export default function ExpensesPage() {
    const [records, setRecords] = useState<ExpenseRecord[]>(initialRecords);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<ExpenseRecord | null>(null);

    // Common form fields
    const [recordType, setRecordType] = useState<RecordType>("Travel");
    const [tripName, setTripName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [travelType, setTravelType] = useState<"Flight" | "Train" | "Cab">("Flight");
    const [reimbursementTitle, setReimbursementTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [month, setMonth] = useState("");
    const [userName, setUserName] = useState("");

    // Filters
    const [filterStatus, setFilterStatus] = useState<ExpenseRecord["status"] | "All">("All");
    const [filterMonth, setFilterMonth] = useState<string>("All");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal functions
    const openNewRecord = (type: RecordType) => {
        setEditingRecord(null);
        setRecordType(type);
        setTripName("");
        setFrom("");
        setTo("");
        setTravelType("Flight");
        setReimbursementTitle("");
        setAmount(0);
        setAttachments([]);
        setMonth("");
        setUserName("");
        setModalOpen(true);
    };

    const openRecord = (record: ExpenseRecord) => {
        setEditingRecord(record);
        setRecordType(record.type);
        setTripName(record.tripName || "");
        setFrom(record.from || "");
        setTo(record.to || "");
        setTravelType(record.travelType || "Flight");
        setReimbursementTitle(record.reimbursementTitle || "");
        setAmount(record.amount);
        setAttachments(record.attachments || []);
        setMonth(record.month);
        setUserName(record.user.name);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setAttachments(Array.from(e.target.files));
    };

    const handleSubmitRecord = () => {
        if (!userName || !month || (recordType === "Travel" && !tripName) || (recordType === "Reimbursement" && !reimbursementTitle)) {
            return alert("Please fill required fields");
        }

        const newRecord: ExpenseRecord = {
            id: editingRecord ? editingRecord.id : records.length + 1,
            type: recordType,
            tripName: recordType === "Travel" ? tripName : undefined,
            from: recordType === "Travel" ? from : undefined,
            to: recordType === "Travel" ? to : undefined,
            travelType: recordType === "Travel" ? travelType : undefined,
            reimbursementTitle: recordType === "Reimbursement" ? reimbursementTitle : undefined,
            amount,
            attachments,
            status: "Submitted",
            month,
            user: { name: userName, avatar: editingRecord?.user.avatar },
        };

        if (editingRecord) {
            setRecords(records.map((r) => (r.id === editingRecord.id ? newRecord : r)));
        } else {
            setRecords([newRecord, ...records]);
        }
        setModalOpen(false);
    };

    // Filter and paginate
    const filteredRecords = records.filter((r) =>
        (filterStatus === "All" || r.status === filterStatus) &&
        (filterMonth === "All" || r.month === filterMonth)
    );
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const displayedRecords = filteredRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const openAttachment = (file: File) => {
        window.open(URL.createObjectURL(file));
    };

    return (
        <div className="p-6">
            <PageBreadcrumb pageTitle="Travel & Reimbursement Expenses" />

            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold"></h2>
                <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => openNewRecord("Travel")}>
                        New Travel
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => openNewRecord("Reimbursement")}>
                        New Reimbursement
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    className="border rounded px-3 py-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as ExpenseRecord["status"] | "All")}
                >
                    <option value="All">All Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <select
                    className="border rounded px-3 py-2"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                >
                    <option value="All">All Months</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="bg-gray-50 border-b border-gray-100">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 text-left">Trip / Reimbursement</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">User</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">Type</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">From</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">To</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">Amount</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-left">Status</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100">
                                {displayedRecords.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <span className="px-5 py-4 text-blue-600 cursor-pointer hover:underline" onClick={() => openRecord(r)}>
                                                {r.type === "Travel" ? r.tripName : r.reimbursementTitle}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {r.user.avatar && (
                                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                                        <Image
                                                            src={r.user.avatar}
                                                            width={40}
                                                            height={40}
                                                            alt={r.user.name}
                                                        />
                                                    </div>
                                                )}
                                                <span>{r.user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{r.type}</TableCell>
                                        <TableCell>{r.type === "Travel" ? r.from : "-"}</TableCell>
                                        <TableCell>{r.type === "Travel" ? r.to : "-"}</TableCell>
                                        <TableCell>${r.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge
                                                size="sm"
                                                color={
                                                    r.status === "Approved"
                                                        ? "success"
                                                        : r.status === "Submitted"
                                                            ? "warning"
                                                            : r.status === "Rejected"
                                                                ? "error"
                                                                : "light"
                                                }
                                            >
                                                {r.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        className="px-3 py-1 border rounded"
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : ""}`}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 border rounded"
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={closeModal} className="max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {editingRecord ? "Edit Record" : `New ${recordType}`}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">User Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    {recordType === "Travel" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Trip Name</label>
                                <input type="text" className="w-full border rounded px-3 py-2" value={tripName} onChange={(e) => setTripName(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select className="w-full border rounded px-3 py-2" value={travelType} onChange={(e) => setTravelType(e.target.value as "Flight" | "Train" | "Cab")}>
                                    <option value="Flight">Flight</option>
                                    <option value="Train">Train</option>
                                    <option value="Cab">Cab</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">From</label>
                                    <input type="text" className="w-full border rounded px-3 py-2" value={from} onChange={(e) => setFrom(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">To</label>
                                    <input type="text" className="w-full border rounded px-3 py-2" value={to} onChange={(e) => setTo(e.target.value)} />
                                </div>
                            </div>
                        </>
                    )}

                    {recordType === "Reimbursement" && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" className="w-full border rounded px-3 py-2" value={reimbursementTitle} onChange={(e) => setReimbursementTitle(e.target.value)} />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Month</label>
                        <select className="w-full border rounded px-3 py-2" value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Select Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Attachments</label>
                        <input type="file" multiple className="w-full" onChange={handleAttachmentChange} />
                        {attachments.length > 0 ? (
                            <ul className="mt-2">
                                {attachments.map((file, idx) => (
                                    <li key={idx}>
                                        <span className="text-blue-600 underline cursor-pointer" onClick={() => openAttachment(file)}>{file.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <span className="text-gray-500 italic">No files attached</span>}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={closeModal}>Cancel</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSubmitRecord}>Submit</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
