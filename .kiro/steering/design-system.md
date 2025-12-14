---
inclusion: always
---

# Design System Rules for Figma Integration

This document defines the design system structure and integration patterns for converting Figma designs into code for the EDC Cell project.

## 1. Token Definitions

### Color System
Colors are defined using CSS custom properties with HSL values in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --card: 0 0% 100%;
  /* ... more tokens */
}
```

**Usage in Tailwind:** `bg-background`, `text-foreground`, `border-border`, etc.

**Conversion Rule:** When Figma provides hex colors, convert to HSL and map to existing tokens. Use `hsl(var(--token-name))` format.

### Spacing & Border Radius
- Border radius uses CSS variable: `--radius: 0.5rem`
- Tailwind utilities: `rounded-lg`, `rounded-md`, `rounded-sm`
- Standard Tailwind spacing scale applies (4px base unit)

### Typography
**Fonts:**
- Primary: Inter (sans-serif) - `font-sans`
- Display: Fraunces (serif) - `font-fraunces`
- Custom: Rundeck Smooth - `font-rundeck`

**Font Loading:**
```typescript
// app/layout.tsx
import { Inter, Fraunces } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
const fraunces = Fraunces({ subsets: ['latin'], axes: ['SOFT', 'WONK', 'opsz'] });
```

Custom fonts loaded via `@font-face` in `globals.css` with `font-display: swap`.

## 2. Component Library

### Component Structure
**Location:** `/components` for shared components, `/app/components` for page-specific

**Architecture Pattern:**
- Functional components with TypeScript
- React.memo for performance optimization
- Props interfaces defined inline or exported
- CSS Modules or separate CSS files for complex styling

**Example Structure:**
```typescript
interface ComponentProps {
  className?: string;
  // ... other props
}

const Component: React.FC<ComponentProps> = ({ className, ...props }) => {
  return <div className={cn('base-classes', className)} {...props} />;
};

export default React.memo(Component);
```

### Existing Components
- `ProfileCard` - Complex 3D tilt card with animations
- `SpotlightCard` - Interactive spotlight effect wrapper
- Located in `/components` with accompanying CSS files

## 3. Frameworks & Libraries

### Core Stack
- **Framework:** Next.js 14.2.0 (App Router)
- **React:** 18.2.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 3.4.0

### Key Libraries
- **Class Management:** `clsx` + `tailwind-merge` via `cn()` utility
- **Icons:** Lucide React (`lucide-react`)
- **Animations:** GSAP, Lenis (smooth scroll)
- **UI Utilities:** `class-variance-authority`, `tailwindcss-animate`

### Build System
- **Bundler:** Next.js built-in (Turbopack/Webpack)
- **PostCSS:** Autoprefixer enabled
- **TypeScript:** Strict mode

## 4. Asset Management

### Images
- **Storage:** `/public` directory for static assets
- **CDN:** Cloudinary integration via `lib/cloudinary.ts`
- **Optimization:** Next.js Image component preferred
- **Formats:** WebP preferred, PNG/JPG fallbacks

### Asset Paths
```typescript
// Public assets
<img src="/logo.png" alt="Logo" />

// Cloudinary
import { cloudinary } from '@/lib/cloudinary';
```

## 5. Icon System

### Icon Library
**Primary:** Lucide React

**Usage Pattern:**
```typescript
import { IconName } from 'lucide-react';

<IconName className="w-4 h-4" />
```

**Naming Convention:** PascalCase, descriptive names from Lucide library

**Custom Icons:** Store in `/public/icons` if needed, use as SVG imports

## 6. Styling Approach

### CSS Methodology
**Primary:** Tailwind utility classes with CSS custom properties

**Component-Specific Styles:**
- Separate CSS files for complex components (e.g., `ProfileCard.css`)
- CSS Modules not currently used
- Global styles in `app/globals.css`

### Utility Function
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:** Merge Tailwind classes safely, handle conditional classes

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Custom responsive utilities in component CSS when needed

### Animation Patterns
```css
/* globals.css */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
```

**Tailwind Animate:** Plugin enabled for common animations

## 7. Project Structure

```
/app                    # Next.js App Router
  /components          # Page-specific components
  /api                 # API routes
  /[route]             # Page routes
  globals.css          # Global styles & tokens
  layout.tsx           # Root layout
  page.tsx             # Home page

/components            # Shared/reusable components
  Component.tsx
  Component.css

/lib                   # Utilities & integrations
  utils.ts             # Helper functions
  cloudinary.ts        # Asset management
  firebase*.ts         # Backend integration

/public                # Static assets
  /fonts
  /stickers
  *.png, *.jpg

/tailwind.config.ts    # Tailwind configuration
/components.json       # shadcn/ui config
```

## 8. Figma Integration Guidelines

### When Converting Figma Designs:

1. **Color Mapping:**
   - Map Figma colors to existing CSS custom properties
   - Use `hsl(var(--token))` format, not hardcoded colors
   - Prefer semantic tokens (`primary`, `accent`) over literal colors

2. **Component Reuse:**
   - Check `/components` for existing components before creating new ones
   - Extend existing components via props rather than duplicating
   - Use `cn()` utility for className merging

3. **Styling Priority:**
   - Tailwind utilities first
   - CSS custom properties for theming
   - Component-specific CSS only for complex interactions/animations
   - Avoid inline styles except for dynamic values

4. **Typography:**
   - Use existing font families (`font-rundeck`, `font-fraunces`, default Inter)
   - Map Figma text styles to Tailwind utilities (`text-lg`, `font-bold`, etc.)
   - Maintain consistent line-height and letter-spacing

5. **Spacing & Layout:**
   - Use Tailwind spacing scale (multiples of 4px)
   - Flexbox/Grid via Tailwind utilities
   - Maintain responsive breakpoints

6. **Assets:**
   - Export images to `/public` with descriptive names
   - Use Next.js Image component for optimization
   - Consider Cloudinary for dynamic assets

7. **Accessibility:**
   - Include proper ARIA labels
   - Maintain semantic HTML
   - Ensure keyboard navigation
   - Color contrast compliance

8. **Code Quality:**
   - TypeScript interfaces for all props
   - Proper error handling (e.g., image onError)
   - Performance optimization (React.memo, lazy loading)
   - Clean, readable code structure

### Example Conversion Pattern:

**Figma Design** → **React Component:**

```typescript
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className 
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        className
      )}
    >
      {children}
    </button>
  );
};
```

## 9. Dark Mode Support

The project includes dark mode via CSS custom properties:

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark variants */
}
```

**Implementation:** Tailwind's `darkMode: ["class"]` strategy

**Usage:** Classes automatically adapt when `.dark` class is on `<html>`

## 10. Performance Considerations

- Use `loading="lazy"` for images
- Implement error boundaries for image loading
- React.memo for expensive components
- Code splitting via Next.js dynamic imports
- Optimize animations with CSS transforms (GPU-accelerated)

---

**Last Updated:** December 2024
**Maintained By:** EDC Cell Development Team
