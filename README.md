# 📅 Interactive Wall Calendar Component

A polished, responsive **Wall Calendar UI** built using **Next.js, React, Tailwind CSS, and Framer Motion**.
This project transforms a static calendar design into a fully interactive, modern web component with enhanced UI/UX.

---

## 🚀 Features

### 🖼 Wall Calendar Aesthetic

* Inspired by a physical wall calendar
* Hero image paired with the monthly calendar grid
* Clean, structured layout with visual hierarchy

### 📆 Date Range Selection

* Select **start and end dates**
* Highlights:

  * Start date
  * End date
  * Range in between
* Smart selection handling (auto-adjusts range)

### 📝 Notes Section

* Add notes for selected dates
* Clean and minimal input UI
* Designed for future extensibility (per-date storage)

### 🎨 Dynamic Month Themes

* Each month has a **unique color theme**
* Enhances visual experience and seasonality

  * Winter (Jan) ❄️
  * Holi vibes (March) 🎨
  * Diwali vibes (October) 🪔

### ✨ Smooth Animations

* Built with **Framer Motion**
* Hover and click interactions
* Subtle scaling effects for better UX

### 📱 Fully Responsive

* **Desktop:** Side-by-side layout (image + calendar)
* **Mobile:** Stacked layout
* Touch-friendly interactions

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Library:** React
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Date Utilities:** date-fns

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/calendar-ui.git
cd calendar-ui
```

Install dependencies:

```bash
npm install
```

Install required packages:

```bash
npm install date-fns framer-motion clsx
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
components/
  calendar/
    CalendarContainer.tsx
    CalendarGrid.tsx
    DateCell.tsx
    NotesSection.tsx

utils/
  calendar.ts

app/
  page.tsx
```

---

## 🎯 Key Concepts Implemented

* Component-based architecture
* State management using React hooks
* Dynamic calendar generation
* Range selection logic
* Responsive design patterns
* UI/UX design principles

---

## ✨ Future Improvements

* 💾 Save notes using localStorage
* 📌 Add holiday markers (Holi, Diwali, etc.)
* 🎴 Calendar flip animation (like real wall calendar)
* 🎨 Auto theme generation from image
* 🔔 Reminder system

---

## 🙌 Acknowledgements

* Inspired by a **physical wall calendar design**
* Built as a frontend engineering challenge

---

## 📌 Author

**Your Name**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share your feedback!
