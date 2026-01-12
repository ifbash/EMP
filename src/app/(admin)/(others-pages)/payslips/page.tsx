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
            { label: "Basic Salary", value: 6000 },
            { label: "House Rental Allowance", value: 500 },
            { label: "Conveyance Allowance", value: 200 },
            { label: "Medical Allowance", value: 100 },
            { label: "Special Allowance", value: 50 },
            { label: "Provisional Allowance", value: 50 },
            { label: "Arrears", value: 50 },
            { label: "Reimbursements", value: 50 },
        ],
        deductionsList: [
            { label: "PF Contributions", value: 980 },
            { label: "VPF Contributions", value: 403 },
            { label: "Professional Tax", value: 47 },
            { label: "LWF Contributions", value: 47 },
            { label: "ESIC Contributions", value: 47 },
            { label: "NPS Contributions", value: 47 },
            { label: "Income Tax", value: 47 },
            { label: "Loss of Pay", value: 47 },
            { label: "Soft Loan", value: 47 },
            { label: "General Recovery", value: 47 },
        ],
    },
    // Add more payslips here for demonstration
];

const numberToWords = (num: number): string => {
    const a = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];
    const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    ];

    const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";

    let str = "";
    str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[n[1][0] as any] + " " + a[n[1][1] as any]) + " Crore " : "";
    str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[n[2][0] as any] + " " + a[n[2][1] as any]) + " Lakh " : "";
    str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[n[3][0] as any] + " " + a[n[3][1] as any]) + " Thousand " : "";
    str += Number(n[4]) !== 0 ? (a[Number(n[4])] || b[n[4][0] as any] + " " + a[n[4][1] as any]) + " Hundred " : "";
    str +=
        Number(n[5]) !== 0
            ? (str !== "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0] as any] + " " + a[n[5][1] as any]) +
            " Only"
            : "Only";

    return str;
};


