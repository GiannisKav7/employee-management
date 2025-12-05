# Employee Management (React + TypeScript + Vite)

A small app to list and view employees, with search and department filtering, powered by Redux Toolkit.

## Prerequisites

- Node.js 18+ (recommend LTS)
- npm 9+ (or pnpm/yarn)

## Quick Start

1. Install deps:

   ```bash
   npm install
   ```

2. Create `.env.local` with:

   ```bash
   VITE_API_KEY=your_api_key_here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open the app:

   - http://localhost:5173 (default Vite port)

## Scripts

- Start (dev): `npm run dev`
- Build: `npm run build` (outputs to `dist/`)
- Preview built app: `npm run preview`
- Test (if configured): `npm test`
- Lint (if configured): `npm run lint`

## Environment Variables

- Do not hardcode API keys.
- App reads `import.meta.env.VITE_API_KEY`. Configure in `.env.local` (ignored by Git).
- In CI/Prod, set `VITE_API_KEY` as an environment secret.

## Redux Overview

- apiKey slice: stores API key read at startup.
- employeesList slice: holds fetched employees.
- filterDept slice: stores selected department (persists in localStorage).
- searchText slice: stores free-text search.

Data flow:

- AppShell reads `VITE_API_KEY`, dispatches to `apiKey`, fetches users with `fetchAllUsers`, maps with `transformUserToEmployee`, and populates `employeesList`.
- UsersGrid selects `searchText` and `filterDept` to filter `employees`.

## Theming (SCSS)

- Global tokens in `src/styles/_variables.scss`:
  - colors map: primary, secondary, border, muted, accent, outline, status-\*.
  - radius, breakpoints.
- Usage in modules:
  ```
  @use "sass:map";
  @use "../../styles/_variables" as vars; // or "../styles/_variables"
  background: map.get(vars.$colors, primary);
  border-radius: vars.$radius;
  ```
- Status badge uses themed colors (status-active/onleave/inactive).

## Styling Conventions

- Use rem for font sizes (base 16px). Examples:
  - 12px → 0.75rem
  - 11px → 0.6875rem
  - 10px → 0.625rem
- Prefer SCSS modules with `@use` and `sass:map`.

## Components (overview)

- Header: top bar; Link styling overridden via `.link`.
- SearchFilterSection: wraps Search and FilterDepartment.
- Search: updates `searchText` slice.
- FilterDepartment: updates `filterDept`, persists selection.
- UsersGrid: MUI DataGrid; navigates to detail on row click.
- EmployeeDetail: info, avatar, and status badge.

## API

- `src/api/users.ts`: fetches pages from reqres.in; `fetchAllUsers(apiKey?)`.
- `src/utils/employeeMapper.ts`: maps API users to Employee.
- `src/utils/employeeSearch.ts`: search helpers.

## Coverage

- Reports under `coverage/lcov-report`. Open `index.html`.
