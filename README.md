# PropWise CRM Dashboard

## Overview

This project is a pixel-perfect implementation of the PropWise CRM Dashboard based on a Figma design.

It includes:
- KPI cards
- Revenue and pipeline charts
- Activity feed
- Tasks panel
- Toast notification system

## Live Demo

[🔗 https://propwise-assessment-sand.vercel.app/dashboard]

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Jotai

## Features

- Pixel-perfect UI based on design system
- Fully responsive layout (desktop, tablet, mobile)
- Interactive date filter tabs
- Dynamic charts with Recharts
- Toast notifications with undo/retry actions
- Mock API with simulated latency

## Getting Started

```bash
npm install
npm run dev


## Project Structure

- app/dashboard → main page
- components → UI and layout components
- lib → mock API
- store → Jotai state
- types → TypeScript interfaces