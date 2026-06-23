# ARGUS - Design Opportunity Radar App

ARGUS is a premium, interactive web application designed to help student developers and professionals discover, track, and manage competitive opportunities (such as Hackathons, Bounties, Internships, Certifications, and Workshops) across major tech domains including Blockchain, AI/ML, DevOps, and Cloud.

The original UI/UX design is based on the [Figma Design Opportunity Radar App](https://www.figma.com/design/uXgvBeNAqmOjAJQ5H20ioI/Design-Opportunity-Radar-App).

---

## ✨ Features

- **Ambient Glassmorphic UI**: Vibrant, responsive dark-mode and light-mode designs featuring glowing layout backdrops, custom grids, and premium gradients.
- **Dynamic Onboarding**: Interactive domain selection screen that customizes and pre-filters your opportunities feed.
- **Radar Dashboard**: Real-time prioritization of events categorized by urgency (e.g., ending in under 24 hours, under 72 hours, etc.) with quick-save capabilities.
- **Explore & Search**: Instant, type-ahead search filterable by domain categories, event types, tags, and participation modes (Online, Offline, Hybrid).
- **Opportunity Detail Hub**: Comprehensive slide-in details showcasing prize pools, target branches, organizer info, eligibility criteria, and real-time urgency alerts.
- **Alerts & Reminders**: Tracks deadlines of saved opportunities, ensuring you never miss a submission or registration date.
- **Profile Center**: Keep track of your accomplishments, stats (Saved, Applied, Won), preferred domains, and theme settings.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) for consistent vector iconography
- **State Management**: React state hooks (`useState`, `useEffect`) managed at the core frame layer for optimal reactivity

---

## 🚀 Running the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
You can install dependencies using either `npm` or `pnpm` (which is supported in this workspace):

```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

### 2. Start the Development Server
Run the local Vite server:

```bash
# Using npm
npm run dev

# Or using pnpm
pnpm run dev
```

The application will start, and you can open the address (typically `http://localhost:5173`) in your browser.

### 3. Build for Production
To build the application for deployment:

```bash
# Using npm
npm run build

# Or using pnpm
pnpm run build
```

The production assets will be generated in the `dist/` directory.