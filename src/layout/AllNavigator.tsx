// components/layout/AllNavigator.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ChevronRight, ChevronDown, Star, X, Pin, PinOff, RefreshCw } from "lucide-react";

import { navItems } from "./nav-items";
import { useSidebar } from "@/context/SidebarContext";

interface NavItem {
    name: string;
    path?: string;
    icon?: React.ReactNode;
    subItems?: NavItem[];
}

export default function AllNavigator() {
    const {
        isNavigatorOpen,
        setIsNavigatorOpen,
        isNavigatorPinned,
        setIsNavigatorPinned
    } = useSidebar();

    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        navItems.forEach(item => initial.add(item.name));
        return initial;
    });
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isNavigatorOpen || isNavigatorPinned) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsNavigatorOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNavigatorOpen, isNavigatorPinned, setIsNavigatorOpen]);

    const toggleSection = (name: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    };

    const toggleFavorite = (name: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    };

    // Recursive Item Renderer
    const NavItemRenderer = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
        const hasChildren = item.subItems && item.subItems.length > 0;
        const paddingLeft = depth > 0 ? `${depth * 1}rem` : undefined;

        if (hasChildren) {
            const isExpanded = expanded.has(item.name);
            return (
                <div className="mb-1">
                    <button
                        onClick={() => toggleSection(item.name)}
                        className={`
                            w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg
                            hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white
                            ${isExpanded ? "bg-gray-50 dark:bg-gray-900" : ""}
                        `}
                        style={{ paddingLeft: depth > 0 ? `calc(1rem + ${paddingLeft})` : '1rem' }}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.name}</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-500 dark:text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                    </button>
                    {isExpanded && item.subItems && (
                        <div className="mt-0.5 space-y-0.5 relative">
                            {item.subItems.map(sub => (
                                <NavItemRenderer key={sub.name} item={sub} depth={depth + 1} />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="mb-1">
                <Link
                    href={item.path || "#"}
                    onClick={() => setIsNavigatorOpen(false)}
                    className="
                      flex items-center justify-between px-4 py-2.5 text-sm rounded-lg
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      text-black dark:text-gray-300 transition-colors group
                    "
                    style={{ paddingLeft: depth > 0 ? `calc(1rem + ${paddingLeft})` : '1rem' }}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.name}</span>
                    </div>
                    <Star
                        size={14}
                        className={`group-hover:opacity-100 transition-opacity ${favorites.has(item.name) ? "fill-yellow-400 text-yellow-400 opacity-100" : "text-gray-400 dark:text-gray-500 opacity-0"}`}
                        onClick={(e) => toggleFavorite(item.name, e)}
                    />
                </Link>
            </div>
        );
    };

    // Use useMemo or just call it? calling it is fine for small lists.
    // However, wait. Effect to expand? The Expand logic inside reduce is a side-effect. Bad practice during render.
    // I should compute filtered items, THEN maybe expanding is handled by default expansion or user interaction.
    // User asked "expand all" previously. So they are expanded.

    // Correct logic without side effects:
    const getFilteredItems = (items: NavItem[], lowerSearch: string): NavItem[] => {
        if (!lowerSearch) return items;

        return items.reduce<NavItem[]>((acc, item) => {
            const itemMatches = item.name.toLowerCase().includes(lowerSearch);
            let subItemsMatches: NavItem[] = [];

            if (item.subItems) {
                subItemsMatches = getFilteredItems(item.subItems, lowerSearch);
            }

            if (itemMatches) {
                // If parent matches, keep original subItems (show all context) OR filtered?
                // "show the menu and submenu item" -> if I type "HR", I want to see "HR Services".
                acc.push(item);
            } else if (subItemsMatches.length > 0) {
                // If children match, include parent with FILTERED children
                acc.push({ ...item, subItems: subItemsMatches });
            }

            return acc;
        }, []);
    };

    const filteredItems = getFilteredItems(navItems as NavItem[], search.toLowerCase());

    // if (!isNavigatorOpen && !isNavigatorPinned) return null; // Removed to allow transitions

    return (
        <>
            {/* Backdrop */}
            {!isNavigatorPinned && isNavigatorOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNavigatorOpen(false)}
                />
            )}

            {/* Navigator */}
            <div
                ref={ref}
                className={`
          bg-white dark:bg-gray-950 
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isNavigatorPinned
                        ? "relative w-[340px] h-full flex-shrink-0 border-r"
                        : `fixed top-16 left-14 w-[340px] h-[calc(100vh-5rem)] z-50 shadow-2xl rounded-xl border ${isNavigatorOpen ? "translate-x-0" : "-translate-x-[120%]"}`
                    }
        `}
            >
                {/* Search */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter..."
                            autoFocus={!isNavigatorPinned}
                            className="
                                w-full bg-gray-50 dark:bg-gray-900 
                                border border-gray-300 dark:border-gray-700 
                                rounded-lg pl-10 pr-4 py-2.5 text-sm text-black dark:text-white
                                placeholder:text-gray-500 dark:placeholder:text-gray-400
                                focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30
                            "
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Pin / Unpin button */}
                        <button
                            onClick={() => setIsNavigatorPinned(!isNavigatorPinned)}
                            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                            title={isNavigatorPinned ? "Unpin navigator" : "Pin navigator"}
                        >
                            {isNavigatorPinned ? <PinOff size={18} /> : <Pin size={18} />}
                        </button>

                        {/* Close */}
                        {!isNavigatorPinned && (
                            <button
                                onClick={() => setIsNavigatorOpen(false)}
                                className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden text-gray-600 dark:text-gray-400"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="overflow-y-auto h-[calc(100%-126px)] px-3 py-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-600 dark:text-gray-400 text-sm">
                            No matching items found
                        </div>
                    ) : (
                        filteredItems.map((item: NavItem) => (
                            <NavItemRenderer key={item.name} item={item} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}