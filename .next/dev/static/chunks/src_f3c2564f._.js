(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/common/PageBreadCrumb.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
const PageBreadcrumb = ({ pageTitle, items })=>{
    const breadcrumbItems = items && items.length > 0 ? items : [
        {
            label: "Home",
            href: "/"
        },
        {
            label: pageTitle
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center justify-between gap-3 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold text-gray-800 dark:text-white/90",
                children: pageTitle
            }, void 0, false, {
                fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "flex items-center gap-1.5 text-sm",
                    children: breadcrumbItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-1.5",
                            children: [
                                item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-gray-500 hover:text-blue-600 dark:text-gray-400",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                                    lineNumber: 39,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-800 dark:text-white/90 font-medium",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                index < breadcrumbItems.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "stroke-current text-gray-400",
                                    width: "17",
                                    height: "16",
                                    viewBox: "0 0 17 16",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6.0765 12.667L10.2432 8.50033L6.0765 4.33366",
                                        strokeWidth: "1.2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                                        lineNumber: 60,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                                    lineNumber: 52,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/PageBreadCrumb.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PageBreadcrumb;
const __TURBOPACK__default__export__ = PageBreadcrumb;
var _c;
__turbopack_context__.k.register(_c, "PageBreadcrumb");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TicketDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$PageBreadCrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/PageBreadCrumb.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TicketDetailPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [ticket, setTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockTicket(Number(id)));
    const [visibility, setVisibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Public");
    const [attachments, setAttachments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUser = {
        name: "Current User",
        role: "Agent"
    };
    function addComment() {
        const text = editorRef.current?.innerHTML ?? "";
        if (!text.trim()) return;
        const newComment = {
            id: Date.now(),
            author: currentUser.name,
            role: currentUser.role,
            visibility,
            message: text,
            time: new Date().toLocaleString(),
            attachments
        };
        setTicket({
            ...ticket,
            comments: [
                ...ticket.comments,
                newComment
            ]
        });
        if (editorRef.current) editorRef.current.innerHTML = "";
        setAttachments([]);
        setVisibility("Public");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-100 min-h-screen space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$PageBreadCrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                pageTitle: `Ticket #${ticket.id}`,
                items: [
                    {
                        label: "Home",
                        href: "/"
                    },
                    {
                        label: "Help Desk",
                        href: "/helpdesk"
                    },
                    {
                        label: `Ticket #${ticket.id}`
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold",
                        children: ticket.summary
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-4 mt-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Status:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 26
                                    }, this),
                                    " ",
                                    ticket.status
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Priority:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 26
                                    }, this),
                                    " ",
                                    ticket.priority
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Assignment:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 26
                                    }, this),
                                    " ",
                                    ticket.assignmentGroup
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "CI:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 26
                                    }, this),
                                    " ",
                                    ticket.ci
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 102,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-4",
                        children: "Activity Timeline"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-l-2 pl-4 space-y-4",
                        children: ticket.timeline.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: t.status
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            t.user,
                                            " · ",
                                            t.time
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 111,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-4",
                        children: "Comments"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 mb-6",
                        children: ticket.comments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 rounded border ${c.visibility === "Internal" ? "bg-yellow-50 border-yellow-300" : c.role === "Agent" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium",
                                                children: [
                                                    c.author,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs px-2 py-0.5 rounded bg-gray-200",
                                                        children: c.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 37
                                                    }, this),
                                                    c.visibility === "Internal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs px-2 py-0.5 rounded bg-yellow-300",
                                                        children: "Internal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: c.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm prose max-w-none",
                                        dangerouslySetInnerHTML: {
                                            __html: c.message
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, this),
                                    c.attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 space-y-1",
                                        children: c.attachments.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: a.url,
                                                target: "_blank",
                                                className: "text-sm text-blue-600 hover:underline block",
                                                children: [
                                                    "📎 ",
                                                    a.name
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t pt-4 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    "Public",
                                    "Internal"
                                ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                checked: visibility === v,
                                                onChange: ()=>setVisibility(v)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this),
                                            v
                                        ]
                                    }, v, true, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: editorRef,
                                contentEditable: true,
                                className: "min-h-[100px] border rounded px-3 py-2 focus:outline-none",
                                "data-placeholder": "Add a comment..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 194,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                multiple: true,
                                onChange: (e)=>setAttachments(Array.from(e.target.files || []).map((f)=>({
                                            name: f.name,
                                            url: URL.createObjectURL(f)
                                        })))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 202,
                                columnNumber: 21
                            }, this),
                            attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm space-y-1",
                                children: attachments.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "📎 ",
                                            a.name
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 216,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addComment,
                                    className: "bg-blue-600 text-white px-4 py-2 rounded",
                                    children: "Add Comment"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                                lineNumber: 223,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                        lineNumber: 177,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(admin)/(others-pages)/helpdesk/[id]/page.tsx",
        lineNumber: 83,
        columnNumber: 9
    }, this);
}
_s(TicketDetailPage, "casgcaMLjCzjEOSqXPZ4r9jjvDE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = TicketDetailPage;
/* ================= MOCK ================= */ function mockTicket(id) {
    return {
        id,
        summary: "VPN not working",
        status: "In Progress",
        priority: "High",
        assignmentGroup: "IT Support",
        ci: "VPN",
        timeline: [
            {
                status: "Submitted",
                user: "Caller",
                time: "Jan 2, 10:00"
            },
            {
                status: "In Progress",
                user: "John",
                time: "Jan 2, 11:00"
            }
        ],
        comments: []
    };
}
var _c;
__turbopack_context__.k.register(_c, "TicketDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f3c2564f._.js.map