# 🌸 PulseCare Lite

A professional mental wellness app designed for college students and young professionals. Track your mood, practice mindfulness, and gain insights into your emotional wellbeing.

## ✨ Features

### 🏠 **Home Screen - Mood Check-in**
- Intuitive emoji slider for mood selection (😢 😞 😐 😊 😄)
- Optional text input to describe your day
- Clean, professional design with calming gradients
- Intelligent mood classification and storage

### 🧘 **Intervention Screen - Guided Breathing**
- Interactive breathing circle animation with countdown timer
- Rotating collection of evidence-based coping strategies:
  - 5-4-3-2-1 grounding technique
  - Progressive muscle relaxation
  - Mindful awareness exercises
  - Box breathing technique
- Encouraging affirmations after completion
- Seamless flow from mood input to intervention

### 📊 **Dashboard - Mood Analytics**
- Visual trend analysis of your last 30 mood check-ins
- Intelligent insights based on your patterns:
  - Streak tracking for positive moods
  - Stress pattern recognition
  - Improvement notifications
- Clean bar chart visualization using Recharts
- Privacy-focused with local data storage

### 📝 **Gratitude Journal**
- Daily gratitude practice with 3 things you're grateful for
- Local storage with date tracking
- Beautiful card-based layout
- Encourages consistent positive reflection

### ⏰ **Meditation Timer**
- Customizable meditation sessions (1-60 minutes)
- Peaceful chime notifications
- Session tracking and completion feedback
- Simple, distraction-free interface

### ⚙️ **Settings & Privacy**
- Complete data management controls
- Clear mood history, gratitude entries, and meditation logs
- Privacy-first approach with local storage
- Clean, accessible settings interface

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with custom variants

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Jaydeeprawat17/PulseCare-Lite.git
   cd pulsecare-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

## 📱 PWA Features

PulseCare Lite is a Progressive Web App (PWA) that offers:
- **Offline functionality** - Works without internet connection
- **Install to home screen** - Add to your phone's home screen
- **Fast loading** - Optimized performance and caching
- **Responsive design** - Works perfectly on all devices

## 🎨 Design System

### Color Palette
- **Primary**: Calming blue tones for trust and tranquility
- **Secondary**: Soft lavender accents for mindfulness
- **Background**: Subtle gradients with off-white base
- **Text**: High contrast for accessibility

### Typography
- Clean, readable fonts optimized for wellness content
- Hierarchical sizing for clear information architecture

### Animations
- Subtle, purposeful transitions using CSS transforms
- Breathing animation with smooth, calming motion
- Micro-interactions for enhanced user experience

## 📋 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── BreathingExercise.tsx
│   ├── MoodSlider.tsx
│   └── Navigation.tsx
├── pages/               # Route components
│   ├── Home.tsx         # Mood check-in
│   ├── Breathing.tsx    # Intervention screen
│   ├── Dashboard.tsx    # Analytics & insights
│   ├── Gratitude.tsx    # Gratitude journal
│   ├── Meditation.tsx   # Meditation timer
│   └── Settings.tsx     # Data management
├── lib/                 # Utility functions
└── hooks/              # Custom React hooks
```

## 💾 Data Storage

All user data is stored locally in the browser using localStorage:
- **Mood History**: Last 30 mood check-ins with timestamps
- **Gratitude Entries**: Daily gratitude journal entries
- **Meditation Sessions**: Completed meditation logs
- **Privacy**: No data sent to external servers

## 🔒 Privacy & Security

- **Local-first**: All data stays on your device
- **No tracking**: No analytics or user tracking
- **Clear controls**: Easy data deletion in Settings
- **GDPR compliant**: No personal data collection

## 📈 Future Enhancements

- [ ] Cloud sync with Supabase integration
- [ ] Mood reminders and notifications
- [ ] Export data functionality
- [ ] Advanced analytics and trends
- [ ] Customizable breathing exercises
- [ ] Mood sharing with healthcare providers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

 
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)

---

**Made with 💙 for mental wellness**

*PulseCare Lite - Taking small steps toward better mental health, one check-in at a time.*