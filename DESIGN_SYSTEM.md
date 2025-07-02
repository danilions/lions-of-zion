# Lions of Zion - Design System

A modern, clean, and accessible design system built with Next.js 14, Tailwind CSS, and TypeScript.

## 🎨 Design Principles

- **Clean & Minimal**: Focus on content with minimal visual distractions
- **Accessible**: WCAG compliant with proper semantic markup and keyboard navigation
- **Responsive**: Mobile-first design that works across all devices
- **Professional**: Suitable for enterprise and professional applications
- **Scalable**: Component-based architecture for easy maintenance

## 🎯 Color Palette

### Primary Colors
- `primary-50` to `primary-950`: Main brand colors based on blue tones
- Used for: Primary buttons, links, focus states, brand elements

### Secondary Colors  
- `secondary-50` to `secondary-950`: Accent colors based on green tones
- Used for: Secondary actions, success states, complementary elements

### Neutral Colors
- `neutral-50` to `neutral-950`: Grayscale palette
- Used for: Text, backgrounds, borders, and general UI elements

### Status Colors
- `success`: Green tones for positive actions
- `warning`: Yellow/orange tones for caution
- `error`: Red tones for errors and destructive actions
- `info`: Blue tones for informational content

## 📝 Typography

### Font Families
- **Sans**: Inter (primary body font)
- **Display**: Space Grotesk (headings and display text)
- **Mono**: JetBrains Mono (code and monospace content)

### Typography Scale
- `heading-1`: 4xl-7xl responsive (Display Large)
- `heading-2`: 3xl-5xl responsive (Display Medium)  
- `heading-3`: 2xl-3xl responsive (Display Small)
- `heading-4`: xl-2xl responsive (Title)
- `body-large`: lg (Lead paragraphs)
- `body`: base (Standard body text)
- `body-small`: sm (Captions and meta)

## 🧩 Components

### Buttons
```tsx
<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="lg">Secondary Button</Button>
<Button variant="outline" size="sm">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`  
**Sizes**: `sm`, `md`, `lg`

### Cards
```tsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Variants**: `default`, `elevated`, `hover`

### Form Elements
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>
```

### Status Components
```tsx
<Badge variant="primary">Status Badge</Badge>

<Alert variant="info">
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert description</AlertDescription>
</Alert>
```

**Badge Variants**: `primary`, `secondary`, `success`, `warning`, `error`, `neutral`  
**Alert Variants**: `info`, `success`, `warning`, `error`

## 🏗️ Layout Components

### Header
```tsx
<Header />
```
Responsive navigation header with logo, menu items, and action buttons.

### Footer  
```tsx
<Footer />
```
Site footer with links, social media, and copyright information.

### Sections
```tsx
<HeroSection />
<FeaturesSection />
<ContactSection />
```

## 📱 Responsive Design

The design system uses a mobile-first approach with breakpoints:
- `sm`: 640px+
- `md`: 768px+  
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

## ♿ Accessibility Features

- Semantic HTML markup
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader optimization
- Reduced motion support

## 🛠️ Usage

### Installation
```bash
npm install clsx tailwind-merge
```

### Import Components
```tsx
import { Button, Card, Input } from '@/components/ui';
```

### Utility Function
```tsx
import { cn } from '@/lib/utils';

// Combine classes conditionally
const className = cn(
  'base-classes',
  condition && 'conditional-classes',
  customClassName
);
```

## 📂 File Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Alert.tsx
│   │   └── index.ts        # Component exports
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/           # Page sections
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       └── ContactSection.tsx
├── lib/
│   └── utils.ts            # Utility functions
└── app/
    ├── globals.css         # Global styles & Tailwind
    ├── layout.tsx          # Root layout
    ├── page.tsx            # Home page
    ├── about/              # About page
    ├── services/           # Services page
    ├── contact/            # Contact page
    └── showcase/           # Design system showcase
```

## 🎯 Best Practices

1. **Component Composition**: Build complex UIs by composing simple components
2. **Consistent Spacing**: Use the spacing scale consistently (4, 8, 12, 16, 20, 24px)
3. **Color Usage**: Stick to the defined color palette for consistency
4. **Typography Hierarchy**: Use the typography scale to create clear content hierarchy
5. **Responsive Design**: Test on multiple screen sizes and devices
6. **Accessibility**: Always include proper ARIA labels and semantic markup

## 🚀 Example Pages

- **Home** (`/`): Landing page with hero, features, and contact sections
- **About** (`/about`): Company information and team details
- **Services** (`/services`): Service offerings and pricing
- **Contact** (`/contact`): Contact form and information
- **Showcase** (`/showcase`): Complete design system demonstration

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📄 License

This design system is proprietary to Lions of Zion.
