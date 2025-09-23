# About Me Website

A personal portfolio website built with React, TypeScript, and styled-components.

## Features

- 🎨 Custom design system with your color palette
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 Clean, modern UI with Inter font family
- ⚡ Fast and optimized React application
- 🏗️ Well-structured component architecture
- 🎭 Styled-components with theme provider

## Color Palette

- **Background**: Cream (#f5f5dc)
- **Text**: Dark Gray (#333)
- **Accent**: Red (#c5004a) and Dark Red (#7f0036)
- **Supporting**: Navy (#17050f), Blue (#082840), Light Gray (#e0e0e0)

## Typography

- **Font Family**: Inter (Regular, Bold, Extra Bold, Italic)
- **Responsive**: Optimized for all screen sizes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Container, Section
│   ├── Typography/     # Heading, Text
│   ├── Card/          # Card component
│   └── ThemeProvider.tsx
├── theme/              # Design system
│   ├── colors.ts      # Color palette
│   ├── typography.ts  # Font configuration
│   ├── breakpoints.ts # Responsive breakpoints
│   ├── spacing.ts     # Spacing scale
│   └── index.ts       # Theme export
├── types/              # TypeScript definitions
└── App.tsx            # Main application
```

## Customization

To customize the content:

1. Edit the personal information in `src/App.tsx`
2. Update skills, experience, and contact information
3. Modify the color scheme in `src/theme/colors.ts`
4. Adjust spacing and typography in the respective theme files

## Build

To create a production build:

```bash
npm run build
```

The build files will be in the `build/` directory, ready for deployment.

## Deployment

This project can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
