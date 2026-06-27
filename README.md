# AquaVest - Rainwater Harvesting Calculator

A modern web application for calculating rainwater harvesting potential and analyzing cost-benefit scenarios. Built with Next.js, React, and advanced UI components.

## 🌊 Overview

AquaVest helps users estimate the potential for rainwater harvesting at their properties by calculating:
- Annual rainwater harvesting potential based on rainfall data and roof area
- Optimal water storage tank size
- Cost-benefit analysis with payback period calculations
- Groundwater recharge potential
- Monthly water savings projections

## ✨ Core Features

- **Interactive Input Form**: Collects roof area, location, population data, and open space details
- **Location-Based Calculations**: Retrieves rainfall data based on selected district/state
- **Real-time Calculations**: Instant rainwater harvesting potential computations
- **IoT Rainfall Simulation**: Simulates real-time rainfall sensor data
- **Comprehensive Dashboard**: Visualizes:
  - Annual water harvest potential
  - Monthly harvest breakdown
  - Cost-benefit analysis charts
  - Water savings pie charts
  - Tank size recommendations
- **PDF Report Generation**: Downloadable reports with calculated data
- **Multi-language Support**: Support for English, Hindi, and Tamil
- **Theme Support**: Light/Dark mode toggle
- **Admin Feedback Panel**: Collect user feedback on calculations

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.8 with TypeScript
- **UI Library**: React 18.3.1 with Radix UI components
- **Styling**: Tailwind CSS with PostCSS
- **Form Management**: React Hook Form with Zod validation
- **Backend Services**: 
  - Firebase (Authentication & Database)
  - Google Genkit (AI integration)
- **Charts & Visualization**: 
  - Recharts for data visualization
  - Embla Carousel for image galleries
- **Icons**: Lucide React
- **Theming**: Next Themes

## 📦 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   ├── login/                   # Authentication pages
│   ├── signup/
│   ├── forgot-password/
│   ├── report/                  # Report generation
│   ├── admin/feedback/          # Admin feedback panel
│   ├── iot-connect/             # IoT simulation
│   ├── settings/                # User settings
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── aquavest/                # Core feature components
│   │   ├── input-form.tsx       # Input collection
│   │   ├── results-dashboard.tsx # Results display
│   │   ├── annual-potential-chart.tsx
│   │   ├── cost-benefit-chart.tsx
│   │   ├── water-savings-pie-chart.tsx
│   │   └── iot-simulation-card.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   ├── feedback-dialog.tsx
│   │   └── loading-animation.tsx
│   └── ui/                      # UI primitives (Radix UI)
├── contexts/                     # React contexts
│   ├── language-context.tsx     # i18n support
│   └── theme-builder-context.tsx
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                          # Utilities & config
│   ├── utils.ts                 # Calculation functions
│   ├── types.ts                 # TypeScript types
│   ├── firebase-config.ts       # Firebase setup
│   ├── data.ts                  # Location & rainfall data
│   └── placeholder-images.ts
├── locales/                      # i18n translations
│   ├── en.json
│   ├── hi.json
│   └── ta.json
└── ai/                           # AI integration
    ├── genkit.ts               # Genkit configuration
    └── dev.ts                  # Development server
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Environment variables configured (see `.env.local`)

### Installation

1. **Clone and navigate to project**:
   ```bash
   cd "c:\Users\USER\Downloads\rain water harvesting"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   # ... other Firebase config
   GENKIT_API_KEY=your_genkit_key
   ```

### Running the Project

**Development Mode**:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

**Production Build**:
```bash
npm run build
npm start
```

**Type Checking**:
```bash
npm run typecheck
```

**Linting**:
```bash
npm run lint
```

### AI Features (Optional)

**Run Genkit AI Server**:
```bash
npm run genkit:dev
```

**Watch Mode for Genkit**:
```bash
npm run genkit:watch
```

## 📊 Key Calculations

The application uses the following formula for rainwater harvesting potential:

$$\text{Annual Harvest} = \text{Rainfall (mm)} \times \text{Area (m²)} \times 0.85$$

Where 0.85 is the runoff coefficient accounting for losses.

## 🔐 Authentication

- Login required to access the dashboard
- Firebase Authentication integration
- Session management via sessionStorage
- Password recovery via forgot-password page

## 🌐 Internationalization (i18n)

Supports three languages:
- **English** (en)
- **Hindi** (hi)
- **Tamil** (ta)

Language can be switched via the language context.

## 🎨 Design System

- **Primary Color**: Deep Blue (#3F51B5) - represents water and reliability
- **Background Color**: Light Blue (#E3F2FD) - clean and refreshing
- **Accent Color**: Green (#4CAF50) - sustainability and calls to action
- **Font**: PT Sans (humanist sans-serif)
- **Icons**: Line-art style using Lucide React

## 📝 Available Pages

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/` | Main calculator and results display |
| Login | `/login` | User authentication |
| Sign Up | `/signup` | New user registration |
| Forgot Password | `/forgot-password` | Password recovery |
| IoT Connect | `/iot-connect` | Real-time rainfall simulation |
| Report | `/report` | Generated reports and analysis |
| Settings | `/settings` | User preferences and configuration |
| Admin Feedback | `/admin/feedback` | Feedback management |

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS plugins
- `apphosting.yaml` - Firebase App Hosting config

## 📦 Dependencies

Major dependencies include:
- **Next.js & React**: Core framework
- **Radix UI**: Accessible component primitives
- **React Hook Form & Zod**: Form validation
- **Firebase**: Backend services
- **Genkit**: AI integration
- **Recharts**: Data visualization
- **Tailwind CSS**: Utility-first styling

## 🧪 Development Workflow

1. Make changes in `src/` directory
2. The dev server auto-reloads on file changes
3. Check TypeScript errors: `npm run typecheck`
4. Run linter: `npm run lint`
5. Build for production: `npm run build`

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

  WEB LINK
  https://rain-water-harvesting-five.vercel.app/

## 🤝 Contributing

The project uses TypeScript for type safety and Tailwind CSS for styling. Follow the existing component patterns when adding new features.

## 📄 License

Private project for rainwater harvesting analysis.

---

**Status**: Development (v0.1.0)  
**Last Updated**: June 2026
