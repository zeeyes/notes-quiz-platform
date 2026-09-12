StudyGaurav Complete CMS — Phase 1

WHAT THIS PACKAGE HAS
- Responsive public website
- History / Polity / Quiz navigation
- Markdown editor with live preview
- .md file upload in Admin
- Notes publish/edit/delete
- Quiz builder
- User management demo
- Analytics dashboard
- Global design controls
- Visual drag/reorder page builder
- Custom CSS/HTML editor
- Export backup
- Mobile/tablet/laptop responsive UI

IMPORTANT
This package is a complete frontend CMS prototype. Browser localStorage is used for the demo so it can run immediately on Vercel/GitHub Pages.

For REAL secure multi-device operation:
1. Create a Supabase project.
2. Use Supabase Auth for admin/student login.
3. Store users, roles, pages, notes, quizzes and settings in Postgres.
4. Store uploaded .md files/images in Supabase Storage.
5. Enable Row Level Security.
6. Only an admin role may write/publish/delete content.
7. Never put a Supabase service-role key in frontend code.

DEPLOY
Upload all files in this folder to the root of your GitHub repo and commit.
Vercel will redeploy automatically.

ADMIN
Open /admin.html

PUBLIC
Open /index.html

MARKDOWN
Admin -> Notes / Markdown -> Choose .md -> Publish Note.
The demo supports headings, bold/italic, lists, links, images, tables, blockquotes and code blocks.

BUILDER
Admin -> Page Builder.
Click blocks, edit them in the inspector, drag to reorder, add new blocks and save.

DESIGN
Admin -> Design Studio.
Change primary/secondary/background/text colors, font and radius.

SECURITY NOTE
Do not treat this localStorage admin as a production authentication system. The next backend integration must move authorization and content storage to Supabase.
