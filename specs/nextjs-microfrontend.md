## Next.js Microfrontend Proof of Concept: User Profile

## Objective

Demonstrate a microfrontend approach in Next.js where:

- The site is composed of multiple [zones](https://nextjs.org/docs/app/guides/multi-zones), all located under `sites/demo/`.
- The user profile display and the profile edit form are separate zones/features.
- The edit profile feature can be deployed independently (e.g., as a remote module or separate app).
- Some UI and logic (e.g., shadcn/ui components, user data types) are shared between zones, while some code is unique to each.

## Technical Stack

- Next.js (using App Router, and configured for static export). Ensure latest version.
- Typescript
- pnpm (workspaces if needed)
- shadcn/ui for UI components
- React (latest)
- SWC for compilation

## Directory Structure

```
sites/
	demo/
		profile-display/   # Zone: user profile display
		profile-edit/      # Zone: edit profile feature (can be deployed separately)
```

## Use Case

- Display a user profile (name, email) in the `profile-display` zone.
- Provide an "Edit Profile" button that loads the edit form from the `profile-edit` zone.
- Both zones use shadcn/ui for consistent UI.
- Demonstrate that some of the downloaded JS/CSS payload is shared (e.g., shadcn/ui, user data types), and some is unique (e.g., edit form logic).

## Requirements

### 1. User Profile Display (`profile-display` zone)

- Show user name and email.
- "Edit Profile" button triggers loading of the edit form from the `profile-edit` zone.
- Use shadcn/ui components for layout and styling.

### 2. Edit Profile Feature (`profile-edit` zone)

- Form to edit name and email.
- Uses shadcn/ui form components.
- Can be deployed independently (e.g., as a separate Next.js app or remote module).
- On save, updates the user profile (simulate with local state or mock API).

### 3. Shared & Unique Payloads

- Shared: shadcn/ui, user data types, basic layout components (in `shared/`).
- Unique: Edit form logic, remote loading code, feature-specific state.

### 4. Demonstration

- Show, via build analysis or network tab, which assets are shared and which are unique when loading each zone.
- Document the approach for sharing code (e.g., via pnpm workspace packages, module federation, or Next.js Turbopack).

## Acceptance Criteria

- [ ] All zones are under `sites/demo/`.
- [ ] User profile display and edit form are in separate zones/deployments.
- [ ] Both use shadcn/ui for UI consistency.
- [ ] Edit form loads only when needed (code splitting or remote import).
- [ ] Shared code is not duplicated in the payload.
- [ ] Unique code is only loaded for the relevant zone.
- [ ] Documentation includes screenshots or analysis of shared vs. unique payloads.

## Technical Considerations

- Use pnpm workspaces to share code (types, UI components) via `shared/`.
- Use mock data or a simple API for user profile.
- Ensure both zones can be run and deployed independently.

## Edge Cases & Risks

- Version mismatches between shared dependencies.
- Remote loading failures (network, CORS).
- UI consistency if shadcn/ui versions diverge.

## Non-Functional Requirements

- Fast initial load for profile display.
- Minimal payload duplication, with no assert version issues.
- Clear developer documentation.

---

_This spec is intended as a starting point for a microfrontend POC using Next.js and shadcn/ui, focusing on code sharing and independent deployment, with all zones organized under `sites/demo/`._
