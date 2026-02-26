// Create products/purchases tables + seed products
// Run with: node db/seed-products.js

const dns = require("node:dns");
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

require("dotenv").config({ path: ".env.local" });
const postgres = require("postgres");
const sql = postgres(process.env.DATABASE_URL, { connect_timeout: 30 });

async function main() {
    console.log("📐 Creating products & purchases tables...\n");

    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS products (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            slug VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            price_in_cents INTEGER NOT NULL,
            kiwify_link VARCHAR(500),
            collection_slugs TEXT,
            is_active BOOLEAN DEFAULT true NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
    `);
    console.log("  ✅ products table");

    await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS purchases (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            kiwify_order_id VARCHAR(255),
            kiwify_email VARCHAR(255),
            status VARCHAR(50) DEFAULT 'approved' NOT NULL,
            purchased_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
    `);
    console.log("  ✅ purchases table");

    // Clear existing products
    await sql`DELETE FROM purchases`;
    await sql`DELETE FROM products`;

    console.log("\n🌱 Seeding 8 products...\n");

    // Individual ebooks
    await sql`
        INSERT INTO products (slug, title, description, price_in_cents, collection_slugs) VALUES
        ('ebook-plano-redencao', 'O Plano de Redenção', 'Ebook completo sobre o plano redentor de Deus.', 1990, 'o-plano-de-redencao'),
        ('ebook-visao-vt', 'Visão Geral do VT', 'Ebook panorâmico dos 39 livros do Antigo Testamento.', 1990, 'visao-geral-velho-testamento'),
        ('ebook-visao-nt', 'Visão Geral do NT', 'Ebook panorâmico dos 27 livros do Novo Testamento.', 1990, 'visao-geral-novo-testamento')
    `;
    console.log("  📖 3 ebooks individuais (R$ 19,90 cada)");

    // Individual kids packs
    await sql`
        INSERT INTO products (slug, title, description, price_in_cents, collection_slugs) VALUES
        ('kids-atividades', 'Kids — Atividades Bíblicas', '10 atividades bíblicas divertidas para imprimir.', 2790, 'fun-bible-kids:atividades'),
        ('kids-historias', 'Kids — Histórias Bíblicas', '10 histórias bíblicas ilustradas para crianças.', 2790, 'fun-bible-kids:historias')
    `;
    console.log("  🧒 2 packs kids (R$ 27,90 cada)");

    // Combos
    await sql`
        INSERT INTO products (slug, title, description, price_in_cents, collection_slugs) VALUES
        ('combo-ebooks', '🎁 COMBO — Todos os Ebooks', 'Os 3 ebooks teológicos com desconto especial.', 3990, 'o-plano-de-redencao,visao-geral-velho-testamento,visao-geral-novo-testamento'),
        ('combo-kids', '🎁 COMBO — Kids Completo', 'Atividades + Histórias bíblicas para crianças.', 3990, 'fun-bible-kids'),
        ('combo-tudo', '🏆 COMBO TUDO — Acesso Total', 'Todos os ebooks + todo o conteúdo kids. O melhor custo-benefício!', 5990, 'o-plano-de-redencao,visao-geral-velho-testamento,visao-geral-novo-testamento,fun-bible-kids')
    `;
    console.log("  🎁 3 combos (R$ 39,90, R$ 39,90, R$ 59,90)");

    const count = await sql`SELECT count(*) as total FROM products`;
    console.log(`\n✅ ${count[0].total} products seeded!`);

    await sql.end();
    process.exit(0);
}

main().catch(async (err) => {
    console.error("❌ Failed:", err.message || err);
    await sql.end();
    process.exit(1);
});
