// Create schema + seed in one script (CJS, with DNS fix)
// Run with: node db/seed-run.js

const dns = require("node:dns");

// 1. DNS Fix
const origLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
    const cb = typeof options === "function" ? options : callback;
    const opts = typeof options === "function" ? {} : options;
    origLookup.call(dns, hostname, opts, (err, address, family) => {
        if (!err) return cb(null, address, family);
        dns.resolve4(hostname, (err4, addresses) => {
            if (!err4 && addresses.length > 0) return cb(null, addresses[0], 4);
            dns.resolve6(hostname, (err6, addresses6) => {
                if (!err6 && addresses6.length > 0) return cb(null, addresses6[0], 6);
                cb(err);
            });
        });
    });
};

// 2. Load env
require("dotenv").config({ path: ".env.local" });

// 3. Connect
const postgres = require("postgres");
const sql = postgres(process.env.DATABASE_URL, { connect_timeout: 30 });

async function createSchema() {
    console.log("📐 Creating schema...\n");

    // Enums
    await sql.unsafe(`
        DO $$ BEGIN
            CREATE TYPE collection_type AS ENUM ('COURSE', 'RESOURCE_BANK');
        EXCEPTION WHEN duplicate_object THEN null;
        END $$;
    `);
    await sql.unsafe(`
        DO $$ BEGIN
            CREATE TYPE content_type AS ENUM ('TEXT_CHAPTER', 'PDF_FILE', 'SLIDE_STORY');
        EXCEPTION WHEN duplicate_object THEN null;
        END $$;
    `);
    await sql.unsafe(`
        DO $$ BEGIN
            CREATE TYPE user_role AS ENUM ('user', 'admin');
        EXCEPTION WHEN duplicate_object THEN null;
        END $$;
    `);
    console.log("  ✅ Enums created");

    // Users table
    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            clerk_id VARCHAR(255) NOT NULL UNIQUE,
            email TEXT NOT NULL,
            name TEXT,
            role user_role DEFAULT 'user' NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
    `);
    console.log("  ✅ users table");

    // Collections table
    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS collections (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            description TEXT,
            type collection_type NOT NULL,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
    `);
    console.log("  ✅ collections table");

    // Content items table
    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS content_items (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            collection_id UUID NOT NULL REFERENCES collections(id),
            title TEXT NOT NULL,
            order_index INTEGER NOT NULL,
            content_type content_type NOT NULL,
            text_content TEXT,
            file_url TEXT,
            category_tag TEXT,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
    `);
    console.log("  ✅ content_items table");

    // User progress table
    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id),
            content_item_id UUID NOT NULL REFERENCES content_items(id),
            completed BOOLEAN DEFAULT false NOT NULL,
            completed_at TIMESTAMP,
            UNIQUE(user_id, content_item_id)
        );
    `);
    console.log("  ✅ user_progress table");
}

