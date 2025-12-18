# lifestyle-goals-planner

Your personal **life OS** – a mobile-first web app designed to be your north star for lifestyle optimization. Track goals across finance, health, relationships, career, and personal development. Get daily focus recommendations and an AI chatbot that guides you toward your vision.

## Features

✨ **Goal Management** – Organize goals by category (Finance, Health, Social, Career, Personal)  
📊 **Progress Tracking** – Visual progress bars and timeframe planning (short/medium/long-term)  
📱 **Mobile-First Design** – Optimized for phone usage (99% of the time), responsive and touch-friendly  
🤖 **AI Chatbot** – Life coach assistant that helps with daily planning, goal refinement, and motivation  
📅 **Google Calendar Integration** – Connect daily goals with your calendar for real-world execution  
📋 **Daily Focus View** – Get 3–5 actionable focuses each day from your active goals  
🏗️ **Life Blueprint** – Pre-built framework for designing a sustainable lifestyle (finance, health, social, business, personal)

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Storage:** LocalStorage (local-first), future Supabase for sync  
- **Build:** Vite, PostCSS
- **AI:** Placeholder for OpenAI/LLM integration

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/milenndo/lifestyle-goals-planner.git
cd lifestyle-goals-planner
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # TabBar, PageContainer
│   ├── goals/           # GoalList, GoalForm
│   ├── daily/           # DailyView
│   ├── blueprint/       # BlueprintView
│   └── chat/            # ChatPanel
├── hooks/
│   └── useGoals.ts      # Goal state management with localStorage
├── types/
│   └── goal.ts          # TypeScript types
├── App.tsx              # Main app logic
├── main.tsx             # React entry point
└── styles.css           # Global Tailwind styles
```

## Usage

1. **Add Goals** – Click "+ Nова цел" to create goals in any category
2. **Daily Check-In** – View the "Ден" tab each morning to see your focus for the day
3. **Track Progress** – Update goal progress and status as you complete milestones
4. **Chat with Bot** – Use the 💬 button to get advice, create plans, or break down goals
5. **Sync with Calendar** – (Coming soon) Send goals to Google Calendar for scheduling

## Roadmap

- [ ] Google Calendar OAuth + event creation
- [ ] AI chatbot backend integration (OpenAI/Sonar)
- [ ] Supabase authentication and cloud sync
- [ ] Push notifications for daily focus
- [ ] Android APK packaging
- [ ] Weekly/monthly analytics dashboard
- [ ] Habit stacking and habit tracking
- [ ] Export goals as PDF

## PWA & Native

This app is designed as a Progressive Web App (PWA), so you can:
- Add it to your home screen on mobile ("Add to Home Screen")
- Use it offline with cached data
- Later package it as a native Android APK for private use

## License

Private project. For personal use only.

## Support

For questions or feature requests, open an issue or reach out.

---

**Built with ❤️ as a personal north star for lifestyle mastery.**
