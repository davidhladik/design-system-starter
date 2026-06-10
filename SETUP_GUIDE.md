# Design System Setup Guide
### From zero to a live, Figma-synced project — no coding experience required

**What you'll end up with:** A design system project running on your computer and published online, where the colours and visual tokens in your code are automatically kept in sync with your Figma variables. After setup, Claude Code can implement any Figma screen as production-ready code with pixel-perfect accuracy.

**Who this is for:** Designers or anyone setting up this workflow for the first time. Most steps happen inside the Claude Code app — terminal commands are only needed for a few one-time setups.

**Time to complete:** 90–120 minutes (most of it is waiting for things to install)

---

## How to use this guide

Work through each step in order. Every step ends with a ✅ verification check — don't move on until that check passes. If something doesn't work, the "🛠 If it doesn't work" sections explain common fixes.

> 💡 **Boxes like this** explain what a term means or why we're doing something. Feel free to skip them if you're already familiar.

---

# Part 0 — Install the tools (one-time setup)

These are programs that need to be on your computer before anything else. If you've done software development before, you likely have most of these already — check each section to confirm.

---

## Step 0.1 — Install Node.js

> 💡 **What is Node.js?** JavaScript was originally a language that only ran inside web browsers. Node.js lets JavaScript run on your computer directly — outside any browser. It powers most modern web development tools, including the framework we'll use (Next.js). You won't write Node.js code yourself; it just needs to be installed.

**Check if you already have it:**

Open your Terminal (on Mac: press `⌘ Space`, type "Terminal", press Enter) and run:

```bash
node --version
```

If it prints a version number like `v20.11.0`, you're good — **skip to Step 0.2**.

If it says "command not found", install it:

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the left button — LTS means Long Term Support, i.e. the stable one)
3. Run the installer and follow the prompts
4. Close your Terminal, open a new one, and run `node --version` again

**✅ Verify:** `node --version` prints a version number starting with 18 or higher.

---

## Step 0.2 — Install Git

> 💡 **What is Git?** Git is a version control system — it tracks every change you make to your project over time, like an unlimited undo history. It also lets you push your project to GitHub (a website where code is stored and shared). You don't need to understand Git deeply; we'll only use a handful of commands.

**Check if you already have it:**

```bash
git --version
```

If it prints `git version 2.x.x`, **skip to Step 0.3**.

**On Mac:** Git usually comes pre-installed. If the command above prompts you to install Xcode Command Line Tools, click Install and wait for it to finish.

**On Windows:** Download Git from [git-scm.com](https://git-scm.com/download/win) and run the installer. Keep all default options.

**✅ Verify:** `git --version` prints a version number.

---

## Step 0.3 — Create a GitHub account

> 💡 **What is GitHub?** GitHub is a website that stores Git repositories (projects) online. Think of it like Google Drive, but specifically for code. It's also where Vercel (the hosting platform we'll use) pulls your project from to put it online.

If you already have a GitHub account, **skip to Step 0.4**.

