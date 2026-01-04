"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";

interface Policy {
    id: string;
    title: string;
    content: React.ReactNode;
    imageUrl?: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    policies: Policy[];
    imageUrl?: string;
}

const defaultImageUrl =
    "https://www.vecteezy.com/free-vector/policy-icon";

// Sample data (replace or extend as needed)
const hrCategories: Category[] = [
    {
        id: "leave",
        name: "Leave & Time Off",
        description:
            "Guidelines regarding annual leave, sick leave, and other time-off policies.",
        policies: [
            {
                id: "annual-leave",
                title: "Annual Leave Policy",
                content: (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Annual Leave Entitlement</h3>
                        <p>
                            Employees are entitled to 20 days of paid annual leave per year.
                            Leave must be requested at least 2 weeks in advance via the HR
                            portal.
                        </p>
                        <p>Unused leave can be carried over up to 5 days to the next year.</p>
                    </div>
                ),
            },
            {
                id: "sick-leave",
                title: "Sick Leave Policy",
                content: (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Sick Leave</h3>
                        <p>
                            Employees receive 10 days of paid sick leave annually. A medical
                            certificate is required for absences exceeding 2 consecutive days.
                        </p>
                    </div>
                ),
            },
        ],
    },
    {
        id: "conduct",
        name: "Code of Conduct",
        description: "Standards of behavior, ethics, and professional expectations.",
        policies: [
            {
                id: "harassment",
                title: "Anti-Harassment Policy",
                content: (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Zero Tolerance</h3>
                        <p>
                            The company maintains a zero-tolerance policy towards harassment
                            of any kind. All employees are expected to treat colleagues with
                            respect and dignity.
                        </p>
                    </div>
                ),
            },
            {
                id: "dress-code",
                title: "Dress Code",
                content: (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Business Casual</h3>
                        <p>
                            Our workplace adopts a business casual dress code. Employees
                            should dress neatly and appropriately for a professional
                            environment.
                        </p>
                    </div>
                ),
            },
        ],
    },
    // Add more categories as needed...
];

export default function HrPoliciesPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

    // Pagination states
    const [categoryPage, setCategoryPage] = useState(1);
    const categoriesPerPage = 6;
    const [policyPage, setPolicyPage] = useState(1);
    const policiesPerPage = 6;

    const totalCategoryPages = Math.ceil(hrCategories.length / categoriesPerPage);

    const displayedCategories = hrCategories.slice(
        (categoryPage - 1) * categoriesPerPage,
        categoryPage * categoriesPerPage
    );

    const displayedPolicies = selectedCategory
        ? selectedCategory.policies.slice(
            (policyPage - 1) * policiesPerPage,
            policyPage * policiesPerPage
        )
        : [];

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        setPolicyPage(1); // reset policy page
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    const handlePolicyClick = (policy: Policy) => {
        setSelectedPolicy(policy);
    };

    const closeModal = () => setSelectedPolicy(null);

    return (
        <div>
            <PageBreadcrumb pageTitle="HR Policies" />

            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                {/* Categories */}
                {!selectedCategory ? (
                    <div>
                        <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
                            Policy Categories
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {displayedCategories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        src={category.imageUrl || defaultImageUrl}
                                        alt={category.name}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Category Pagination */}
                        {totalCategoryPages > 1 && (
                            <div className="mt-6 flex justify-center gap-2">
                                <button
                                    onClick={() => setCategoryPage(Math.max(categoryPage - 1, 1))}
                                    className="px-3 py-1 border rounded"
                                    disabled={categoryPage === 1}
                                >
                                    Prev
                                </button>
                                {[...Array(totalCategoryPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCategoryPage(idx + 1)}
                                        className={`px-3 py-1 border rounded ${categoryPage === idx + 1 ? "bg-brand-500 text-white" : ""
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCategoryPage(
                                            Math.min(categoryPage + 1, totalCategoryPages)
                                        )
                                    }
                                    className="px-3 py-1 border rounded"
                                    disabled={categoryPage === totalCategoryPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Policies inside selected category
                    <div>
                        <button
                            onClick={handleBackToCategories}
                            className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            ← Back to Categories
                        </button>
                        <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
                            {selectedCategory.name}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {displayedPolicies.map((policy) => (
                                <div
                                    key={policy.id}
                                    onClick={() => handlePolicyClick(policy)}
                                    className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        src={policy.imageUrl || defaultImageUrl}
                                        alt={policy.title}
                                        className="w-12 h-12 object-cover rounded-full mb-4"
                                    />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {policy.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Click to view details
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Policy Pagination */}
                        {selectedCategory.policies.length > policiesPerPage && (
                            <div className="mt-6 flex justify-center gap-2">
                                <button
                                    onClick={() => setPolicyPage(Math.max(policyPage - 1, 1))}
                                    className="px-3 py-1 border rounded"
                                    disabled={policyPage === 1}
                                >
                                    Prev
                                </button>
                                {[...Array(
                                    Math.ceil(selectedCategory.policies.length / policiesPerPage)
                                )].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setPolicyPage(idx + 1)}
                                        className={`px-3 py-1 border rounded ${policyPage === idx + 1 ? "bg-brand-500 text-white" : ""
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setPolicyPage(
                                            Math.min(
                                                policyPage + 1,
                                                Math.ceil(
                                                    selectedCategory.policies.length / policiesPerPage
                                                )
                                            )
                                        )
                                    }
                                    className="px-3 py-1 border rounded"
                                    disabled={
                                        policyPage ===
                                        Math.ceil(selectedCategory.policies.length / policiesPerPage)
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Policy Details Modal */}
            <Modal isOpen={!!selectedPolicy} onClose={closeModal} className="max-w-xl p-8">
                {selectedPolicy && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedPolicy.title}
                        </h2>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />
                        <div className="text-gray-600 dark:text-gray-300">{selectedPolicy.content}</div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
