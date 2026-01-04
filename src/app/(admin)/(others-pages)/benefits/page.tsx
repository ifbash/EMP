"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";

interface Benefit {
    id: string;
    title: string;
    icon: string;
    plan: string;
    coverage: string;
    premium: string;
}

const benefitsData: Benefit[] = [
    {
        id: "health",
        title: "Health Insurance",
        icon: "/icons/health-insurance.svg",
        plan: "Premium Health Plan",
        coverage: "Employee + Family",
        premium: "$350/month (70% employer paid)",
    },
    {
        id: "vision",
        title: "Vision Insurance",
        icon: "/icons/vision-insurance.svg",
        plan: "Vision Plus",
        coverage: "Employee Only",
        premium: "$25/month (100% employer paid)",
    },
    {
        id: "life",
        title: "Life Insurance",
        icon: "/icons/life-insurance.svg",
        plan: "Term Life Insurance",
        coverage: "$500,000",
        premium: "Fully employer paid",
    },
    {
        id: "retirement",
        title: "401(k) Retirement",
        icon: "/icons/retirement.svg",
        plan: "Your Contribution: 6%",
        coverage: "Employer Match: 4%",
        premium: "Current Balance: $45,230",
    },
    {
        id: "other",
        title: "Other Benefits",
        icon: "/icons/other-benefits.svg",
        plan: "• Gym membership discount",
        coverage: "• Professional development fund",
        premium: "• Employee assistance program",
    },
    {
        id: "dental",
        title: "Dental Insurance",
        icon: "/icons/dental.svg",
        plan: "Dental Plus",
        coverage: "Employee + Family",
        premium: "$50/month",
    },
    {
        id: "wellness",
        title: "Wellness Program",
        icon: "/icons/wellness.svg",
        plan: "Annual Checkup & Gym",
        coverage: "Employee Only",
        premium: "Fully employer paid",
    },
    {
        id: "disability",
        title: "Disability Insurance",
        icon: "/icons/disability.svg",
        plan: "Short & Long-term",
        coverage: "Employee Only",
        premium: "Fully employer paid",
    },
    {
        id: "tuition",
        title: "Tuition Reimbursement",
        icon: "/icons/tuition.svg",
        plan: "Up to $5,000/year",
        coverage: "Employee Only",
        premium: "Employer funded",
    },
    {
        id: "commute",
        title: "Commuter Benefits",
        icon: "/icons/commute.svg",
        plan: "Transit & Parking",
        coverage: "Employee Only",
        premium: "Employer funded",
    },
    {
        id: "pet",
        title: "Pet Insurance",
        icon: "/icons/pet.svg",
        plan: "PetCare Plus",
        coverage: "Employee Pet",
        premium: "$30/month",
    },
];

export default function BenefitsPage() {
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const benefitsPerPage = 10; // Show 10 benefits per page

    const totalPages = Math.ceil(benefitsData.length / benefitsPerPage);
    const displayedBenefits = benefitsData.slice(
        (currentPage - 1) * benefitsPerPage,
        currentPage * benefitsPerPage
    );

    const handleViewDetails = (benefit: Benefit) => {
        setSelectedBenefit(benefit);
    };

    const closeModal = () => setSelectedBenefit(null);

    return (
        <div className="p-6">
            <PageBreadcrumb pageTitle="Benefits & Insurance" />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-6">
                {displayedBenefits.map((benefit) => (
                    <div
                        key={benefit.id}
                        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition-all dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12">
                                <Image
                                    src={benefit.icon || "https://www.vecteezy.com/free-vector/policy-icon"}
                                    alt={benefit.title}
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {benefit.title}
                            </h3>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {benefit.plan}
                        </p>
                        <button
                            onClick={() => handleViewDetails(benefit)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            View Details
                        </button>
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
                            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : ""
                                }`}
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
            <Modal isOpen={!!selectedBenefit} onClose={closeModal} className="max-w-xl p-8">
                {selectedBenefit && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12">
                                <Image
                                    src={selectedBenefit.icon || "https://www.vecteezy.com/free-vector/policy-icon"}
                                    alt={selectedBenefit.title}
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {selectedBenefit.title}
                            </h2>
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>
                                <strong>Plan:</strong> {selectedBenefit.plan}
                            </p>
                            <p>
                                <strong>Coverage:</strong> {selectedBenefit.coverage}
                            </p>
                            <p>
                                <strong>Premium:</strong> {selectedBenefit.premium}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
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
