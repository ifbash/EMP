"use client";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

/* ================= TYPES ================= */

type Role = "Caller" | "Agent";
type CommentVisibility = "Public" | "Internal";

interface CommentAttachment {
    name: string;
    url: string;
}

interface Comment {
    id: number;
    author: string;
    role: Role;
    visibility: CommentVisibility;
    message: string;
    time: string;
    attachments: CommentAttachment[];
}

interface TimelineItem {
    status: string;
    user: string;
    time: string;
}

interface Ticket {
    id: number;
    summary: string;
    status: string;
    priority: string;
    assignmentGroup: string;
    ci: string;
    timeline: TimelineItem[];
    comments: Comment[];
}

/* ================= PAGE ================= */

export default function TicketDetailPage() {
    const { id } = useParams();
    const [ticket, setTicket] = useState<Ticket>(mockTicket(Number(id)));

    const [visibility, setVisibility] = useState<CommentVisibility>("Public");
    const [attachments, setAttachments] = useState<CommentAttachment[]>([]);
    const editorRef = useRef<HTMLDivElement>(null);

    const currentUser = {
        name: "Current User",
        role: "Agent" as Role, // switch to Caller if needed
    };

    function addComment() {
        const text = editorRef.current?.innerHTML ?? "";
        if (!text.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            author: currentUser.name,
            role: currentUser.role,
            visibility,
            message: text,
            time: new Date().toLocaleString(),
            attachments,
        };

        setTicket({
            ...ticket,
            comments: [...ticket.comments, newComment],
        });

        if (editorRef.current) editorRef.current.innerHTML = "";
        setAttachments([]);
        setVisibility("Public");
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">

            {/* ===== BREADCRUMB ===== */}
            <PageBreadcrumb
                pageTitle={`Ticket #${ticket.id}`}
                items={[
                    { label: "Home", href: "/" },
                    { label: "Help Desk", href: "/helpdesk" },
                    { label: `Ticket #${ticket.id}` },
                ]}
            />
            {/* ===== HEADER ===== */}
            <div className="bg-white rounded-xl shadow p-6">
                <h1 className="text-xl font-semibold">{ticket.summary}</h1>

                <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                    <div><b>Status:</b> {ticket.status}</div>
                    <div><b>Priority:</b> {ticket.priority}</div>
                    <div><b>Assignment:</b> {ticket.assignmentGroup}</div>
                    <div><b>CI:</b> {ticket.ci}</div>
                </div>
            </div>

            {/* ===== TIMELINE ===== */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-semibold mb-4">Activity Timeline</h2>
                <div className="border-l-2 pl-4 space-y-4">
                    {ticket.timeline.map((t, i) => (
                        <div key={i}>
                            <div className="font-medium">{t.status}</div>
                            <div className="text-xs text-gray-500">
                                {t.user} · {t.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== COMMENTS ===== */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-semibold mb-4">Comments</h2>

                {/* LIST */}
                <div className="space-y-4 mb-6">
                    {ticket.comments.map((c) => (
                        <div
                            key={c.id}
                            className={`p-4 rounded border ${c.visibility === "Internal"
                                ? "bg-yellow-50 border-yellow-300"
                                : c.role === "Agent"
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <div className="flex justify-between mb-1">
                                <div className="font-medium">
                                    {c.author}
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-200">
                                        {c.role}
                                    </span>
                                    {c.visibility === "Internal" && (
                                        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-yellow-300">
                                            Internal
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">{c.time}</div>
                            </div>

                            <div
                                className="text-sm prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: c.message }}
                            />

                            {/* Attachments */}
                            {c.attachments.length > 0 && (
                                <div className="mt-3 space-y-1">
                                    {c.attachments.map((a, i) => (
                                        <a
                                            key={i}
                                            href={a.url}
                                            target="_blank"
                                            className="text-sm text-blue-600 hover:underline block"
                                        >
                                            📎 {a.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ===== ADD COMMENT ===== */}
                <div className="border-t pt-4 space-y-4">

                    {/* Visibility */}
                    <div className="flex gap-4">
                        {(["Public", "Internal"] as CommentVisibility[]).map(v => (
                            <label key={v} className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    checked={visibility === v}
                                    onChange={() => setVisibility(v)}
                                />
                                {v}
                            </label>
                        ))}
                    </div>

                    {/* Rich Text Editor */}
                    <div
                        ref={editorRef}
                        contentEditable
                        className="min-h-[100px] border rounded px-3 py-2 focus:outline-none"
                        data-placeholder="Add a comment..."
                    />

                    {/* Attachments */}
                    <input
                        type="file"
                        multiple
                        onChange={(e) =>
                            setAttachments(
                                Array.from(e.target.files || []).map(f => ({
                                    name: f.name,
                                    url: URL.createObjectURL(f),
                                }))
                            )
                        }
                    />

                    {attachments.length > 0 && (
                        <div className="text-sm space-y-1">
                            {attachments.map((a, i) => (
                                <div key={i}>📎 {a.name}</div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            onClick={addComment}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

/* ================= MOCK ================= */

function mockTicket(id: number): Ticket {
    return {
        id,
        summary: "VPN not working",
        status: "In Progress",
        priority: "High",
        assignmentGroup: "IT Support",
        ci: "VPN",
        timeline: [
            { status: "Submitted", user: "Caller", time: "Jan 2, 10:00" },
            { status: "In Progress", user: "John", time: "Jan 2, 11:00" },
        ],
        comments: [],
    };
}
