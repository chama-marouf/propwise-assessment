# Decisions Log

This file documents key architectural, technical, and product decisions made during the development of this project. Each entry should include the date, a summary of the decision, the rationale, and any alternatives considered.

---

## [2026-03-29] Initial Project Setup

- **Decision:** Use the custom Next.js agent-based framework as described in AGENTS.md.
- **Rationale:** The project requirements align with the agent-based approach, and the provided Next.js version offers features needed for rapid development.
- **Alternatives:** Standard Next.js, Remix, or other React frameworks. Chosen approach is required by project brief.

---

## [2026-03-29] State Management

- **Decision:** Use Jotai for state management (see `store/` directory).
- **Rationale:** Jotai provides atomic state management with minimal boilerplate, which fits the modular agent-based architecture.
- **Alternatives:** Redux, Zustand, React Context. Jotai chosen for simplicity and atomic model.

---

## [2026-03-29] UI Library

- **Decision:** Use Tailwind CSS for styling and component primitives in `components/ui/`.
- **Rationale:** Tailwind enables rapid prototyping and consistent design. Custom UI primitives allow for flexibility and theme support.
- **Alternatives:** Chakra UI, Material UI, plain CSS. Tailwind chosen for speed and flexibility.

---

## [2026-03-29] Mock Data & API

- **Decision:** Use local mock data and API utilities in `lib/` for initial development.
- **Rationale:** Enables frontend development without backend dependencies. Will be replaced with real API integration later.
- **Alternatives:** Direct API integration, MirageJS. Local mocks chosen for speed and control.

---

*Add new decisions below as the project evolves.*
