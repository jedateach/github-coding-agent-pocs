# Next.js Microfrontend POC: User Profile

This project demonstrates a microfrontend architecture using Next.js with two independent zones for user profile management.

## Architecture Overview

The project implements a microfrontend pattern with:

- **Profile Display Zone** (`sites/demo/profile-display/`) - Shows user profile information
- **Profile Edit Zone** (`sites/demo/profile-edit/`) - Provides edit functionality  
- **Shared Types** (`packages/shared-types/`) - Common TypeScript interfaces
- **Shared UI Components** - shadcn/ui components for consistent styling

## Directory Structure

```
├── packages/
│   └── shared-types/              # Shared TypeScript types
├── sites/demo/
│   ├── profile-display/           # Zone: User profile display
│   │   ├── src/app/
│   │   ├── src/components/ui/     # shadcn/ui components
│   │   ├── src/lib/api/          # Mock API layer
│   │   └── package.json
│   └── profile-edit/             # Zone: Edit profile feature
│       ├── src/app/
│       ├── src/components/ui/    # shadcn/ui components (shared)
│       ├── src/lib/api/         # Mock API layer
│       └── package.json
├── package.json                  # Root workspace config
└── pnpm-workspace.yaml
```

## Technical Features

### 🏗️ Independent Zones
- Each zone is a separate Next.js application
- Can be built, deployed, and scaled independently
- Run on different ports (3000 and 3001 in development)

### 📦 Code Sharing
- **Shared Types**: Common TypeScript interfaces via `@microfrontend-demo/shared-types`
- **Shared UI**: shadcn/ui components copied between zones for styling consistency
- **Workspace Management**: pnpm workspaces for dependency management

### 🔄 Cross-Zone Communication
- Profile display zone can trigger loading of edit zone
- Data synchronization via localStorage (simulating shared state/API)
- Message passing between zones via postMessage API

### 🎨 UI Consistency
- Both zones use shadcn/ui for consistent design system
- Shared Tailwind configuration
- Responsive design patterns

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 9.14.4+

### Installation

```bash
# Install all dependencies
pnpm install

# Build shared types
cd packages/shared-types && pnpm build
```

### Development

```bash
# Start both zones in parallel
pnpm dev:all

# Or start individually
pnpm dev:profile-display  # http://localhost:3000
pnpm dev:profile-edit     # http://localhost:3001
```

### Production Build

```bash
# Build all applications
pnpm build:all

# Or build individually
pnpm build:profile-display
pnpm build:profile-edit
```

## Usage Demo

1. **Profile Display** (http://localhost:3000)
   - Shows user profile information (name, email)
   - "Edit Profile" button triggers cross-zone communication
   - Displays microfrontend architecture information

2. **Profile Edit** (http://localhost:3001)
   - Form to edit user name and email
   - Real-time validation
   - Success/error feedback
   - Data persistence via localStorage

3. **Cross-Zone Flow**
   - Click "Edit Profile" in display zone
   - Edit zone opens (simulated as new window in demo)
   - Update profile data in edit zone
   - Data syncs between zones via shared storage

## Payload Analysis

### Shared Assets
Both zones share similar assets due to common dependencies:
- **React & Next.js runtime** (~54.2 kB)
- **Shared chunk** (~45.4 kB with shadcn/ui components)
- **TypeScript types** (build-time only)

### Unique Assets
- **Profile Display**: User profile display logic (~10.6 kB unique)
- **Profile Edit**: Form handling and validation logic (~11.5 kB unique)

### Bundle Size Comparison
```
Profile Display Zone:
┌ ○ /                  10.6 kB    112 kB total
└ Shared chunks                   102 kB

Profile Edit Zone:  
┌ ○ /                  11.5 kB    113 kB total
└ Shared chunks                   102 kB
```

## Microfrontend Benefits Demonstrated

### ✅ Independent Deployment
- Each zone can be deployed separately
- Version mismatches are isolated
- Rolling updates possible per zone

### ✅ Technology Flexibility  
- Each zone could use different Next.js versions
- Different build optimizations possible
- Independent CI/CD pipelines

### ✅ Team Autonomy
- Profile display team can work independently
- Profile edit team can work independently  
- Shared types provide contract boundaries

### ✅ Scalability
- Zones can be scaled independently based on usage
- Different hosting strategies per zone
- Load balancing at zone level

## Edge Cases Handled

### Version Mismatches
- Workspace constraints ensure dependency compatibility
- Shared types provide stable interfaces
- Runtime checks for breaking changes

### Network Failures  
- Graceful fallback when edit zone unavailable
- Loading states and error boundaries
- Retry mechanisms for API calls

### State Synchronization
- localStorage used for demo cross-zone sync
- Production would use shared API/event system
- Optimistic updates with conflict resolution

## Production Considerations

### API Integration
Replace localStorage with:
- Shared REST/GraphQL APIs
- Event-driven updates (WebSockets, SSE)
- State management systems (Redux, Zustand)

### Deployment Strategy
- Separate repositories per zone
- Independent CI/CD pipelines  
- Container-based deployment
- CDN distribution for static assets

### Monitoring
- Zone-specific error tracking
- Performance monitoring per zone
- Cross-zone interaction tracking
- Bundle size monitoring

## Development Commands

```bash
# Workspace management
pnpm install              # Install all dependencies
pnpm -r build             # Build all packages
pnpm -r --parallel dev    # Start all in dev mode

# Individual zones
pnpm --filter profile-display dev
pnpm --filter profile-edit build
pnpm --filter shared-types build

# Linting and type checking
pnpm --filter profile-display lint
pnpm --filter profile-edit lint
```

## Future Enhancements

- [ ] Module Federation integration
- [ ] Server-side rendering support  
- [ ] Progressive loading of zones
- [ ] A/B testing per zone
- [ ] Real-time collaboration features
- [ ] Advanced error boundaries
- [ ] Performance budgets per zone
- [ ] Automated visual regression testing