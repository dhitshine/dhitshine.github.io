# Personal Website

This repository contains the source code for my personal website and blog, built using the AstroPaper theme with Astro, TypeScript, and TailwindCSS.

## Overview

This website serves as my personal space on the web where I share my thoughts, write-ups on deep learning, systems programming, and other topics.

- Website: https://dhitshine.github.io/
- Author: Radhit Akriandra

## Technologies Used

- Main Framework: Astro
- Type Checking: TypeScript
- Styling: TailwindCSS
- Search: Pagefind
- Formatting: Prettier
- Deployment: GitHub Pages

## Project Structure

Inside this project, you will find:

- public: Static assets including the favicon and default OG image.
- src/assets: Icons and local images.
- src/components: Reusable Astro components.
- src/content/pages: Static pages (e.g., About page).
- src/content/posts: Blog posts in Markdown format.
- src/layouts: Layout components.
- src/pages: Routing pages and endpoints.
- src/styles: Global and custom CSS stylesheets.

## Running Locally

To run this project locally, clone the repository and execute the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Deployment

The website is configured to deploy automatically to GitHub Pages using GitHub Actions when changes are pushed to the main branch. The workflow is configured in .github/workflows/deploy.yml.

## License

This project is licensed under the MIT License.
