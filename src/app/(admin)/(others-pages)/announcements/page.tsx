"use client";
import React, { useState, useMemo } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

interface Announcement {
    id: number;
    title: string;
    category: string;
    content: string;
    date: string;
    imageUrl?: string;
    urgent?: boolean;
}

const sampleAnnouncements: Announcement[] = [
    {
        id: 1,
        title: "Year-End Party",
        category: "Event",
        content: "Join us for the grand year-end celebration with games, food, and music!",
        date: "2025-12-20",
        imageUrl: "/images/party.jpg",
    },
    {
        id: 2,
        title: "New Health Insurance Policy",
        category: "HR",
        content: "We are updating our health insurance policy. Please review the details on the HR portal.",
        date: "2025-12-15",
    },
    {
        id: 3,
        title: "Server Maintenance",
        category: "IT",
        content: "Scheduled server maintenance on 28th December. Systems may be unavailable from 2AM to 6AM.",
        date: "2025-12-12",
        urgent: true,
    },
    {
        id: 4,
        title: "Annual Performance Review",
        category: "HR",
        content: "Annual performance reviews will begin next month. Managers will schedule one-on-one sessions.",
        date: "2025-12-10",
    },
    {
        id: 5,
        title: "Holiday Notice",
        category: "General",
        content: "The office will be closed from 24th to 26th December for Christmas holidays.",
        date: "2025-12-05",
    },
    {
        id: 6,
        title: "Urgent Security Update",
        category: "IT",
        content: "Please update your passwords immediately due to a recent security breach.",
        date: "2025-12-22",
        urgent: true,
    },
];

const categoryColors: Record<string, string> = {
    HR: "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
    IT: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
    Event: "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400",
    General: "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400",
};

export default function AnnouncementsPage() {
    const [search, setSearch] = useState("");
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState<string>("All");

    const announcementsPerPage = 4;

    const filteredAnnouncements = useMemo(() => {
        let filtered = sampleAnnouncements;

        if (search) {
            filtered = filtered.filter(
                a =>
                    a.title.toLowerCase().includes(search.toLowerCase()) ||
                    a.category.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (categoryFilter !== "All") {
            filtered = filtered.filter(a => a.category === categoryFilter);
        }

        return filtered;
    }, [search, categoryFilter]);

    const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    const displayedAnnouncements = filteredAnnouncements.slice(
        (currentPage - 1) * announcementsPerPage,
        currentPage * announcementsPerPage
    );

    const categories = ["All", ...Array.from(new Set(sampleAnnouncements.map(a => a.category)))];

    return (
        <div className="p-6">
            <PageBreadcrumb pageTitle="Announcements" />

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-2 rounded-full border ${categoryFilter === cat
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
                            } transition`}
                    >
                        {cat}
                    </button>
                ))}

                <input
                    type="text"
                    placeholder="Search announcements..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="ml-auto border rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedAnnouncements.map(a => (
                    <div
                        key={a.id}
                        className={`rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden border ${a.urgent ? "border-red-500" : "border-transparent"
                            }`}
                        onClick={() => setSelectedAnnouncement(a)}
                    >
                        {a.imageUrl && (
                            <div className="relative w-full h-48">
                                <Image src={a.imageUrl} alt={a.title} fill className="object-cover" />
                            </div>
                        )}
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{a.title}</h3>
                                {a.urgent && <Badge size="sm" color="error">URGENT</Badge>}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[a.category] || categoryColors["General"]
                                        }`}
                                >
                                    {a.category}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(a.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{a.content}</p>
                            <p className="text-blue-600 hover:underline text-sm cursor-pointer">Read More</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        className="px-3 py-1 border rounded"
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : ""}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        className="px-3 py-1 border rounded"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={!!selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
                className="max-w-lg p-6"
            >
                {selectedAnnouncement && (
                    <div className="space-y-4">
                        {selectedAnnouncement.imageUrl && (
                            <div className="relative w-full h-48">
                                <Image
                                    src={selectedAnnouncement.imageUrl}
                                    alt={selectedAnnouncement.title}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAnnouncement.title}</h2>
                        <div className="flex gap-2 items-center">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[selectedAnnouncement.category] || categoryColors["General"]
                                    }`}
                            >
                                {selectedAnnouncement.category}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(selectedAnnouncement.date).toLocaleDateString()}</span>
                            {selectedAnnouncement.urgent && <Badge size="sm" color="error">URGENT</Badge>}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">{selectedAnnouncement.content}</div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedAnnouncement(null)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
