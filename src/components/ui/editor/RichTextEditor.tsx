"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle as TextStyleExtension } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Code,
    Quote,
    Link as LinkIcon,
    Heading1,
    Heading2,
} from "lucide-react";

interface Props {
    value: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyleExtension,
            Color,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const Btn = ({
        onClick,
        active,
        children,
    }: {
        onClick: () => void;
        active?: boolean;
        children: React.ReactNode;
    }) => (
        <button
            onClick={onClick}
            className={`rounded-md p-2 transition ${active ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                }`}
            type="button"
        >
            {children}
        </button>
    );

    return (
        <div className="rounded-xl border border-gray-800 bg-[#0e0e11]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 rounded-t-xl border-b border-gray-800 bg-[#15151a] px-2 py-2">
                <Btn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                >
                    <Heading1 size={18} />
                </Btn>

                <Btn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                >
                    <Heading2 size={18} />
                </Btn>

                <div className="mx-1 h-5 w-px bg-white/10" />

                <Btn
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                >
                    <Bold size={18} />
                </Btn>

                <Btn
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                >
                    <Italic size={18} />
                </Btn>

                <Btn
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                >
                    <UnderlineIcon size={18} />
                </Btn>

                <div className="mx-1 h-5 w-px bg-white/10" />

                <Btn
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                >
                    <List size={18} />
                </Btn>

                <Btn
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                >
                    <ListOrdered size={18} />
                </Btn>

                <div className="mx-1 h-5 w-px bg-white/10" />

                <Btn
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive("blockquote")}
                >
                    <Quote size={18} />
                </Btn>

                <Btn
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive("codeBlock")}
                >
                    <Code size={18} />
                </Btn>

                <Btn
                    onClick={() => {
                        const url = prompt("Enter URL");
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}
                    active={editor.isActive("link")}
                >
                    <LinkIcon size={18} />
                </Btn>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="min-h-[240px] px-4 py-3 text-sm text-gray-200 prose prose-invert max-w-none focus:outline-none"
            />
        </div>
    );
}
