import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { routes } from "@/config/routes";
import type { BlogPost } from "@/data/blog";
import { EASE_FAST } from "@/utils/motion";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={routes.blogPost(post.slug)}
      className={`group flex flex-col gap-4 rounded-technical border border-border bg-surface p-6 transition-colors ${EASE_FAST} hover:border-border-strong hover:bg-surface-hover`}
    >
      <Badge tone="accent" className="w-fit">
        {post.category}
      </Badge>
      <h3 className={`text-lg font-semibold text-fg transition-colors ${EASE_FAST} group-hover:text-accent`}>
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
      <div className="mt-auto flex items-center gap-2 pt-2 font-mono text-xs text-fg-subtle">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
