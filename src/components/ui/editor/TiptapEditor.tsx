
import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Image as ImageIcon,
    Table as TableIcon,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
    MoreHorizontal,
} from 'lucide-react';

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
    content,
    onChange,
    placeholder = 'Write something...',
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-brand-500 hover:underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 font-bold p-2 text-left',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 dark:border-gray-700 p-2',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
        immediatelyRender: false,
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children,
        title,
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
        title?: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`p-1.5 rounded-md transition-colors ${isActive
                ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
            {/* Toolbar */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-2 flex gap-1 flex-wrap items-center">
                {/* Headings */}
                <div className="flex gap-1 pr-2 border-r border-gray-200 dark:border-gray-700">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </ToolbarButton>
                </div>

                {/* Basic Formatting */}
                <div className="flex gap-1 pr-2 border-r border-gray-200 dark:border-gray-700 ml-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        title="Underline"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </ToolbarButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 pr-2 border-r border-gray-200 dark:border-gray-700 ml-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        title="Align Left"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        title="Align Center"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        title="Align Right"
                    >
                        <AlignRight className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        isActive={editor.isActive({ textAlign: 'justify' })}
                        title="Align Justify"
                    >
                        <AlignJustify className="w-4 h-4" />
                    </ToolbarButton>
                </div>


                {/* Lists & Indent */}
                <div className="flex gap-1 pr-2 border-r border-gray-200 dark:border-gray-700 ml-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        title="Ordered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="Blockquote"
                    >
                        <Quote className="w-4 h-4" />
                    </ToolbarButton>
                </div>

                {/* Inserts */}
                <div className="flex gap-1 pr-2 border-r border-gray-200 dark:border-gray-700 ml-1">
                    <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Insert Link">
                        <LinkIcon className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={addImage} title="Insert Image">
                        <ImageIcon className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                        title="Insert Table (3x3)"
                    >
                        <TableIcon className="w-4 h-4" />
                    </ToolbarButton>
                </div>

                {/* Undo/Redo */}
                <div className="flex gap-1 ml-auto">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </ToolbarButton>
                </div>
            </div>

            {/* Table Context Menu (Example - visible when table is active) */}
            {editor.isActive('table') && (
                <div className="items-center bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-1 flex gap-2 text-xs overflow-x-auto">
                    <span className="text-gray-500 px-2">Table:</span>
                    <button onClick={() => editor.chain().focus().addColumnBefore().run()} className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">Add Col Before</button>
                    <button onClick={() => editor.chain().focus().addColumnAfter().run()} className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">Add Col After</button>
                    <button onClick={() => editor.chain().focus().deleteColumn().run()} className="px-2 py-1 hover:bg-red-100 text-red-600 rounded">Del Col</button>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                    <button onClick={() => editor.chain().focus().addRowBefore().run()} className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">Add Row Before</button>
                    <button onClick={() => editor.chain().focus().addRowAfter().run()} className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">Add Row After</button>
                    <button onClick={() => editor.chain().focus().deleteRow().run()} className="px-2 py-1 hover:bg-red-100 text-red-600 rounded">Del Row</button>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                    <button onClick={() => editor.chain().focus().deleteTable().run()} className="px-2 py-1 hover:bg-red-100 text-red-600 rounded">Delete Table</button>
                </div>
            )}

            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
