# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension called "Focused - Website Blocker and Pomodoro Timer" built with React, TypeScript, Vite, and Tailwind CSS. The extension helps users block distracting websites and includes a planned Pomodoro timer feature.

## Development Commands

- **Development**: `npm run dev` - Start Vite dev server with hot reloading
- **Build**: `npm run build` - Build extension for production (outputs to `dist/`)
- **Build Watch**: `npm run build:watch` - Build with file watching for development
- **Preview**: `npm run preview` - Preview production build locally

## Architecture and Structure

### Technology Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite with ES modules
- **Styling**: Tailwind CSS v4 with PostCSS
- **Extension API**: Chrome Extensions Manifest V3

### Core Components

- **Background Service Worker** (`src/background.ts`): Monitors tabs and blocks sites
- **Popup** (`src/components/Popup.tsx`): Main extension UI for blocking current site
- **Options Page** (`src/components/Options.tsx`): Settings page for managing blocked sites
- **Blocked Page** (`src/components/Blocked.tsx`): Page displayed when accessing blocked sites

### Custom Hooks

- **useBlockedSites** (`src/hooks/useStorage.ts`): Manages blocked sites storage with Chrome sync API
- **useCurrentTab** (`src/hooks/useCurrentTab.ts`): Gets current active tab information

### Data Storage

Uses `chrome.storage.sync` API with the structure:
```javascript
{
  "blockedSites": ["example.com", "facebook.com"] // Array of hostnames
}
```

### Key Architecture Patterns

1. **React Hooks**: Custom hooks for Chrome APIs and state management
2. **Single Vite Project**: Multiple entry points for popup, options, and blocked pages
3. **Service Worker**: Background script for tab monitoring and site blocking
4. **TypeScript**: Full type safety with Chrome extension types
5. **Component-based**: Modern React functional components with hooks

### File Structure

```
src/
├── background.ts              # Service worker background script
├── main.tsx                   # React app entry point with routing
├── index.css                  # Tailwind CSS imports
├── components/                # React components
│   ├── Popup.tsx
│   ├── Options.tsx
│   └── Blocked.tsx
├── hooks/                     # Custom React hooks
│   ├── useStorage.ts
│   └── useCurrentTab.ts
└── types/                     # TypeScript type definitions
    └── index.ts

public/
├── manifest.json             # Chrome extension manifest V3
└── static/                   # Static assets (icons, etc.)

dist/                         # Build output directory
```

## Chrome Extension Specifics

- **Manifest V3**: Uses service worker instead of background page
- **Permissions**: `storage`, `tabs`, `activeTab`, `<all_urls>`
- **Modern APIs**: Uses `chrome.tabs.query` and `chrome.storage.sync`
- **Extension URL**: Uses `chrome.runtime.getURL()` for internal pages

## Development Notes

- Hot reloading available during development with `npm run dev`
- Build outputs to `dist/` directory for Chrome extension loading
- Uses ES modules throughout the project
- PostCSS configured for Tailwind CSS v4
- TypeScript strict mode enabled for better code quality