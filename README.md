# LIONS OF ZION 🦁

**GLOBAL NARRATIVE PULSE – DEFEND TRUTH. EXPOSE LIES.**

A cutting-edge Next.js application featuring a futuristic design system for monitoring global information flow and exposing misinformation.

## 🎨 Design System

### LIONSOFZION Brand Identity

**Primary Visual Style:** Futuristic, bold, and clean cyberpunk aesthetic

**Key Elements:**

- **Colors:** Neon blue (#00AEEF), cyber blue (#0099CC), deep navy (#0A0E1A)
- **Typography:** Orbitron/Montserrat for headers, Inter for body text
- **Motif:** Glowing blue lion head symbolizing strength and guardianship
- **Background:** Deep navy-to-black gradient throughout

### Typography Hierarchy

```css
/* Titles */
.text-title {
  font-family: "Orbitron", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  color: #00aeef;
  text-shadow: neon glow effect;
}

/* Subtitles */
.text-subtitle {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: #4dc8f0;
}

/* Body Text */
.text-body {
  font-family: "Inter", sans-serif;
  color: #b0b8c5;
  line-height: 1.7;
}
```

### Component Library

#### Buttons

```tsx
<button className="cyber-button">ACTIVATE PROTOCOL</button>
```

#### Cards

```tsx
<div className="cyber-card">
  <h3 className="text-subtitle">System Status</h3>
  <p className="text-body">Content here</p>
</div>
```

#### Notifications

```tsx
<div className="notification info">GUARDIANS ACTIVE</div>
<div className="notification warning">THREAT DETECTED</div>
<div className="notification success">MISSION COMPLETE</div>
```

### Color Palette

| Color      | Hex       | Usage                             |
| ---------- | --------- | --------------------------------- |
| Neon Blue  | `#00AEEF` | Primary brand, titles, highlights |
| Cyber Blue | `#0099CC` | Secondary accents, hover states   |
| Light Blue | `#4DC8F0` | Subtitles, secondary text         |
| Dark Navy  | `#0A0E1A` | Primary background                |
| Deep Black | `#000000` | Gradient end, depth               |
| Cyber Gray | `#1A1F2E` | Card backgrounds                  |
| Light Gray | `#B0B8C5` | Body text                         |
| Glow Cyan  | `#00FFFF` | Special effects, success states   |

### Animation System

- **Pulse Neon:** Breathing glow effect for important elements
- **Float:** Subtle vertical movement for interactive elements
- **Glow:** Opacity pulsing for ambient lighting
- **Hover Effects:** Transform and shadow transitions

## 🚀 Features

- **Advanced Canvas Visualizations** - Real-time network mapping with particle effects
- **Cyberpunk Design System** - Comprehensive futuristic UI components
- **Responsive Architecture** - Optimized for all screen sizes and devices
- **High-DPI Support** - Crystal clear rendering on retina displays
- **Accessibility First** - WCAG compliant with focus indicators
- **Performance Optimized** - 60fps animations with minimal resource usage

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.4
- **Frontend:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Fonts:** Orbitron, Montserrat, Inter (Google Fonts)
- **Animation:** CSS Animations + Canvas API
- **Linting:** ESLint with Next.js config

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lions-of-zion.git

# Navigate to project directory
cd lions-of-zion

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Project Structure

````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````
