"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Plus, Pencil, Trash2, Globe, EyeOff, X, Loader2,
  BookOpen, ExternalLink, ChevronDown, ChevronUp,
  Bold, Italic, List, ListOrdered, Quote, Code,
  Heading1, Heading2, Heading3, PlayCircle,
  ImageIcon, AlignLeft,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  listBlogPosts, createBlogPost, updateBlogPost,
  publishBlogPost, unpublishBlogPost, deleteBlogPost,
} from "@/services/blog";
import type { BlogPost, BlogPostInput } from "@/services/blog";
import { createClient } from "@/utils/supabase/client";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── TipTap Toolbar ───────────────────────────────────────────────────────────

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-1.5 rounded-md transition-colors text-[13px]",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-0.5" />;
}

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("YouTube URL:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url, width: 640, height: 360 }).run();
  };

  return (
    <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-border bg-muted/30">
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
        <Heading1 className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <Heading2 className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <Heading3 className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
        <Bold className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
        <Italic className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">
        <Code className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
        <List className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
        <Quote className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
        <AlignLeft className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={addImage} title="Insert Image URL">
        <ImageIcon className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={addYoutube} title="Embed YouTube Video">
        <PlayCircle className="w-3.5 h-3.5" />
      </ToolbarButton>
    </div>
  );
}

// ─── Post Editor Modal ────────────────────────────────────────────────────────

interface EditorModalProps {
  post: BlogPost | null;
  orgId: string;
  onClose: () => void;
  onSaved: () => void;
}

