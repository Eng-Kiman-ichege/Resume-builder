# Mobile Responsiveness Guide

## Overview
This document outlines the mobile responsiveness improvements made to the CV Craft application and guidelines for maintaining and extending these optimizations.

## Key Mobile-First Changes

### 1. Viewport Configuration (app/layout.tsx)
- Added proper viewport meta tag with `Viewport` export
- Configured for device-width scaling and user zoom support
- Ensures correct rendering on mobile devices

### 2. Builder Layout Improvements (app/builder/layout.tsx)
- Responsive flex layout that adapts from mobile to desktop
- Mobile hamburger menu that overlays sidebar
- Proper z-index layering for mobile overlay
- Sidebar transitions smoothly on mobile

### 3. Builder Page Enhancements (app/builder/page.tsx)
- **Preview Toggle**: Added Show/Hide Preview button for mobile users to toggle between form and preview
- **Responsive Spacing**: 
  - Mobile: `px-3 sm:px-6 md:px-10` for flexible padding
  - Mobile: `pt-6 sm:pt-8` for flexible top padding
  - Mobile: `space-y-6 sm:space-y-8` for flexible gaps
- **Responsive Typography**: Scaled text sizes for better readability
  - Headings: `text-2xl sm:text-3xl md:text-4xl`
  - Labels: `text-xs sm:text-sm`
  - Input heights: `h-10 sm:h-11 md:h-12`
- **Mobile Form Layout**: 
  - Single column on mobile, 2-3 columns on larger screens
  - Grid responsive: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
- **Footer**: Adjusted padding and layout for mobile
  - Fixed positioning adjusted for sidebar on desktop: `lg:left-[18rem]`
  - Reduced button sizes on mobile

### 4. Dashboard Improvements (app/dashboard/layout.tsx)
- **Desktop Sidebar**: Hidden on mobile, shown on md+ screens
- **Mobile Bottom Navigation**: Fixed bottom nav with icon + label
- **Responsive Hover States**: Added background colors and transitions
- **Better Touch Targets**: Increased padding for mobile touch interaction

### 5. Landing Page Optimization (app/page.tsx)
- **Header Navigation**:
  - Responsive button sizing: `size="sm"` on mobile
  - Logo icon scales: `h-4 sm:h-5 w-4 sm:w-5`
  - Reduced gap: `gap-2 sm:gap-3`
- **Hero Section**:
  - Heading scales: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
  - Responsive padding: `pt-12 pb-20 sm:pt-20 md:pt-32 md:pb-40`
  - CTA buttons: Full width on mobile, auto width on larger screens
- **Feature Cards**: 
  - Single column on mobile
  - Grid responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - Last card spans full width on 2-column layout (sm:col-span-2)
- **Footer**: Reorganized for mobile stacking

## Tailwind Breakpoints Used
- **None (default)**: Mobile-first, applies to all screen sizes
- **sm**: 640px (small tablets/landscape phones)
- **md**: 768px (tablets)
- **lg**: 1024px (small desktops)
- **xl**: 1280px (large desktops)

## Mobile-First Pattern
All styles follow the mobile-first approach:
```jsx
// Mobile by default, enhanced on larger screens
className="h-10 sm:h-11 md:h-12"
```

## Best Practices for Future Development

### Form Inputs
- Use responsive heights: `h-10 sm:h-11 md:h-12`
- Use responsive labels: `text-xs sm:text-sm`
- Full width on mobile: `w-full sm:w-auto`
- Proper spacing: `gap-4 sm:gap-5 md:gap-6`

### Typography
- Scale headings across breakpoints
- Adjust line heights for readability
- Use responsive letter-spacing where needed

### Layout
- Use flex-col on mobile, change direction on larger screens
- Use grid with responsive columns: `grid-cols-1 sm:grid-cols-2`
- Use hidden/flex utilities: `hidden lg:flex` or `flex lg:hidden`

### Spacing
- Be consistent with padding/margin
- Use responsive spacing utilities
- Don't rely on fixed pixel values for responsive design

### Touch Targets
- Minimum 44px height for buttons on mobile
- Adequate padding for tap accuracy
- Clear visual feedback on interaction

### Images
- Use responsive sizing
- Add proper alt text
- Consider lazy loading for performance

## Testing Checklist
- [ ] Test on iPhone 12/13 (390px width)
- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPad Mini (768px width)
- [ ] Test on iPad (1024px width)
- [ ] Test on desktop (1440px width)
- [ ] Test landscape orientation
- [ ] Test dark mode
- [ ] Verify touch interactions work properly
- [ ] Check form accessibility
- [ ] Verify buttons/links have adequate size

## Known Optimizations
1. **Builder Sidebar**: Uses fixed positioning with -translate-x-full on mobile
2. **Preview Toggle**: Allows mobile users to see preview without scrolling
3. **Responsive Footer**: Stacks vertically on mobile, horizontal on desktop
4. **Bottom Navigation**: Mobile-specific nav for dashboard
5. **Form Grids**: Responsive column count based on screen size
