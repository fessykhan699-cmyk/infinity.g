# Infinity.g - GitHub Copilot Instructions

## Project Overview
This is an AI Studio app - a sophisticated digital enterprise platform built for showcasing creative services and portfolio work. The application features dynamic background videos, AI-powered advisory services, and an administrative interface for content management.

View the app in AI Studio: https://ai.studio/apps/drive/1vR7G-JEJV5ugFRvR0d7pCuft9hhqWxJ7

## Technology Stack

### Core Technologies
- **React 19.2.4** - Latest React with modern features
- **TypeScript 5.8.2** - Strict type checking enabled
- **Vite 6.2.0** - Build tool and dev server
- **Next.js 16.1.6** - Additional framework capabilities

### Key Dependencies
- **@google/genai 1.38.0** - Gemini API integration for AI features
- **Mongoose 9.1.5** - MongoDB object modeling
- **Cloudinary 2.9.0** - Cloud-based media management

### Development Tools
- **Vite** - Fast development server on port 3000
- **TypeScript** - Configured with ES2022 target and React JSX

## Project Structure

```
/
├── components/          # React components
│   ├── Hero.tsx        # Landing hero section
│   ├── Work.tsx        # Portfolio/work showcase
│   ├── Advisor.tsx     # AI advisor interface
│   ├── Studio.tsx      # Studio section
│   ├── Contact.tsx     # Contact form
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   └── ...
├── layouts/            # Layout components
│   └── MainLayout.tsx  # Main application layout
├── pages/              # Page components and API routes
│   └── api/           # API endpoints
│       ├── video-url.ts
│       ├── contact.ts
│       ├── video-config.ts
│       └── strategies.ts
├── services/          # Service layer
│   ├── dbService.ts   # Database operations
│   └── geminiService.ts # AI/Gemini API integration
├── models/            # Data models (Mongoose schemas)
│   ├── VideoAsset.ts
│   ├── Inquiry.ts
│   ├── Setting.ts
│   └── Visual.ts
├── lib/               # Utility libraries
├── constants.ts       # Application constants
├── types.ts           # TypeScript type definitions
└── App.tsx           # Main application component
```

## Coding Standards and Conventions

### TypeScript
- Use TypeScript for all new files (`.ts` and `.tsx`)
- Enable strict type checking
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type - use `unknown` if type is truly dynamic

### React Components
- Use functional components with hooks (no class components)
- Follow the `'use client'` directive pattern when needed
- Prefer named exports over default exports for components (except App.tsx)
- Use React.FC or explicit component typing
- Keep components focused and single-responsibility

### Component Structure
```typescript
'use client';
import React from 'react';

interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};

export default Component;
```

### Styling
- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design patterns
- Use semantic class names like `md:`, `lg:`, `xl:` for breakpoints
- Leverage existing design system with `glass-card`, `gradient-text`, `reactive-glass` classes
- Maintain dark theme aesthetic with slate and white color palette

### Code Organization
- One component per file
- Co-locate related utilities with components when appropriate
- Use path aliases: `@/*` points to project root
- Keep API routes in `pages/api/`
- Keep data models in `models/`
- Keep business logic in `services/`

### Naming Conventions
- Components: PascalCase (e.g., `Hero.tsx`, `AdminVideoUploader.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables and functions: camelCase
- Constants: UPPER_SNAKE_CASE (see `constants.ts`)
- Types/Interfaces: PascalCase with descriptive names

### State Management
- Use React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Avoid prop drilling - use composition or context when needed
- Keep state as local as possible

### API Integration
- Use environment variables for sensitive data (e.g., `GEMINI_API_KEY`)
- Store API keys in `.env.local` (never commit to git)
- Access environment variables via `process.env.*`
- Handle API errors gracefully with try/catch blocks

### Event Handlers
- Prefix event handlers with `handle` (e.g., `handleClick`, `handleMouseMove`)
- Use proper TypeScript event types (e.g., `React.MouseEvent<HTMLDivElement>`)

## Animation and Interactions

- Use `ScrollReveal` component for scroll-based animations
- Support direction prop: `"up"`, `"down"`, `"left"`, `"right"`
- Add delay props for staggered animations (e.g., `delay={i * 100}`)
- Leverage CSS custom properties for dynamic styling (e.g., `--mouse-x`, `--tilt-x`)
- Use Tailwind transition utilities for smooth effects

## Development Workflow

### Running the App
```bash
npm install              # Install dependencies
npm run dev             # Start dev server (port 3000)
npm run build           # Build for production
npm run preview         # Preview production build
```

### Environment Setup
1. Create `.env.local` file in root
2. Add `GEMINI_API_KEY=your_api_key_here`
3. Never commit `.env.local` to version control

### Build Configuration
- Vite is configured to use port 3000 on host 0.0.0.0
- Path aliases are configured: `@/` → project root
- Environment variables are exposed via `process.env.*`

## Best Practices

### Performance
- Use React.memo() for expensive components
- Implement proper cleanup in useEffect hooks
- Lazy load components when appropriate
- Optimize images and videos for web

### Accessibility
- Use semantic HTML elements
- Ensure proper ARIA labels where needed
- Maintain keyboard navigation support
- Test with screen readers

### Security
- Never commit API keys or secrets
- Validate user inputs
- Sanitize data before database operations
- Use environment variables for configuration

### Error Handling
- Wrap async operations in try/catch blocks
- Provide meaningful error messages
- Log errors appropriately for debugging
- Handle edge cases gracefully

## Common Patterns

### Scroll-based Animations
```typescript
<ScrollReveal direction="up" delay={100}>
  <div>Your content</div>
</ScrollReveal>
```

### Interactive Cards with Mouse Tracking
```typescript
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};
```

### API Route Pattern
```typescript
// In pages/api/endpoint.ts
export default async function handler(req, res) {
  try {
    // Handle request
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Testing
- No formal testing framework is currently configured
- Manual testing via dev server is the primary validation method
- Test all interactive features in the browser
- Verify responsive design across different screen sizes

## Deployment
- The app is designed to run on AI Studio platform
- Build artifacts are generated via `npm run build`
- Ensure all environment variables are properly configured in production

## AI Features
- Integration with Google Gemini API for AI advisory capabilities
- Service layer abstracts AI functionality in `geminiService.ts`
- Models define data structures for AI-related features

## Database
- Uses MongoDB via Mongoose
- Models define schemas in `/models` directory
- Database service layer in `services/dbService.ts`

## Video Management
- Cloudinary integration for video hosting
- Admin interface for video uploads
- Dynamic background video components

## Pitfalls to Avoid

- ❌ Don't use class components - use functional components with hooks
- ❌ Don't commit `.env.local` or any files containing API keys
- ❌ Don't use inline styles - prefer Tailwind utility classes
- ❌ Don't ignore TypeScript errors - fix them properly
- ❌ Don't bypass the service layer - use `services/` for business logic
- ❌ Don't hardcode API endpoints - use environment variables
- ❌ Don't forget cleanup in useEffect hooks
- ❌ Don't use deprecated React patterns (componentDidMount, etc.)

## When Making Changes

1. **Understand the component tree** - Check how components are composed in App.tsx
2. **Follow existing patterns** - Match the style and structure of existing code
3. **Test interactivity** - Verify animations, hover effects, and scroll behaviors
4. **Check responsiveness** - Test on mobile, tablet, and desktop viewports
5. **Verify API integration** - Ensure Gemini API calls work correctly
6. **Update types** - Keep TypeScript definitions accurate and complete
7. **Consider performance** - Be mindful of re-renders and expensive operations
