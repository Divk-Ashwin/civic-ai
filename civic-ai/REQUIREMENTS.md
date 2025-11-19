# CivicAI - Requirements & Setup Instructions

## Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher

## Installation Instructions

### 1. Clone or Copy the Project
```bash
cd "Z:\Hacknovate Project\civic-ai"
```

### 2. Install All Dependencies
```bash
npm install
```

This will automatically install all packages listed below from `package.json`.

## Dependencies (Production)

```json
{
  "clsx": "^2.1.1",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.554.0",
  "next": "16.0.3",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-leaflet": "^4.2.1",
  "react-media-recorder": "^1.7.2",
  "recharts": "^3.4.1",
  "sonner": "^2.0.7",
  "tailwind-merge": "^3.4.0"
}
```

## Dev Dependencies

```json
{
  "@tailwindcss/postcss": "^4.0.0",
  "@types/leaflet": "^1.9.15",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "autoprefixer": "^10.4.22",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^9",
  "eslint-config-next": "16.0.3",
  "postcss": "^8.5.6",
  "tailwindcss": "^4.1.17",
  "typescript": "^5"
}
```

## Package Descriptions

### Core Framework
- **next**: Next.js 16 (App Router) - React framework for production
- **react**: React 19 - JavaScript library for building UI
- **react-dom**: React DOM renderer
- **typescript**: TypeScript language for type safety

### UI & Styling
- **tailwindcss**: Tailwind CSS v4 - Utility-first CSS framework
- **@tailwindcss/postcss**: PostCSS plugin for Tailwind v4
- **lucide-react**: Modern icon library
- **clsx**: Utility for constructing className strings
- **tailwind-merge**: Merge Tailwind CSS classes without conflicts
- **sonner**: Toast notification library

### Mapping
- **leaflet**: Open-source mapping library
- **react-leaflet**: React components for Leaflet maps
- **@types/leaflet**: TypeScript types for Leaflet

### Data Visualization
- **recharts**: Chart library for React

### Media & Recording
- **react-media-recorder**: Audio/video recording component

### Build & Development Tools
- **eslint**: JavaScript/TypeScript linter
- **eslint-config-next**: ESLint configuration for Next.js
- **autoprefixer**: PostCSS plugin for vendor prefixes
- **postcss**: CSS transformation tool
- **babel-plugin-react-compiler**: React compiler plugin

## Running the Application

### Development Mode
```bash
npm run dev
```
Application runs at: http://localhost:3000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linter
```bash
npm run lint
```

## Important Configuration Files

1. **package.json** - Dependencies and scripts
2. **tailwind.config.ts** - Tailwind CSS configuration
3. **postcss.config.js** - PostCSS configuration
4. **tsconfig.json** - TypeScript configuration
5. **next.config.ts** - Next.js configuration

## Troubleshooting

### If `npm install` fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### If dev server won't start:
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

## Sharing with Other Developers

### Option 1: Share the entire project folder
- The `package.json` file contains all version information
- Other developers just need to run `npm install`

### Option 2: Generate exact versions lock file
The project already has `package-lock.json` which locks exact versions.

To share:
1. Include `package.json` and `package-lock.json`
2. Others run: `npm ci` (clean install using lockfile)

## System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: ~500MB for node_modules
- **Internet**: Required for initial `npm install`

## Project Tech Stack Summary

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Maps**: Leaflet + React Leaflet
- **Charts**: Recharts
- **Notifications**: Sonner
- **State Management**: React Hooks (built-in)

---

**Last Updated**: November 18, 2025
**Version**: 0.1.0