1. Go to [github.com](https://github.com)
2. Click **Sign up** and create a free account
3. Verify your email

**✅ Verify:** You can log in at [github.com](https://github.com).

---

## Step 0.4 — Create a Vercel account

> 💡 **What is Vercel?** Vercel is a hosting platform — it takes your project from GitHub and puts it on the internet so anyone with the link can access it. It's free for personal projects and was built by the same team who created Next.js, so it works seamlessly together.

If you already have a Vercel account, **skip to Step 0.5**.

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → choose **Continue with GitHub** (this links the two accounts — important for later)
3. Authorise the connection

**✅ Verify:** You can log in at [vercel.com](https://vercel.com) and see your dashboard.

---

## Step 0.5 — Install the Claude Code app

> 💡 **What is Claude Code?** Claude Code is an AI assistant with direct access to your project files. Unlike the regular Claude chat, it can read, write, and edit code files on your computer autonomously. It has a built-in terminal for running commands, a file browser, and a chat panel where you give it instructions. We'll use it to sync Figma variables into code and to implement Figma designs.

If you already have the Claude Code app installed and logged in, **skip to Step 0.6**.

1. Go to [claude.ai/download](https://claude.ai/download) and download the Claude Code app for your operating system
2. Run the installer and open the app
3. Sign in with your Anthropic account (or create a free account when prompted)

> 💡 **Terminal inside Claude Code:** The Claude Code app has a built-in terminal — a tab at the bottom of the window where you can run commands. For all the `npm` and `git` commands in this guide, use this built-in terminal instead of opening a separate Terminal app. It works exactly the same way.

**✅ Verify:** The Claude Code app opens, you're logged in, and you can see the chat panel and file browser.

---

## Step 0.6 — Enable the Figma MCP server in Claude Code

> 💡 **What is an MCP server?** MCP (Model Context Protocol) is a system that gives Claude Code access to external tools and services — in this case, Figma. Without it, Claude can only read files on your computer. With the Figma MCP enabled, Claude can open your Figma file, read layer properties, and pull variable values directly into your code.

1. Open the Claude Code app
2. Click the **Settings** icon (gear icon, usually bottom-left or top-right)
3. Go to the **Extensions** or **MCP Servers** section
4. Find **Figma** in the list and toggle it on
5. If Figma isn't listed, click **Browse** or **Add** and search for the Figma plugin
6. Save settings and restart the app

**To verify the connection**, open any project in Claude Code and type in the chat:
> *"Can you call get_metadata on this Figma URL: https://www.figma.com/design/XRJX5AmcwXFSFOMC8YmYtF/shadcn-ui-kit-Claude-test?node-id=1-2"*

If Claude returns a list of layer names, the connection is working. If it says something like "I don't have access to Figma tools", the MCP isn't enabled — go back and check Step 0.6.

**✅ Verify:** Claude responds with layer/node information from the Figma URL.

---

# Part 1 — Create the project

---

## Step 1.1 — Decide where to put your project

Your project will live in a folder on your computer. Create a dedicated folder for it first — a good place is your home folder or a `Projects` folder on your Desktop.

**Create the folder the easy way:** Open Finder (Mac) or File Explorer (Windows), navigate to where you want it, and create a new folder with the name of your project. No spaces in the name — use hyphens instead (e.g. `my-design-system`).

You'll open this folder in Claude Code in Step 1.2.

---

## Step 1.2 — Open your project folder in Claude Code and create the Next.js app

> 💡 **What is Next.js?** Next.js is a framework for building websites and web apps. A framework is a pre-built structure that handles all the common plumbing (routing between pages, server/client rendering, etc.) so you can focus on building your actual product. It's built on top of React (a popular UI library) and is what most modern production web apps are built with.

1. Open the Claude Code app
2. Click **Open Folder** (or `File → Open`) and select the project folder you created in Step 1.1
3. Claude Code will open with your folder as the workspace

Now open the **built-in terminal** — look for a Terminal tab at the bottom of the Claude Code window, or press `` Ctrl+` `` (backtick). This is where you'll run setup commands.

In the terminal, run:

```bash
npx create-next-app@latest .
```

> 💡 The `.` at the end means "create the project here, in the current folder" — so you don't end up with a folder inside a folder.

> 💡 **What is `npx`?** `npx` is a tool that comes with Node.js. It downloads and runs a package without permanently installing it. `create-next-app` is the official tool for setting up a new Next.js project.

You'll be asked a series of questions. Answer exactly as shown:

```
Would you like to use TypeScript?                   › Yes
Would you like to use ESLint?                       › Yes
Would you like to use Tailwind CSS?                 › Yes
Would you like your code inside a `src/` directory? › No
Would you like to use App Router?                   › Yes
Would you like to use Turbopack for next dev?       › Yes
What import alias would you like configured?        › @/* (just press Enter)
```

> 💡 **What are these options?**
> - **TypeScript** — a version of JavaScript that catches errors before you run your code. Keeps things reliable.
> - **ESLint** — a tool that checks your code for common mistakes automatically.
> - **Tailwind CSS** — a styling system we'll use. Explained more in Step 2.
> - **App Router** — the modern way Next.js handles navigation between pages. Always use this for new projects.
> - **Turbopack** — a faster development server. Makes reloading quicker while you work.

Once it finishes, start the development server from the same terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**✅ Verify:** You see the default Next.js welcome page in your browser. To stop the server at any time, click in the terminal and press `Ctrl+C`.

---

## Step 1.3 — Get familiar with the Claude Code layout

Your project files are now visible in the Claude Code file browser on the left side. You'll edit files directly here throughout the guide — click any file to open it.

The three areas you'll use most:
- **File browser (left panel)** — navigate and open project files
- **Chat panel (right or bottom panel)** — where you give Claude instructions
- **Terminal (bottom tab)** — where you run `npm` and `git` commands

> 💡 You can also use **VS Code** alongside Claude Code if you prefer a more traditional file editor. Download it from [code.visualstudio.com](https://code.visualstudio.com) and open the same project folder there. Both tools can be open at the same time.

**✅ Verify:** You can see files like `app/page.tsx`, `app/globals.css`, and `package.json` in the file browser.

---

# Part 2 — Upgrade the styling system

> 💡 **What is Tailwind CSS?** Tailwind is a styling system where you apply styles directly in your HTML/JSX code using short class names — like `bg-red-500` for a red background or `text-xl` for large text. Instead of writing separate CSS files, everything is inline. The version that ships with create-next-app (v3) works slightly differently from v4, which we need for our token architecture.

---

## Step 2.1 — Upgrade to Tailwind v4

In the Claude Code terminal, stop the dev server if it's running (`Ctrl+C`), then run:

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

> 💡 **What is PostCSS?** PostCSS is a tool that processes your CSS files and transforms them. Tailwind v4 works as a PostCSS plugin — it reads your CSS, processes the `@theme` directives and utility classes, and outputs standard CSS the browser can read.

---

## Step 2.2 — Update the PostCSS config

Open `postcss.config.mjs` in the Claude Code file browser (click it in the left panel) and replace its entire contents with:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## Step 2.3 — Delete `tailwind.config.ts`

> 💡 In Tailwind v4, all configuration moves into `globals.css` using an `@theme inline { }` block. The separate config file is no longer needed.

Right-click `tailwind.config.ts` in the Claude Code file browser → **Delete**.

---

## Step 2.4 — Replace `app/globals.css` with the reference file

This is the most important file in the project. It contains the entire token architecture — all colours, spacing, fonts, shadows — defined as CSS variables in three layers.

1. Open `app/globals.css` in Claude Code (click it in the file browser)
2. Select all the contents (`Cmd+A` on Mac, `Ctrl+A` on Windows)
3. Delete and paste in the entire contents of `globals.css` from the reference project
4. Save the file (`Cmd+S` / `Ctrl+S`)

> 💡 **What is a CSS variable?** A CSS variable (also called a custom property) is a named value you define once and reuse everywhere. For example, `--primary: oklch(0.5 0.2 20)` defines a variable called `--primary`. Anywhere you write `color: var(--primary)`, it uses that value. When you change it in one place, it changes everywhere.

> 💡 **What is OKLCH?** OKLCH is a modern colour format used instead of the older hex (`#ef003b`) or RGB format. It describes colours by their lightness, saturation, and hue in a way that's more perceptually uniform — meaning "halfway between light and dark" actually looks halfway, which isn't true for hex values. The project stores all colours in OKLCH with a hex comment alongside for reference: `oklch(0.5 0.23 20); /* #ef003b */`

In the terminal, restart the dev server:

```bash
npm run dev
```

**✅ Verify:** `http://localhost:3000` still loads without errors. The page may look different (the default Next.js styles are gone) — that's expected.

🛠 **If it doesn't work:** Check that you copied the entire `globals.css` contents including the `@import "tailwindcss"` line at the very top.

---

# Part 3 — Add custom fonts

---

## Step 3.1 — Add font files to the project

Create a folder called `fonts` inside the `app` folder. You can do this two ways:

**Option A — in the terminal:**
```bash
mkdir app/fonts
```

**Option B — in Claude Code's file browser:** right-click the `app` folder → **New Folder** → name it `fonts`.

Then copy your font files into `app/fonts/` — you can drag and drop them from Finder/File Explorer directly into the Claude Code file browser. The project uses:
- `PPNeueCorp-TightVariable.ttf` — the headline/display font
- `Maison Neue Book.otf` — body text (weight 400)
- `Maison Neue Demi.otf` — medium body text (weight 600)
- `Maison Neue Bold.otf` — bold body text (weight 700)

If your project uses different fonts, place those files here instead and note the filenames.

> 💡 **Font file formats:** `.ttf` is TrueType Font, `.otf` is OpenType Font, `.woff2` is a compressed web format. All work fine — use whatever files you have. Variable fonts (a single file covering all weights) are identified by "Variable" in the filename.

---

## Step 3.2 — Register fonts in `app/layout.tsx`

Open `app/layout.tsx` in the Claude Code file browser. This file wraps every page in your app — it's the best place to load fonts that should be available everywhere.

Find the imports at the top of the file and add the font imports. Then register each font using `localFont`:

```tsx
import localFont from 'next/font/local'

const ppNeueCorp = localFont({
  src: './fonts/PPNeueCorp-TightVariable.ttf',
  variable: '--font-pp-neue-corp-tight',
})

const maisonNeue = localFont({
  src: [
    { path: './fonts/Maison Neue Book.otf',  weight: '400', style: 'normal' },
    { path: './fonts/Maison Neue Demi.otf',  weight: '600', style: 'normal' },
    { path: './fonts/Maison Neue Bold.otf',  weight: '700', style: 'normal' },
  ],
  variable: '--font-maison-neue',
})
```

Then find the `<body>` tag in the same file and add both font variables to its `className`:

```tsx
<body className={`${ppNeueCorp.variable} ${maisonNeue.variable} antialiased`}>
```

> 💡 **What is `variable` here?** The `variable` property tells Next.js to inject this font as a CSS variable with that name. Once set, `var(--font-maison-neue)` anywhere in your CSS will use the Maison Neue font. The `${...}` syntax in the className adds both variable names to the HTML body tag so they're available everywhere.

---

## Step 3.3 — Add font variables to `globals.css`

Open `app/globals.css` in the file browser and find the `@theme inline { }` block near the top. Add your font variables inside it:

```css
@theme inline {
  /* ... existing entries ... */
  --font-pp-neue-corp-tight: var(--font-pp-neue-corp-tight);
  --font-maison-neue: var(--font-maison-neue);
}
```

> 💡 **Why does this look like a variable referencing itself?** The left side (`--font-pp-neue-corp-tight:`) defines a Tailwind theme token. The right side (`var(--font-pp-neue-corp-tight)`) reads the CSS variable that Next.js injected via the `variable` prop in Step 3.2. They have the same name but exist in different systems — Tailwind reads the CSS value at runtime.

**✅ Verify:** Restart the dev server (`npm run dev`). Create a test element somewhere and add `font-[family-name:var(--font-pp-neue-corp-tight)]` as a class — it should render in your display font. Delete the test afterwards.

---

# Part 4 — Connect to Figma and sync variables

This is where the magic happens. We'll connect Claude Code to your Figma file and pull the exact colour values from your Figma variables directly into `globals.css`.

---

## Step 4.1 — Copy `CLAUDE.md` and `design-tokens.md` into your project

Copy both files from the reference project into the **root** of your new project (the same folder as `package.json`).

> 💡 **What is `CLAUDE.md`?** When Claude Code starts in a project, it automatically reads `CLAUDE.md` if one exists. This file tells Claude how your project is structured — what token architecture you're using, what rules to follow when implementing designs, and how the `update variables` command works. Without it, Claude would treat this like any other project and miss all the important conventions.

> 💡 **What is `design-tokens.md`?** This file is a translation table between Figma and CSS. Figma uses path-style variable names like `colors/primary-light`. Your CSS uses `--primary-light`. `design-tokens.md` maps one to the other so Claude knows which CSS variable to update when it reads a Figma variable. You don't need to understand the contents — just make sure the file is there.

**If your Figma file uses different variable names than the reference project:** open `design-tokens.md` and update the Figma path names in the mappings to match your file. The CSS variable names on the right stay the same.

---

## Step 4.2 — Find your Figma variable collection node IDs

In your Figma file, you need to locate two specific frames/collections and copy their node IDs from the URL.

**What to look for:**

| Collection | What it contains | Node ID location |
|---|---|---|
| **Tailwind CSS** | The raw colour palette (Layer 1 primitives) | Click on the variables table frame. Copy the `node-id` from the URL bar. |
| **Mode** | The semantic brand tokens — primary, background, etc. (Layers 2 + 3) | Click on the Mode variables frame. Copy `node-id` from the URL. |

> 💡 **How to find the node ID in Figma:** Click on the frame in Figma. Look at the URL in your browser — it will have `?node-id=24065-332103` (or similar numbers). That `24065-332103` is the node ID. Copy everything after `node-id=`.

Update the "Figma collection → code mapping" table in `CLAUDE.md` with your file's actual node IDs.

---

## Step 4.3 — Open your project in Claude Code and start a session

Your project folder should already be open in Claude Code from Step 1.2. If you closed it, reopen it: **File → Open Folder** and select your project.

Claude Code automatically reads `CLAUDE.md` whenever you open a project that has one — so it already knows your token architecture, rules, and how the `update variables` command works.

To start chatting with Claude about your project, click in the **chat panel** and type your message. Claude can see all your project files and will follow the rules in `CLAUDE.md` automatically.

---

## Step 4.4 — Run the variable sync

Type this in the Claude Code **chat panel** (replace the URL with your actual Figma file URL and Mode collection node ID):

```
update variables https://www.figma.com/design/[file-key]/[filename]?node-id=[mode-node-id]
```

**What happens next:**

1. Claude reads `design-tokens.md` to load the token mappings
2. Claude calls `get_variable_defs` on your Figma node to read the live variable values
3. Claude compares every Figma value against the current CSS value in `globals.css`
4. Claude shows you a diff table:
   - ✅ Tokens that are already in sync
   - 🔴 Tokens that differ — showing the current value and the new Figma value
5. **Claude waits for your confirmation before touching any file**

Review the diff. If it looks correct, type `apply` or `yes`.

Claude will convert hex colour values to OKLCH automatically and write them into the correct places in `globals.css`.

**Repeat this for the Tailwind CSS (Layer 1) collection** using its node ID.

> 💡 **Why do we confirm before applying?** Because a single wrong colour value affects every component that uses that token. The diff step lets you catch anything unexpected before it touches real files. Never skip it.

**✅ Verify:** Open `globals.css` in VS Code — the OKLCH values should now match the colours from your Figma variables. Run `npm run dev` and confirm the page colours match your Figma design.

---

# Part 5 — Put it on GitHub

---

## Step 5.1 — Protect your API tokens

The `.claude/` folder in your project contains local Claude Code settings, which may include your Figma and Anthropic API tokens. **Never commit this to GitHub** — GitHub scans for secrets and will block your push (and your tokens could be exposed).

Open `.gitignore` in the Claude Code file browser and add these lines at the bottom:

```
# Claude local settings (may contain API tokens)
.claude/
```

Save the file.

> 💡 **What is `.gitignore`?** This file tells Git which files and folders to ignore — to never track them, never commit them, and never push them to GitHub. Any line you add here is excluded from version control permanently.

---

## Step 5.2 — Create a GitHub repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top right → **New repository**
3. Give it a name (same as your project folder, e.g. `your-project-name`)
4. Leave it **Public** or **Private** — your choice
5. **Do not** tick "Add a README file", "Add .gitignore", or "Choose a license" — your project already has these
6. Click **Create repository**
7. GitHub will show you a page with setup instructions. Copy the two lines under **"…or push an existing repository from the command line"** — they look like:

```bash
git remote add origin https://github.com/your-username/your-project-name.git
git branch -M main
```

---

## Step 5.3 — Commit and push your project

In the Claude Code **terminal** (bottom tab), run these commands one by one:

```bash
# Stage all your files for commit
git add .

# Create a commit (a snapshot of your project)
git commit -m "Initial project setup with design tokens and font registration"

# Connect to your GitHub repository (paste the line you copied in Step 5.2)
git remote add origin https://github.com/your-username/your-project-name.git

# Rename the branch to 'main' (modern convention)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

> 💡 **What is a commit?** A commit is a saved snapshot of your project at a point in time. Think of it like a save state in a video game. Every commit has a message describing what changed. The entire history of commits makes up your project's version history.

> 💡 **What is a branch?** A branch is a parallel version of your project. `main` is the default branch — the "official" version. We rename to `main` for consistency since GitHub uses this naming convention.

**✅ Verify:** Refresh your GitHub repository page — you should see all your project files listed there.

🛠 **If the push is blocked with "secret scanning" error:** GitHub found an API token in one of your files. This usually means `.claude/settings.local.json` was included. Run these commands to fix it:

```bash
git filter-branch --force --index-filter \
  'git rm -r --cached --ignore-unmatch .claude/' \
  --prune-empty --tag-name-filter cat -- --all
git push --force origin main
```

Then rotate your API tokens — check [anthropic.com](https://console.anthropic.com) and [figma.com](https://www.figma.com/settings) to revoke and regenerate them.

---

# Part 6 — Deploy to Vercel

---

## Step 6.1 — Import your project to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New… → Project**
3. You'll see a list of your GitHub repositories — find yours and click **Import**
4. Vercel auto-detects Next.js and configures everything automatically
5. Click **Deploy**

Wait 1–2 minutes while it builds. You'll see a live progress log.

**✅ Verify:** Vercel shows a green "Congratulations" screen with a preview of your site. Click the URL to open it.

---

## Step 6.2 — Make the link publicly accessible

By default, Vercel requires visitors to log in with a Vercel account before they can see your site. Turn this off:

1. Go to your project on Vercel
2. Click **Settings** (top navigation)
3. Click **Deployment Protection** in the left sidebar
4. Set the protection to **Disabled**
5. Save

Now anyone with your `.vercel.app` link can open the site without logging in.

---

## Step 6.3 — Redirect the root URL to your main page

Right now, visiting `your-project.vercel.app` shows the default page. To redirect it to your actual project page, open `next.config.mjs` in VS Code and update it:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/your-main-page',   // e.g. '/strv-dashboard'
        permanent: false,
      },
    ]
  },
}

export default nextConfig
```

Save, then push the change to GitHub:

```bash
git add next.config.mjs
git commit -m "Redirect root to main page"
git push
```

Vercel will automatically redeploy within ~1 minute whenever you push to GitHub.

**✅ Verify:** Visit your Vercel URL — it redirects to your main page automatically.

---

# You're done 🎉

Here's what you now have:

| | What it is |
|---|---|
| ✅ Next.js project running locally | A fully working web app on `http://localhost:3000` |
| ✅ Tailwind v4 with three-layer tokens | All colours and design values as CSS variables |
| ✅ Custom fonts registered | Available everywhere as CSS variables |
| ✅ CSS variables 1:1 aligned with Figma | Every token value pulled directly from Figma |
| ✅ Claude Code configured | Knows your project rules and token architecture |
| ✅ GitHub repository | Full version history, safe from accidental loss |
| ✅ Live Vercel deployment | Share the link with anyone |

---

# Day-to-day usage

## Implementing a Figma design

Open your project in the Claude Code app and type in the chat panel:

> *"Implement this design: https://www.figma.com/design/[file-key]/...?node-id=[node-id]"*

Claude will read your Figma frame section by section, extract every value, and write production-ready code that matches the design pixel-perfectly. The rules it follows are defined in `CLAUDE.md` — you don't need to tell Claude how to do this.

## Keeping variables in sync after a Figma update

Whenever a designer updates variables in Figma, type in the chat panel:

```
update variables [figma-url-with-node-id]
```

Claude always shows a diff before making any changes. You review and confirm.

## Deploying a change

Every push to GitHub redeploys Vercel automatically. In the Claude Code terminal:

```bash
git add .
git commit -m "Describe what changed"
git push
```

---

# Glossary

| Term | Plain English |
|---|---|
| **Terminal** | A text-based interface for running commands. In this guide, always use the built-in terminal inside the Claude Code app (bottom tab), not a separate Terminal app. |
| **Claude Code app** | A desktop application by Anthropic. It combines a chat interface with direct access to your project files, a file browser, and a built-in terminal. |
| **npm** | The package manager that comes with Node.js. Used to install libraries and run project scripts. |
| **Repository (repo)** | A project tracked by Git. Contains all your files plus their full change history. |
| **Commit** | A saved snapshot of your project. Like a save state. |
| **Push** | Sending your local commits up to GitHub. |
| **Branch** | A parallel version of your project. `main` is the primary one. |
| **CSS variable** | A named value in CSS that can be reused everywhere: `--primary: oklch(...)`. Referenced with `var(--primary)`. |
| **OKLCH** | A modern colour format. More accurate than hex for defining colours that look consistent across different screens. |
| **Token** | A named design value (colour, spacing, font size) that can be used across both Figma and code. |
| **MCP server** | A plugin system for Claude Code that gives it access to external tools like Figma. |
| **Tailwind** | A CSS utility framework where you style elements using class names directly in your HTML/JSX. |
| **Next.js** | A framework for building web apps with React. Handles routing, rendering, and deployment plumbing. |
| **Vercel** | A hosting platform. Takes your GitHub repo and puts it on the internet. |