function PostEditorModal({ post, orgId, onClose, onSaved }: EditorModalProps) {
  const qc = useQueryClient();
  const isEdit = !!post;
  const [seoOpen, setSeoOpen] = useState(false);

  const [form, setForm] = useState<BlogPostInput & { seo_title: string; seo_description: string }>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    cover_image_url: post?.cover_image_url ?? "",
    seo_title: post?.seo_title ?? "",
    seo_description: post?.seo_description ?? "",
  });

  const [slugManual, setSlugManual] = useState(isEdit);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Youtube.configure({ controls: true, nocookie: true }),
      Placeholder.configure({ placeholder: "Start writing your blog post…" }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      setForm(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  // Auto-slug from title
  useEffect(() => {
    if (!slugManual) {
      setForm(prev => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, slugManual]);

  const saveMutation = useMutation({
    mutationFn: async (publish: boolean) => {
      const payload: BlogPostInput = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || undefined,
        content: form.content,
        cover_image_url: form.cover_image_url || undefined,
        seo_title: form.seo_title || undefined,
        seo_description: form.seo_description || undefined,
      };
      if (isEdit) {
        const updated = await updateBlogPost(post.id, payload);
        if (publish && !post.is_published) await publishBlogPost(post.id);
        if (!publish && post.is_published) await unpublishBlogPost(post.id);
        return updated;
      } else {
        const created = await createBlogPost(payload, orgId);
        if (publish) await publishBlogPost(created.id);
        return created;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success(isEdit ? "Post updated" : "Post created");
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const inputCls = "w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h3 className="text-[15px] font-semibold text-foreground">
            {isEdit ? "Edit Post" : "New Blog Post"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Title</label>
            <input
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="Top 5 Detailing Tips for Brisbane Summer"
              className={inputCls}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Slug</label>
            <input
              value={form.slug}
              onChange={e => { setSlugManual(true); setForm(p => ({ ...p, slug: slugify(e.target.value) })); }}
              placeholder="top-5-detailing-tips-brisbane-summer"
              className={cn(inputCls, "font-mono text-[12px]")}
            />
            <p className="text-[10px] text-muted-foreground mt-1">Will be live at /blog/{form.slug || "your-slug"}</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
              rows={2}
              placeholder="Short summary shown on blog index and landing page…"
              className={cn(inputCls, "resize-none")}
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Cover Image URL</label>
            <input
              value={form.cover_image_url}
              onChange={e => setForm(p => ({ ...p, cover_image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className={inputCls}
            />
            {form.cover_image_url && (
              <img src={form.cover_image_url} alt="cover preview" className="mt-2 h-28 w-full object-cover rounded-xl border border-border" />
            )}
          </div>

          {/* Content editor */}
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Content</label>
            <div className="border border-border rounded-xl overflow-hidden bg-background">
              <EditorToolbar editor={editor} />
              <EditorContent
                editor={editor}
                className="prose prose-sm prose-invert max-w-none min-h-[220px] px-4 py-3 focus-within:outline-none text-[13px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground/40 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
              />
            </div>
          </div>

          {/* SEO accordion */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoOpen(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-[12px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            >
              <span>SEO Settings (optional)</span>
              {seoOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {seoOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">SEO Title</label>
                  <input
                    value={form.seo_title}
                    onChange={e => setForm(p => ({ ...p, seo_title: e.target.value }))}
                    placeholder="Defaults to post title if blank"
                    className={inputCls}
                    maxLength={60}
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">{form.seo_title.length}/60 chars</p>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">SEO Description</label>
                  <textarea
                    value={form.seo_description}
                    onChange={e => setForm(p => ({ ...p, seo_description: e.target.value }))}
                    rows={2}
                    placeholder="Shown in Google search results (150–160 chars)"
                    className={cn(inputCls, "resize-none")}
                    maxLength={160}
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">{form.seo_description.length}/160 chars</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => saveMutation.mutate(false)}
              disabled={!form.title || !form.slug || saveMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              {saveMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Save Draft
            </button>
            <button
              onClick={() => saveMutation.mutate(true)}
              disabled={!form.title || !form.slug || saveMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saveMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Row ─────────────────────────────────────────────────────────────────

function PostRow({
  post, orgId, onEdit,
}: {
  post: BlogPost;
  orgId: string;
  onEdit: (p: BlogPost) => void;
}) {
  const qc = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => post.is_published ? unpublishBlogPost(post.id) : publishBlogPost(post.id),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success(updated.is_published ? "Post published" : "Post unpublished");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlogPost(post.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleDelete = () => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    deleteMutation.mutate();
  };

  return (
    <div className="flex items-center gap-3 py-3 px-4 hover:bg-muted/20 transition-colors">
      {/* Cover thumbnail */}
      <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted/40 border border-border flex items-center justify-center">
        {post.cover_image_url
          ? <img src={post.cover_image_url} alt="" className="w-full h-full object-cover" />
          : <BookOpen className="w-4 h-4 text-muted-foreground/40" />
        }
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-foreground truncate">{post.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn(
            "inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border",
            post.is_published
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-muted text-muted-foreground border-border"
          )}>
            {post.is_published ? "Published" : "Draft"}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {post.is_published && post.published_at
              ? formatDate(post.published_at)
              : `Created ${formatDate(post.created_at)}`}
          </span>
          <code className="text-[10px] text-muted-foreground/50 font-mono truncate max-w-[140px]">/{post.slug}</code>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {post.is_published && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="View live"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        <button
          onClick={() => toggleMutation.mutate()}
          disabled={toggleMutation.isPending}
          title={post.is_published ? "Unpublish" : "Publish"}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          {toggleMutation.isPending
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : post.is_published
              ? <EyeOff className="w-3.5 h-3.5" />
              : <Globe className="w-3.5 h-3.5" />
          }
        </button>
        <button
          onClick={() => onEdit(post)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title="Edit"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
          title="Delete"
        >
          {deleteMutation.isPending
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Trash2 className="w-3.5 h-3.5" />
          }
        </button>
      </div>
    </div>
  );
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────

export function BlogTab() {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [orgId, setOrgId] = useState<string>("");

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const sb = createClient();
      const { data: profile } = await sb
        .from("profiles")
        .select("organization_id")
        .eq("id", data.user.id)
        .single();
      if (profile?.organization_id) setOrgId(profile.organization_id);
    });
  }, []);

  const postsQuery = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listBlogPosts({ pageSize: 50 }),
  });

  const posts = postsQuery.data?.data ?? [];
  const published = posts.filter(p => p.is_published).length;
  const drafts = posts.filter(p => !p.is_published).length;

  const handleSaved = () => {
    setIsCreating(false);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Blog Posts</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Write and publish posts to improve your site's SEO.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Stats */}
      {posts.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[12px] font-medium text-emerald-400">{published} published</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border">
            <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[12px] font-medium text-muted-foreground">{drafts} draft{drafts !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      {/* Post list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {postsQuery.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-foreground">No blog posts yet</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">Create your first post to start building SEO.</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Write First Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {posts.map(post => (
              <PostRow
                key={post.id}
                post={post}
                orgId={orgId}
                onEdit={setEditingPost}
              />
            ))}
          </div>
        )}
      </div>

      {/* Editor modal */}
      {(isCreating || editingPost) && (
        <PostEditorModal
          post={editingPost}
          orgId={orgId}
          onClose={() => { setIsCreating(false); setEditingPost(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
