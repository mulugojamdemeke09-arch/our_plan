# ❤️ Our Weekend • Weekend Date Planner for Couples in Addis Ababa

> **A full-stack Next.js date planning app created for couples in Addis Ababa, Ethiopia who work hard Monday–Friday and treasure their weekends together.**

---

## 🌟 Key Features

### 1. 📱 Designed for iPhone 12 & Modern Web
- **Optimized for iPhone 12 Viewport (390 × 844 pt)**: Smooth touch navigation, safe-area insets (`env(safe-area-inset-bottom)`), iOS-style bottom tab bar, and responsive touch targets.
- **Desktop iPhone 12 Simulator**: Switch between full desktop view and an authentic iPhone 12 preview frame at any time with the toggle button in the top header.

### 2. ⏳ Monday–Friday Work Escape & Weekend Countdown
- Real-time countdown clock tracking days, hours, minutes, and seconds until the weekend.
- Addis Ababa weather forecast and couple encouragement banner.
- Saturday & Sunday itinerary manager with interactive preparation checklists, budgets in ETB, and dress code guidance.

### 3. 🎭 Addis Ababa Weekend Events
- Curated weekend events across Addis Ababa:
  - **Fendika Cultural Centre**: Weekend Ethio-Jazz & Azmari live jam sessions (Kazanchis).
  - **Entoto Natural Park**: Mountain acoustic sunset sessions & bonfires.
  - **Sarbet / Old Airport**: Weekend Artisan Market & organic brunch.
  - **Addis Fine Art**: Contemporary art openings & vernissages.
  - **Alliance Ethio-Française**: Open-air cinema under the stars (Piassa).
  - **Atmosphere Addis**: Couple Sip & Paint workshops.
- **"Make Date From This Event"** button: Automatically creates a weekend date draft pre-filled with the event details!

### 4. ☕ Romantic Restaurants, Coffee Houses & Interactive Map
- **Interactive Addis Ababa Map**: Color-coded markers for Coffee Houses (Amber), Restaurants (Rose), Scenic Spots (Emerald), and Lounges (Purple).
- **Subcity quick navigation**: Bole, Piassa, Entoto Hills, Kazanchis, Old Airport / Sarbet.
- Curated spots with ratings, price tiers, average cost for two in ETB, signature orders (e.g. *Tomoca Macchiato*, *Kuriftu Grilled Tilapia*, *Gusto Truffle Tagliolini*), and romantic date highlights.
- Direct **Apple Maps** (one tap on iPhone opens Apple Maps) and **Google Maps** navigation links.

### 5. 🔔 Smart Reminders & iPhone Calendar Sync
- **Add to iPhone Calendar (`.ics`)**: One-tap download opens native iOS Calendar on iPhone 12 with location, notes, and automatic 2-hour reminder alarms preset.
- **Web Push Notifications**: Browser notification permissions and test alert support.

### 6. 🗄️ Full-Stack Backend & Database
- Next.js App Router API endpoints (`/api/dates`, `/api/events`, `/api/spots`, `/api/export-ics`).
- Persistent storage in `data/db.json`.

---

## 🚀 Running the App Locally

The dev server is currently running at:
```bash
http://localhost:3001
```

To run it anytime:
```powershell
npm.cmd run dev -- -p 3001
```
