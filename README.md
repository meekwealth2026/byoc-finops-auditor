# BYOC FinOps & Shadow AI Cost Auditor (Zero-Hosting Edition)

A local-first, zero-hosting desktop application built with **Tauri v2 (Rust)** and **React + TypeScript + Tailwind CSS**.

## Architecture Overview
- **Zero-Hosting Security**: All API keys are stored natively inside the OS Keychain (macOS Keychain / Windows Credential Manager). All billing telemetry and audit snapshots live in a local SQLite database (`finops_audit.db`). Nothing ever leaves the user's machine except direct read-only HTTPS calls to AWS, OpenAI, Anthropic, and license validation.
- **Frontend (`src/`)**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend (`src-tauri/`)**: Rust core with Tauri IPC commands, OS Keychain integration (`keyring`), local SQLite (`rusqlite`), and direct cloud/AI API fetchers (`reqwest`).

## Quick Start Prerequisites
1. Install **Node.js** (v20+ LTS)
2. Install **Rust** (`rustup` via https://rustup.rs)
3. Install OS Build Tools:
   - **Windows**: Microsoft C++ Build Tools (Desktop development with C++) & WebView2
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
   - **Linux**: `libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libayatana-appindicator3-dev librsvg2-dev`

## Running Locally
```bash
npm install
npm run tauri dev
```

## Building Production Installer (.exe / .dmg / .AppImage)
```bash
npm run tauri build
```