export default function PayslipsPage() {
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>("All");
    const [selectedMonth, setSelectedMonth] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const pdfRef = useRef<HTMLDivElement>(null);

    // Extract unique years from data
    const years = Array.from(new Set(payslipsData.map(p => p.payPeriod.split(" ")[1]))).sort();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const filteredPayslips = payslipsData.filter(p => {
        const [month, year] = p.payPeriod.split(" ");
        const yearMatch = selectedYear === "All" || year === selectedYear;
        const monthMatch = selectedMonth === "All" || month === selectedMonth;
        return yearMatch && monthMatch;
    });

    const payslipsPerPage = 10;
    const totalPages = Math.ceil(filteredPayslips.length / payslipsPerPage);
    const displayedPayslips = filteredPayslips.slice(
        (currentPage - 1) * payslipsPerPage,
        currentPage * payslipsPerPage
    );

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedYear, selectedMonth]);

    const handleView = (payslip: Payslip) => setSelectedPayslip(payslip);
    const closeModal = () => setSelectedPayslip(null);

    const handleDownloadPDF = async () => {
        if (pdfRef.current && selectedPayslip) {
            const canvas = await html2canvas(pdfRef.current, { scale: 2, backgroundColor: "#ffffff" });
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

            {/* Filters */}
            <div className="flex gap-4 mt-6 mb-4">
                <select
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="All">All Years</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="All">All Months</option>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6">
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
                                {displayedPayslips.length > 0 ? (
                                    displayedPayslips.map((p, i) => (
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="px-5 py-8 text-center text-gray-500">
                                            No payslips found for the selected period.
                                        </TableCell>
                                    </TableRow>
                                )}
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
            <Modal isOpen={!!selectedPayslip} onClose={closeModal} className="max-w-5xl p-0 overflow-hidden bg-white">
                {selectedPayslip && (
                    <div className="p-8 bg-white text-gray-900 print:p-0">
                        {/* Wrapper for PDF generation - Needs white background and specific text colors for print */}
                        <div ref={pdfRef} className="bg-white p-6 min-w-[800px] mx-auto text-black">

                            {/* Header Section */}
                            <div className="relative flex items-center mb-6">
                                <div className="flex items-center">
                                    {/* Logo */}
                                    <div className="w-40 h-12 relative">
                                        <Image src="images/logo/logo.svg" alt="Logo" width={500} height={500} className="object-contain" />
                                    </div>
                                    {/* <span className="text-2xl font-bold tracking-tight text-brand-600">ifBash</span> */}
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                                    <h1 className="text-lg font-bold text-gray-900 uppercase tracking-wide">ifBash Private Limited</h1>
                                    <p className="text-sm text-gray-700 mt-1">Payslip for the month of {selectedPayslip.payPeriod}</p>
                                </div>
                            </div>

                            {/* Main Border Box */}
                            <div className="border-2 border-gray-800">

                                {/* Employee Details Grid */}
                                <div className="grid grid-cols-2 text-sm border-b-2 border-gray-800">
                                    {/* Left Column */}
                                    <div className="p-4 border-gray-800 space-y-1.5">
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">Employee Name</span>
                                            <span className="font-bold">: {selectedPayslip.employee.name}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">Employee ID</span>
                                            <span>: {selectedPayslip.employee.employeeId}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">Location</span>
                                            <span>: {selectedPayslip.employee.location}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">Designation</span>
                                            <span>: Digital Marketing</span> {/* Hardcoded for demo matching image, can be dynamic */}
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">D.O.J</span>
                                            <span>: {selectedPayslip.employee.dateOfJoining}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">Payable Days</span>
                                            <span>: {selectedPayslip.employee.payableDays.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="p-4 space-y-1.5 border-l-0">
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">PAN</span>
                                            <span>: {selectedPayslip.employee.PAN}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">UAN</span>
                                            <span>: {selectedPayslip.employee.UAN}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">PF Number</span>
                                            <span>: {selectedPayslip.employee.PFNumber || "-"}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">ESIC Number</span>
                                            <span>: {selectedPayslip.employee.ESICNumber || "-"}</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">PRAN</span>
                                            <span>: -</span>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <span className="font-semibold text-gray-600">LOP Days</span>
                                            <span>: {selectedPayslip.employee.lopDays.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Salary Calculation Table */}
                                <div className="grid grid-cols-2 text-sm items-stretch">

                                    {/* Earnings Section */}
                                    <div className="border-r-2 border-gray-800 flex flex-col">
                                        <div className="p-2 border-b-2 border-gray-800 flex justify-between font-bold bg-gray-50">
                                            <span>EARNINGS</span>
                                            <span>INR</span>
                                        </div>
                                        <div className="p-4 space-y-2 flex-1">
                                            {selectedPayslip.earnings.map((item, idx) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span>{item.label}</span>
                                                    <span>{item.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t-2 border-gray-800 flex justify-between font-bold bg-gray-50">
                                            <span>Gross Earnings</span>
                                            <span>{selectedPayslip.grossPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>

                                    {/* Deductions Section */}
                                    <div className="flex flex-col">
                                        <div className="p-2 border-b-2 border-gray-800 flex justify-between font-bold bg-gray-50">
                                            <span>DEDUCTIONS</span>
                                            <span>INR</span>
                                        </div>
                                        <div className="p-4 space-y-2 flex-1">
                                            {selectedPayslip.deductionsList.map((item, idx) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span>{item.label}</span>
                                                    <span>{item.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t-2 border-gray-800 flex justify-between font-bold bg-gray-50">
                                            <span>Total Deductions</span>
                                            <span>{selectedPayslip.deductions.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Details Section (Bank & Employer Contributions) */}
                                <div className="grid grid-cols-2 text-sm border-t-2 border-gray-800 items-stretch">
                                    {/* Bank Details */}
                                    <div className="border-r-2 border-gray-800 flex flex-col">
                                        <div className="p-2 font-bold text-gray-700 uppercase">Bank Details</div>
                                        <div className="p-4 space-y-1.5 flex-1 pt-1">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-600">Bank Name</span>
                                                <span>{selectedPayslip.employee.bankName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-600">Account Number</span>
                                                <span>{selectedPayslip.employee.accountNumber}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-600">IFSC Code</span>
                                                <span>SBIN0001234</span> {/* Hardcoded/Placeholder */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Employer Contributions */}
                                    <div className="flex flex-col">
                                        <div className="p-2 flex justify-between font-bold text-gray-700 uppercase">
                                            <span>Employer Contributions</span>
                                            <span>INR</span>
                                        </div>
                                        <div className="p-4 space-y-1.5 flex-1 pt-1">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600">PF Contribution</span>
                                                <span>929.00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600">PF Admin Charges</span>
                                                <span>77.00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600">ESIC Contribution</span>
                                                <span>0.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Net Pay Footer */}
                                <div className="p-3 border-t-2 border-gray-800 text-center font-bold text-sm bg-gray-50">
                                    <span className="mr-2 uppercase text-gray-600">Net Pay : </span>
                                    <span className="text-lg mr-4">{selectedPayslip.netPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    <span className="text-gray-500 italic font-medium">( {numberToWords(selectedPayslip.netPay).toUpperCase()} RUPEES )</span>
                                </div>

                            </div>

                            <div className="text-center mt-8 text-xs text-gray-400">
                                This is a computer generated payslip and does not require a signature.
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
