"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft, Settings2, Globe, FileText, Loader2,
  Bold, Italic, Code, List, ListOrdered, Quote, AlignLeft,
  Heading1, Heading2, Heading3, ImageIcon, PlayCircle,
  Eye, EyeOff, Check, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  createBlogPost, updateBlogPost, publishBlogPost, unpublishBlogPost,
} from "@/services/blog";
import type { BlogPost, BlogPostInput } from "@/services/blog";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

function ToolBtn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      title={title}
      className={cn(
        "p-1.5 rounded-md text-[13px] transition-colors",
        active
          ? "bg-white/15 text-white"
          : "text-white/50 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-4 bg-white/10 mx-0.5 shrink-0" />;
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Paste image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("Paste YouTube URL:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url, width: 720, height: 405 }).run();
  };

  return (
    <div className="sticky top-[57px] z-10 flex items-center flex-wrap gap-0.5 px-4 py-2 border-b border-white/[0.07] bg-[#1a1a1a]/95 backdrop-blur-sm">
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 className="w-4 h-4" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><Code className="w-4 h-4" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List"><ListOrdered className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote"><Quote className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><AlignLeft className="w-4 h-4" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={addImage} title="Insert Image"><ImageIcon className="w-4 h-4" /></ToolBtn>
      <ToolBtn onClick={addYoutube} title="Embed YouTube"><PlayCircle className="w-4 h-4" /></ToolBtn>
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  form, onChange, isPublished, wordCount,
}: {
  form: FormState;
  onChange: (f: Partial<FormState>) => void;
  isPublished: boolean;
  wordCount: number;
}) {
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none";

  return (
    <div className="flex flex-col gap-0 divide-y divide-white/[0.07]">

      {/* Status */}
      <div className="p-4">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">Status</p>
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium border",
          isPublished
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-white/5 border-white/10 text-white/60"
        )}>
          {isPublished ? <Globe className="w-3.5 h-3.5 shrink-0" /> : <FileText className="w-3.5 h-3.5 shrink-0" />}
          {isPublished ? "Published" : "Draft"}
        </div>
        <p className="text-[11px] text-white/30 mt-2">{wordCount} words</p>
      </div>

      {/* Slug */}
      <div className="p-4">
        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">URL Slug</label>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <span className="text-[11px] text-white/30 shrink-0">/blog/</span>
          <input
            value={form.slug}
            onChange={e => onChange({ slug: slugify(e.target.value), slugManual: true })}
            className="flex-1 bg-transparent text-[12px] text-white font-mono focus:outline-none min-w-0"
            placeholder="your-slug"
          />
        </div>
      </div>

      {/* Cover image */}
      <div className="p-4">
        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">Cover Image</label>
        <input
          value={form.cover_image_url}
          onChange={e => onChange({ cover_image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
          className={inputCls}
        />
        {form.cover_image_url && (
          <div className="mt-2 rounded-lg overflow-hidden aspect-video bg-white/5 relative group">
            <img src={form.cover_image_url} alt="cover" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange({ cover_image_url: "" })}
              className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div className="p-4">
        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={e => onChange({ excerpt: e.target.value })}
          rows={3}
          placeholder="Short summary shown on blog index and landing page…"
          className={inputCls}
        />
      </div>

      {/* SEO */}
      <div className="p-4 space-y-3">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">SEO</p>
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5">SEO Title</label>
          <input
            value={form.seo_title}
            onChange={e => onChange({ seo_title: e.target.value })}
            placeholder="Defaults to post title"
            maxLength={60}
            className={inputCls}
          />
          <div className="flex justify-end mt-1">
            <span className={cn("text-[10px]", form.seo_title.length > 55 ? "text-amber-400" : "text-white/25")}>
              {form.seo_title.length}/60
            </span>
          </div>
        </div>
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5">Meta Description</label>
          <textarea
            value={form.seo_description}
            onChange={e => onChange({ seo_description: e.target.value })}
            rows={3}
            placeholder="Shown in Google results (150–160 chars)"
            maxLength={160}
            className={inputCls}
          />
          <div className="flex justify-end mt-1">
            <span className={cn("text-[10px]", form.seo_description.length > 150 ? "text-emerald-400" : form.seo_description.length > 0 ? "text-amber-400" : "text-white/25")}>
              {form.seo_description.length}/160
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  slug: string;
  slugManual: boolean;
  excerpt: string;
  cover_image_url: string;
  content: string;
  seo_title: string;
  seo_description: string;
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

interface BlogEditorPageProps {
  post?: BlogPost | null;
  orgId: string;
}

export function BlogEditorPage({ post, orgId }: BlogEditorPageProps) {
  const router = useRouter();
  const isEdit = !!post;
  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState<FormState>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    slugManual: isEdit,
    excerpt: post?.excerpt ?? "",
    cover_image_url: post?.cover_image_url ?? "",
    content: post?.content ?? "",
    seo_title: post?.seo_title ?? "",
    seo_description: post?.seo_description ?? "",
  });

  const updateForm = useCallback((f: Partial<FormState>) => {
    setForm(prev => {
      const next = { ...prev, ...f };
      if (!next.slugManual && f.title !== undefined) {
        next.slug = slugify(f.title);
      }
      return next;
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({ inline: false, allowBase64: false }),
      Youtube.configure({ controls: true, nocookie: true }),
      Placeholder.configure({ placeholder: "Start writing your blog post…" }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      updateForm({ content: editor.getHTML() });
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[60vh] leading-relaxed",
      },
    },
  });

  const wordCount = form.content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  // ── Build payload ──────────────────────────────────────────────────────────

  const buildPayload = (): BlogPostInput => ({
    title: form.title || "Untitled",
    slug: form.slug || slugify(form.title || "untitled"),
    excerpt: form.excerpt || undefined,
    content: form.content,
    cover_image_url: form.cover_image_url || undefined,
    seo_title: form.seo_title || undefined,
    seo_description: form.seo_description || undefined,
  });

  // ── Save draft ─────────────────────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = buildPayload();
      if (postId) {
        return updateBlogPost(postId, payload);
      } else {
        const created = await createBlogPost(payload, orgId);
        setPostId(created.id);
        // Update URL without full navigation
        window.history.replaceState({}, "", `/dashboard/blog/${created.id}`);
        return created;
      }
    },
    onMutate: () => setSaveStatus("saving"),
    onSuccess: () => {
      setSaveStatus("saved");
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => setSaveStatus("idle"), 2500);
    },
    onError: (e: Error) => {
      setSaveStatus("idle");
      toast.error(e.message);
    },
  });

  // ── Publish / Unpublish ────────────────────────────────────────────────────

  const publishMutation = useMutation({
    mutationFn: async () => {
      let id = postId;
      if (!id) {
        const created = await createBlogPost(buildPayload(), orgId);
        id = created.id;
        setPostId(created.id);
        window.history.replaceState({}, "", `/dashboard/blog/${created.id}`);
      } else {
        await updateBlogPost(id, buildPayload());
      }
      if (isPublished) {
        await unpublishBlogPost(id);
        setIsPublished(false);
        toast.success("Post unpublished");
      } else {
        await publishBlogPost(id);
        setIsPublished(true);
        toast.success("Post published — now live at /blog/" + (form.slug || "untitled"));
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const isBusy = saveMutation.isPending || publishMutation.isPending;

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 h-[57px] flex items-center justify-between gap-4 px-4 border-b border-white/[0.07] bg-[#111111]/95 backdrop-blur-sm shrink-0">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard?tab=blog")}
            className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Blog</span>
          </button>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[13px] text-white/40 truncate max-w-[180px] sm:max-w-xs">
            {form.title || "Untitled post"}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save status */}
          <span className={cn(
            "text-[11px] transition-all duration-300 hidden sm:flex items-center gap-1",
            saveStatus === "saving" ? "text-white/40" :
            saveStatus === "saved"  ? "text-emerald-400" : "text-transparent"
          )}>
            {saveStatus === "saving" && <Loader2 className="w-3 h-3 animate-spin" />}
            {saveStatus === "saved"  && <Check className="w-3 h-3" />}
            {saveStatus === "saving" ? "Saving…" : "Saved"}
          </span>

          {/* Save draft */}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={isBusy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-white/70 border border-white/10 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50"
          >
            {saveMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Publish / Unpublish */}
          <button
            onClick={() => publishMutation.mutate()}
            disabled={isBusy || !form.title}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors disabled:opacity-50",
              isPublished
                ? "bg-white/10 text-white/70 hover:bg-white/15 border border-white/10"
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {publishMutation.isPending
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : isPublished
                ? <EyeOff className="w-3.5 h-3.5" />
                : <Globe className="w-3.5 h-3.5" />
            }
            {isPublished ? "Unpublish" : "Publish"}
          </button>

          {/* Settings toggle */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            title="Toggle settings"
            className={cn(
              "p-2 rounded-lg transition-colors border",
              sidebarOpen
                ? "bg-white/10 text-white border-white/20"
                : "text-white/50 border-white/10 hover:text-white hover:bg-white/5"
            )}
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Editor column */}
        <div className="flex-1 min-w-0 flex flex-col">

          <Toolbar editor={editor} />

          {/* Writing area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 sm:px-12 py-10">

              {/* Title */}
              <input
                value={form.title}
                onChange={e => updateForm({ title: e.target.value })}
                placeholder="Post title"
                className="w-full bg-transparent text-3xl sm:text-4xl font-bold text-white placeholder:text-white/20 focus:outline-none mb-2 leading-tight"
              />

              {/* Slug preview */}
              <p className="text-[12px] text-white/25 mb-8 font-mono">
                /blog/<span className="text-white/40">{form.slug || slugify(form.title) || "your-slug"}</span>
              </p>

              {/* Cover preview in editor (if set) */}
              {form.cover_image_url && (
                <div className="rounded-xl overflow-hidden mb-8 aspect-video">
                  <img src={form.cover_image_url} alt="cover" className="w-full h-full object-cover" />
                </div>
              )}

              {/* TipTap */}
              <div className="prose prose-invert max-w-none text-[16px] text-white/80
                [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h1]:mt-8 [&_.ProseMirror_h1]:mb-4
                [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h2]:mt-6 [&_.ProseMirror_h2]:mb-3
                [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-white [&_.ProseMirror_h3]:mt-5 [&_.ProseMirror_h3]:mb-2
                [&_.ProseMirror_p]:text-white/75 [&_.ProseMirror_p]:mb-4 [&_.ProseMirror_p]:leading-[1.8]
                [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-4 [&_.ProseMirror_ul]:text-white/75
                [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-4 [&_.ProseMirror_ol]:text-white/75
                [&_.ProseMirror_li]:mb-1.5
                [&_.ProseMirror_blockquote]:border-l-[3px] [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:text-white/50 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:mb-4
                [&_.ProseMirror_code]:bg-white/10 [&_.ProseMirror_code]:text-white/80 [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-[0.875em] [&_.ProseMirror_code]:font-mono
                [&_.ProseMirror_pre]:bg-white/5 [&_.ProseMirror_pre]:border [&_.ProseMirror_pre]:border-white/10 [&_.ProseMirror_pre]:rounded-xl [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:mb-4 [&_.ProseMirror_pre]:overflow-x-auto
                [&_.ProseMirror_img]:rounded-xl [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:mb-4
                [&_.ProseMirror_iframe]:rounded-xl [&_.ProseMirror_iframe]:w-full [&_.ProseMirror_iframe]:mb-4
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-white/20 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
              ">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Settings sidebar ────────────────────────────────────────────── */}
        <aside className={cn(
          "shrink-0 border-l border-white/[0.07] bg-[#161616] overflow-y-auto transition-all duration-200",
          sidebarOpen ? "w-72" : "w-0 overflow-hidden border-l-0"
        )}>
          {sidebarOpen && (
            <SettingsPanel
              form={form}
              onChange={updateForm}
              isPublished={isPublished}
              wordCount={wordCount}
            />
          )}
        </aside>
      </div>
    </div>
  );
}
