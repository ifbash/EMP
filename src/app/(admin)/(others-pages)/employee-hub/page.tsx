"use client";

import React, { useState, useMemo } from "react";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FileText,
    UploadCloud,
    Share2,
    Download,
    Search,
} from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

/* ========================
   TYPES
======================== */
type Access = "Private" | "Shared";

interface FileItem {
    id: string;
    name: string;
    size: string;
    access: Access;
    folderPath: string;
}

interface FolderPermission {
    email: string;
    role: "View" | "Upload" | "Manage";
}

interface FolderItem {
    id: string;
    name: string;
    folders: FolderItem[];
    files: FileItem[];
    permissions?: FolderPermission[];
}

/* ========================
   STATIC DATA
======================== */
const initialFolders: FolderItem[] = [
    {
        id: "1",
        name: "Personal",
        folders: [],
        files: [
            { id: "f1", name: "Aadhar.pdf", size: "420 KB", access: "Private", folderPath: "Personal" },
        ],
    },
    {
        id: "2",
        name: "HR",
        folders: [
            {
                id: "2-1",
                name: "Payslips",
                folders: [],
                files: [
                    { id: "f2", name: "Payslip_Jan.pdf", size: "180 KB", access: "Shared", folderPath: "HR / Payslips" },
                ],
            },
        ],
        files: [],
    },
];

/* ========================
   HELPERS
======================== */
const flattenAllFiles = (folders: FolderItem[]): FileItem[] => {
    let files: FileItem[] = [];
    const walk = (folder: FolderItem, path: string) => {
        folder.files.forEach((f) => files.push({ ...f, folderPath: path }));
        folder.folders.forEach((sub) => walk(sub, `${path} / ${sub.name}`));
    };
    folders.forEach((f) => walk(f, f.name));
    return files;
};

/* ========================
   MODALS
======================== */
const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-1/3 relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    </div>
);

/* ========================
   DRAG & DROP UPLOAD
======================== */
const DropZone = ({ onUpload, onClose }: { onUpload: (files: File[]) => void; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 w-1/3 relative flex flex-col items-center">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                ✕
            </button>
            <UploadCloud size={48} className="text-gray-400 mb-4" />
            <p className="text-center text-gray-600 mb-4">Drag & drop files here or click to upload</p>
            <input
                type="file"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && onUpload(Array.from(e.target.files))}
            />
        </div>
    </div>
);

