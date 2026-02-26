SPECS (Especificações Técnicas)  
**Stack:** Next.js 14+ (App Router), Tailwind CSS, Shadcn/ui (Customizado), Supabase, Drizzle ORM, Clerk, Resend.  
1\. Schema do Banco de Dados (Drizzle)  
• `users` (Sync com Clerk): `id`, `email`, `role` (user/admin).  
• `collections` (Ex: "Teologia Sistemática" ou "Fun Bible Kids"):  
    ◦ `id`, `title`, `slug`, `type` (ENUM: 'COURSE', 'RESOURCE\_BANK').  
• `content_items`:  
    ◦ `id`, `collection_id` (FK), `title`.  
    ◦ `content_type` (ENUM: 'TEXT\_CHAPTER', 'PDF\_FILE', 'SLIDE\_STORY').  
    ◦ `text_content` (Text \- para os estudos adultos).  
    ◦ `file_url` (String \- para os PDFs infantis no Supabase Storage).  
    ◦ `category_tag` (String \- ex: 'Matemática', 'Antigo Testamento').  
• `user_progress`:  
    ◦ `user_id`, `content_item_id`, `is_completed`, `last_accessed`.  
2\. Componentes de UI (Design System)  
• **NeoCard:** Um card base com borda preta grossa e sombra dura.  
• **NeoButton:** Botão retangular, hover translada 2px para baixo removendo a sombra (efeito de "clique" tátil).  
• **ReaderLayout:** Layout focado em texto, sem distrações, inspirado em plataformas de leitura como Medium ou Substack, mas com bordas brutas.  
