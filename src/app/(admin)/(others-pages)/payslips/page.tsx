"use client";
import React, { useRef, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Payslip {
    id: number;
    payPeriod: string;
    grossPay: number;
    deductions: number;
    netPay: number;
    status: string;
    employee: {
        name: string;
        employeeId: string;
        department: string;
        dateOfJoining: string;
        location: string;
        payableDays: number;
        lopDays: number;
        PAN: string;
        UAN: string;
        PFNumber: string;
        ESICNumber: string;
        bankName: string;
        accountNumber: string;
    };
    earnings: { label: string; value: number }[];
    deductionsList: { label: string; value: number }[];
}

// Sample data
const payslipsData: Payslip[] = [
    {
        id: 1,
        payPeriod: "October 2025",
        grossPay: 6500,
        deductions: 1430,
        netPay: 5070,
        status: "Paid",
        employee: {
            name: "John Doe",
            employeeId: "EMP-2024-001",
            department: "Engineering",
            dateOfJoining: "01-Jan-2024",
            location: "New York",
            payableDays: 30,
            lopDays: 0,
            PAN: "ABCDE1234F",
            UAN: "100200300",
            PFNumber: "PF10001",
            ESICNumber: "ESIC12345",
            bankName: "ABC Bank",
            accountNumber: "1234567890",
        },
        earnings: [
            { label: "Base Salary", value: 6000 },
            { label: "Performance Bonus", value: 500 },
        ],
        deductionsList: [
            { label: "Federal Tax", value: 980 },
            { label: "Social Security", value: 403 },
            { label: "Health Insurance", value: 47 },
        ],
    },
    // Add more payslips here for demonstration
];

export default function PayslipsPage() {
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pdfRef = useRef<HTMLDivElement>(null);

    const payslipsPerPage = 10;
    const totalPages = Math.ceil(payslipsData.length / payslipsPerPage);
    const displayedPayslips = payslipsData.slice(
        (currentPage - 1) * payslipsPerPage,
        currentPage * payslipsPerPage
    );

    const handleView = (payslip: Payslip) => setSelectedPayslip(payslip);
    const closeModal = () => setSelectedPayslip(null);

    const handleDownloadPDF = async () => {
        if (pdfRef.current && selectedPayslip) {
            const canvas = await html2canvas(pdfRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "pt", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Payslip-${selectedPayslip.employee.employeeId}-${selectedPayslip.payPeriod}.pdf`);
        }
    };

    return (
        <div className="p-6">
            <PageBreadcrumb pageTitle="Payslips" />

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6 mt-4">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Pay Period</TableCell>
                                    <TableCell isHeader className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Gross Pay</TableCell>
                                    <TableCell isHeader className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Deductions</TableCell>
                                    <TableCell isHeader className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Net Pay</TableCell>
                                    <TableCell isHeader className="text-center px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</TableCell>
                                    <TableCell isHeader className="text-center px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {displayedPayslips.map((p, i) => (
                                    <TableRow key={p.id} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                                        <TableCell className="px-5 py-4 text-left">{p.payPeriod}</TableCell>
                                        <TableCell className="px-5 py-4 text-right">${p.grossPay.toFixed(2)}</TableCell>
                                        <TableCell className="px-5 py-4 text-right">${p.deductions.toFixed(2)}</TableCell>
                                        <TableCell className="px-5 py-4 text-right">${p.netPay.toFixed(2)}</TableCell>
                                        <TableCell className="px-5 py-4 text-center">
                                            <Badge size="sm" color={p.status === "Paid" ? "success" : "warning"}>{p.status}</Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-center">
                                            <button onClick={() => handleView(p)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">View</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
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
            </div>

            {/* Modal */}
            <Modal isOpen={!!selectedPayslip} onClose={closeModal} className="max-w-3xl p-8">
                {selectedPayslip && (
                    <div className="space-y-6">
                        <div ref={pdfRef} className="space-y-6 p-4">
                            {/* Company Logo */}
                            <div className="flex justify-center">
                                <Image src="/images/logo/logo.svg" alt="Company Logo" width={150} height={50} />
                            </div>

                            {/* Employee Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                                <div><strong>Employee Name:</strong> {selectedPayslip.employee.name}</div>
                                <div><strong>Employee ID:</strong> {selectedPayslip.employee.employeeId}</div>
                                <div><strong>Department:</strong> {selectedPayslip.employee.department}</div>
                                <div><strong>Date of Joining:</strong> {selectedPayslip.employee.dateOfJoining}</div>
                                <div><strong>Location:</strong> {selectedPayslip.employee.location}</div>
                                <div><strong>Payable Days:</strong> {selectedPayslip.employee.payableDays}</div>
                                <div><strong>LOP Days:</strong> {selectedPayslip.employee.lopDays}</div>
                                <div><strong>PAN:</strong> {selectedPayslip.employee.PAN}</div>
                                <div><strong>UAN:</strong> {selectedPayslip.employee.UAN}</div>
                                <div><strong>PF Number:</strong> {selectedPayslip.employee.PFNumber}</div>
                                <div><strong>ESIC Number:</strong> {selectedPayslip.employee.ESICNumber}</div>
                            </div>

                            {/* Bank Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                                <div><strong>Bank Name:</strong> {selectedPayslip.employee.bankName}</div>
                                <div><strong>Account Number:</strong> {selectedPayslip.employee.accountNumber}</div>
                            </div>

                            {/* Earnings & Deductions */}
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white">Earnings</h3>
                                    <div className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                                        {selectedPayslip.earnings.map((e, i) => (
                                            <div key={i} className="flex justify-between">
                                                <span>{e.label}</span>
                                                <span>${e.value.toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between font-bold mt-2 border-t pt-2">
                                            <span>Gross Pay</span>
                                            <span>${selectedPayslip.grossPay.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white">Deductions</h3>
                                    <div className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                                        {selectedPayslip.deductionsList.map((d, i) => (
                                            <div key={i} className="flex justify-between">
                                                <span>{d.label}</span>
                                                <span>${d.value.toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between font-bold mt-2 border-t pt-2">
                                            <span>Total Deductions</span>
                                            <span>${selectedPayslip.deductions.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Net Pay */}
                            <div className="flex justify-between mt-6 text-lg font-bold text-gray-800 dark:text-white">
                                <span>Net Pay</span>
                                <span>${selectedPayslip.netPay.toFixed(2)}</span>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                                This payslip is computer generated and does not require any signature.
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleDownloadPDF}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