/* ========================
   FOLDER NODE
======================== */
const FolderNode = ({
    folder,
    selectedId,
    onSelect,
    onDownloadFolder,
    onContextMenu,
}: {
    folder: FolderItem;
    selectedId: string | null;
    onSelect: (folder: FolderItem) => void;
    onDownloadFolder: (folder: FolderItem) => void;
    onContextMenu: (e: React.MouseEvent, type: "folder" | "file", item: any) => void;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="ml-2">
            <div
                className={`flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedId === folder.id ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                onContextMenu={(e) => onContextMenu(e, "folder", folder)}
            >
                <div className="flex items-center gap-2" onClick={() => setOpen(!open)}>
                    {folder.folders.length || folder.files.length ? (
                        open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    ) : (
                        <span className="w-4" />
                    )}
                    <Folder size={18} className="text-brand-500" />
                    <span onClick={() => onSelect(folder)}>{folder.name}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onDownloadFolder(folder)}>
                        <Download size={16} className="text-gray-400 hover:text-gray-600" />
                    </button>
                    <Share2 size={16} className="text-gray-400" />
                </div>
            </div>

            {open &&
                folder.folders.map((sub) => (
                    <FolderNode
                        key={sub.id}
                        folder={sub}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        onDownloadFolder={onDownloadFolder}
                        onContextMenu={onContextMenu}
                    />
                ))}
        </div>
    );
};

/* ========================
   FILE GRID WITH PAGINATION
======================== */
const FileGrid = ({
    files,
    onDownloadFile,
    onContextMenu,
    currentPage,
    setCurrentPage,
    pageSize,
}: {
    files: FileItem[];
    onDownloadFile: (file: FileItem) => void;
    onContextMenu: (e: React.MouseEvent, type: "file" | "folder", item: any) => void;
    currentPage: number;
    setCurrentPage: (p: number) => void;
    pageSize: number;
}) => {
    const totalPages = Math.ceil(files.length / pageSize);
    const visibleFiles = files.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {visibleFiles.map((file) => (
                    <div
                        key={file.id}
                        className="p-3 border rounded-lg hover:shadow-md flex flex-col items-start gap-2"
                        onContextMenu={(e) => onContextMenu(e, "file", file)}
                    >
                        <div className="w-full flex justify-between">
                            <FileText size={24} />
                            <button onClick={() => onDownloadFile(file)}>
                                <Download size={16} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>
                        <span className="font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">{file.folderPath}</span>
                        <Badge size="sm" color={file.access === "Shared" ? "primary" : "dark"}>
                            {file.access}
                        </Badge>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-brand-500 text-white" : ""}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

/* ========================
   MAIN PAGE
======================== */
export default function EmployeeDocumentHub() {
    const [folders, setFolders] = useState(initialFolders);
    const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
    const [showUpload, setShowUpload] = useState(false);
    const [search, setSearch] = useState("");
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        type: "file" | "folder";
        item: any;
    } | null>(null);
    const [showRename, setShowRename] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const [showShare, setShowShare] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const allFiles = useMemo(() => {
        let data = selectedFolder ? flattenAllFiles([selectedFolder]) : flattenAllFiles(folders);
        if (search) data = data.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
        return data;
    }, [folders, selectedFolder, search]);

    const handleUploadFiles = (files: File[]) => {
        if (!selectedFolder) return;
        const newFiles: FileItem[] = files.map((f, idx) => ({
            id: Date.now().toString() + idx,
            name: f.name,
            size: `${(f.size / 1024).toFixed(2)} KB`,
            access: "Private",
            folderPath: selectedFolder.name,
        }));
        selectedFolder.files.push(...newFiles);
        setFolders([...folders]);
        setShowUpload(false);
    };

    const handleDownloadFile = (file: FileItem) => alert(`Download file: ${file.name}`);
    const handleDownloadFolder = (folder: FolderItem) => alert(`Download folder: ${folder.name}`);

    const handleContextMenu = (e: React.MouseEvent, type: "file" | "folder", item: any) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, type, item });
    };

    const handleRename = () => {
        if (contextMenu) {
            contextMenu.item.name = renameValue;
            setFolders([...folders]);
            setShowRename(false);
            setContextMenu(null);
        }
    };

    const handleShare = () => {
        setShowShare(true);
        setContextMenu(null);
    };

    return (
        <div className="p-6 space-y-6 relative">
            <PageBreadcrumb pageTitle="Employee Document Hub" />

            {/* Top bar */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-500"></p>
                </div>
                <button
                    className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600"
                    onClick={() => setShowUpload(true)}
                >
                    <UploadCloud size={16} /> Upload
                </button>
            </div>

            {showUpload && <DropZone onUpload={handleUploadFiles} onClose={() => setShowUpload(false)} />}

            {/* Search */}
            <div className="flex items-center mb-4 gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                        placeholder="Search documents..."
                        className="pl-9 w-full border rounded-lg px-3 py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Folder Sidebar */}
                <div className="col-span-3 border rounded-xl p-4 h-[600px] overflow-auto bg-gray-50 dark:bg-gray-800">
                    <h3 className="font-medium mb-3">Folders</h3>
                    <div
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${!selectedFolder ? "bg-gray-200 dark:bg-gray-700" : ""
                            }`}
                        onClick={() => setSelectedFolder(null)}
                    >
                        <Folder size={18} className="text-brand-500" />
                        <span>All Documents</span>
                    </div>
                    {folders.map((f) => (
                        <FolderNode
                            key={f.id}
                            folder={f}
                            selectedId={selectedFolder?.id || null}
                            onSelect={setSelectedFolder}
                            onDownloadFolder={handleDownloadFolder}
                            onContextMenu={handleContextMenu}
                        />
                    ))}
                </div>

                {/* File area */}
                <div className="col-span-9">
                    <FileGrid
                        files={allFiles}
                        onDownloadFile={handleDownloadFile}
                        onContextMenu={handleContextMenu}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
                    />
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <ul
                    className="absolute bg-white border shadow-lg rounded-md z-50"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleDownloadFile(contextMenu.item)}
                    >
                        <Download size={14} className="inline mr-2" />
                        Download
                    </li>
                    <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleShare}
                    >
                        <Share2 size={14} className="inline mr-2" />
                        Share
                    </li>
                    <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            setRenameValue(contextMenu.item.name);
                            setShowRename(true);
                            setContextMenu(null);
                        }}
                    >
                        Rename
                    </li>
                </ul>
            )}

            {/* Rename Modal */}
            {showRename && (
                <Modal title="Rename" onClose={() => setShowRename(false)}>
                    <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button className="border px-4 py-2 rounded-lg" onClick={() => setShowRename(false)}>
                            Cancel
                        </button>
                        <button className="bg-brand-500 text-white px-4 py-2 rounded-lg" onClick={handleRename}>
                            Save
                        </button>
                    </div>
                </Modal>
            )}

            {/* Share Modal */}
            {showShare && (
                <Modal title="Share" onClose={() => setShowShare(false)}>
                    <p className="mb-4">Enter email to share:</p>
                    <input
                        type="text"
                        placeholder="example@company.com"
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button className="border px-4 py-2 rounded-lg" onClick={() => setShowShare(false)}>
                            Cancel
                        </button>
                        <button
                            className="bg-brand-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => {
                                alert("Shared successfully!");
                                setShowShare(false);
                            }}
                        >
                            Share
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
