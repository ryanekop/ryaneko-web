"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InstagramCard {
    title: string;
    description: string;
    cta: string;
    url: string;
    imageSrc: string;
}

interface InstagramPostEmbedsProps {
    className?: string;
    badgeLabel: string;
    title: string;
    description: string;
    posts: InstagramCard[];
}

export function InstagramPostEmbeds({
    className,
    badgeLabel,
    title,
    description,
    posts,
}: InstagramPostEmbedsProps) {
    return (
        <section className={cn("space-y-6", className)}>
            <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700 shadow-sm dark:text-rose-300">
                    {badgeLabel}
                </div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {description}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                    <article
                        key={post.url}
                        className="group w-full overflow-hidden rounded-[1.7rem] border border-border/70 bg-card/95 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                    >
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="relative block aspect-[4/3] overflow-hidden bg-muted"
                            data-umami-event="instagram-thumbnail-click"
                            data-umami-event-url={post.url}
                        >
                            <Image
                                src={post.imageSrc}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <div className="absolute left-4 top-4 rounded-full bg-background/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm">
                                Instagram
                            </div>
                        </a>

                        <div className="space-y-3 p-4">
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold leading-6">
                                    {post.title}
                                </h3>
                                <p
                                    className="text-sm leading-6 text-muted-foreground"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 4,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {post.description}
                                </p>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-rose-500/20 bg-rose-500/8 text-rose-700 hover:bg-rose-500/14 hover:text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200 dark:hover:bg-rose-400/16 dark:hover:text-rose-100"
                            >
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-umami-event="instagram-post-click"
                                    data-umami-event-url={post.url}
                                >
                                    {post.cta}
                                </a>
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
