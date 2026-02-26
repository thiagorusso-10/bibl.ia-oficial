import fs from 'fs';
import path from 'path';

export interface EbookData {
    slug: string;
    title: string;
    content: string;
}

export async function getEbookContent(slug: string): Promise<EbookData | null> {
    const filePath = path.join(process.cwd(), 'content', 'ebooks', `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Basic title extraction from first h1 or fallback to slug
    const titleMatch = content.match(/^#\s+(.*)/m);
    const title = titleMatch ? titleMatch[1] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        slug,
        title,
        content
    };
}
