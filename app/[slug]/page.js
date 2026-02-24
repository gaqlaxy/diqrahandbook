import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PrintButton from "@/components/ui/PrintButton";
import PageTransition from "@/components/ui/PageTransition";

const contentDir = path.join(process.cwd(), "content");

export async function generateStaticParams() {
    const files = fs.readdirSync(contentDir);
    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function Page({ params }) {
    const { slug } = await params;
    const filePath = path.join(contentDir, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const source = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(source);

    return (
        <PageTransition>
            <div className="mb-12 no-print flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Overview
                </Link>
                <PrintButton />
            </div>

            <article className="max-w-3xl mx-auto prose prose-slate prose-headings:font-serif prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-10 prose-p:text-brand-muted prose-p:leading-relaxed prose-li:text-brand-muted prose-table:border prose-table:rounded-xl">
                <header className="mb-12 border-b border-brand-charcoal/5 pb-8">
                    <span className="text-brand-accent font-semibold tracking-widest uppercase text-[10px]">
                        {data.subtitle || "Protocol Documentation"}
                    </span>
                    <h1 className="text-5xl font-serif mt-2 mb-0">
                        {data.title}
                    </h1>
                </header>

                <div className="mdx-content">
                    <MDXRemote source={content} />
                </div>

                <footer className="mt-20 pt-8 border-t border-brand-charcoal/5 text-[10px] text-brand-muted italic flex items-center justify-between">
                    <div>
                        Internal documentation. Confidential & Proprietary.
                    </div>
                    <div>
                        Diqra Architecture + Infrastructure © {new Date().getFullYear()}
                    </div>
                </footer>
            </article>
        </PageTransition>
    );
}