async function seed() {
    console.log("\n🌱 Seeding database...\n");

    // Clear existing data
    await sql`DELETE FROM user_progress`;
    await sql`DELETE FROM content_items`;
    await sql`DELETE FROM collections`;
    console.log("  🗑️  Cleared existing data");

    // Collections
    const [redemption] = await sql`
        INSERT INTO collections (title, slug, description, type, image_url)
        VALUES ('O Plano de Redenção', 'o-plano-de-redencao',
            'Um estudo profundo sobre o plano redentor de Deus desde a criação até a consumação.',
            'COURSE', '/images/ebooks/plano-de-redencao-capa.png')
        RETURNING id
    `;
    const [vt] = await sql`
        INSERT INTO collections (title, slug, description, type, image_url)
        VALUES ('Visão Geral do Velho Testamento', 'visao-geral-velho-testamento',
            'Uma panorâmica completa dos 39 livros do Antigo Testamento.',
            'COURSE', '/images/ebooks/visao-geral-vt-capa.png')
        RETURNING id
    `;
    const [nt] = await sql`
        INSERT INTO collections (title, slug, description, type, image_url)
        VALUES ('Visão Geral do Novo Testamento', 'visao-geral-novo-testamento',
            'Uma panorâmica completa dos 27 livros do Novo Testamento.',
            'COURSE', '/images/ebooks/visao-geral-nt-capa.png')
        RETURNING id
    `;
    const [kids] = await sql`
        INSERT INTO collections (title, slug, description, type, image_url)
        VALUES ('Fun Bible Kids', 'fun-bible-kids',
            'Atividades bíblicas divertidas para crianças!',
            'RESOURCE_BANK', '/images/kids-zone.jpg')
        RETURNING id
    `;
    console.log("  📦 4 collections");

    // Ebooks
    await sql`
        INSERT INTO content_items (collection_id, title, order_index, content_type, file_url, category_tag) VALUES
        (${redemption.id}, 'O Plano de Redenção — Ebook', 1, 'PDF_FILE', '/pdfs/ebooks/plano-de-redencao.pdf', 'Ebook'),
        (${vt.id}, 'Visão Geral do VT — Ebook', 1, 'PDF_FILE', '/pdfs/ebooks/visao-geral-vt.pdf', 'Ebook'),
        (${nt.id}, 'Visão Geral do NT — Ebook', 1, 'PDF_FILE', '/pdfs/ebooks/visao-geral-nt.pdf', 'Ebook')
    `;
    console.log("  📖 3 ebooks");

    // Kids Activities
    await sql`
        INSERT INTO content_items (collection_id, title, order_index, content_type, file_url, category_tag) VALUES
        (${kids.id}, 'Caça Palavras Bíblico', 1, 'PDF_FILE', '/pdfs/kids/caca-palavras.pdf', 'Caça Palavras'),
        (${kids.id}, 'Caligrafia Bíblica', 2, 'PDF_FILE', '/pdfs/kids/caligrafia.pdf', 'Caligrafia'),
        (${kids.id}, 'Caminhos Bíblicos', 3, 'PDF_FILE', '/pdfs/kids/caminhos-biblicos.pdf', 'Caminhos'),
        (${kids.id}, 'Cruzadinha Bíblica', 4, 'PDF_FILE', '/pdfs/kids/cruzadinha.pdf', 'Cruzadinha'),
        (${kids.id}, 'Desenhos Bíblicos para Colorir', 5, 'PDF_FILE', '/pdfs/kids/desenhos-biblicos.pdf', 'Colorir'),
        (${kids.id}, 'Detetive Bíblico', 6, 'PDF_FILE', '/pdfs/kids/detetive.pdf', 'Detetive'),
        (${kids.id}, 'Matemática Bíblica', 7, 'PDF_FILE', '/pdfs/kids/matematica-biblica.pdf', 'Matemática'),
        (${kids.id}, 'Pesquisa Bíblica', 8, 'PDF_FILE', '/pdfs/kids/pesquisa.pdf', 'Pesquisa'),
        (${kids.id}, 'Quiz Bíblico', 9, 'PDF_FILE', '/pdfs/kids/quiz.pdf', 'Quiz'),
        (${kids.id}, 'Ligue as Sombras', 10, 'PDF_FILE', '/pdfs/kids/ligue-as-sombras.pdf', 'Ligue as Sombras')
    `;
    console.log("  🧩 10 activities");

    // Kids Stories
    await sql`
        INSERT INTO content_items (collection_id, title, order_index, content_type, file_url, category_tag) VALUES
        (${kids.id}, 'Davi contra Golias', 11, 'SLIDE_STORY', '/pdfs/kids/historias/davi-contra-golias.pdf', 'História'),
        (${kids.id}, 'A Pesca Milagrosa', 12, 'SLIDE_STORY', '/pdfs/kids/historias/pesca-milagrosa.pdf', 'História'),
        (${kids.id}, 'Ressurreição de Lázaro', 13, 'SLIDE_STORY', '/pdfs/kids/historias/ressurreicao-de-lazaro.pdf', 'História'),
        (${kids.id}, 'O Milagre na Estrada de Damasco', 14, 'SLIDE_STORY', '/pdfs/kids/historias/estrada-de-damasco.pdf', 'História'),
        (${kids.id}, 'José do Egito', 15, 'SLIDE_STORY', '/pdfs/kids/historias/jose-do-egito.pdf', 'História'),
        (${kids.id}, 'O Profeta Elias', 16, 'SLIDE_STORY', '/pdfs/kids/historias/profeta-elias.pdf', 'História'),
        (${kids.id}, 'O Profeta Daniel', 17, 'SLIDE_STORY', '/pdfs/kids/historias/profeta-daniel.pdf', 'História'),
        (${kids.id}, 'O Milagre em Caná', 18, 'SLIDE_STORY', '/pdfs/kids/historias/milagre-em-cana.pdf', 'História'),
        (${kids.id}, 'Sansão', 19, 'SLIDE_STORY', '/pdfs/kids/historias/sansao.pdf', 'História'),
        (${kids.id}, 'A Obediência de Ló', 20, 'SLIDE_STORY', '/pdfs/kids/historias/obediencia-de-lo.pdf', 'História')
    `;
    console.log("  📚 10 stories");

    console.log("\n✅ Seed completed! 4 collections, 23 content items.");
}

async function main() {
    try {
        await createSchema();
        await seed();
    } catch (err) {
        console.error("❌ Failed:", err.message || err);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

main();
