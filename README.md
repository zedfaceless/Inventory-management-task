# Multi-Warehouse Inventory Management System

## Overview

Enhance the existing Multi-Warehouse Inventory Management System built with Next.js and Material-UI (MUI) for GreenSupply Co, a sustainable product distribution company. The current system is functional but needs significant improvements to be production-ready.

## 🎯 Business Context

GreenSupply Co distributes eco-friendly products across multiple warehouse locations throughout North America. They need to efficiently track inventory across warehouses, manage stock movements, monitor inventory values, and prevent stockouts. This system is critical for their daily operations and customer satisfaction.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Material-UI (MUI)](https://mui.com/) - UI component library
- [React](https://reactjs.org/) - JavaScript library
- JSON file storage (for this assessment)

## 📋 Current Features (Already Implemented)

The basic system includes:

- ✅ Products management (CRUD operations)
- ✅ Warehouse management (CRUD operations)
- ✅ Stock level tracking per warehouse
- ✅ Basic dashboard with inventory overview
- ✅ Navigation between pages
- ✅ Data persistence using JSON files

**⚠️ Note:** The current UI is intentionally basic. We want to see YOUR design skills and creativity.

---

## 🚀 Your Tasks (Complete ALL 3)

---

## Task 1: Redesign & Enhance the Dashboard

**Objective:** Transform the basic dashboard into a professional, insightful command center for warehouse operations.

### Requirements:

Redesign the dashboard to provide warehouse managers with actionable insights at a glance. Your implementation should include:

- **Modern, professional UI** appropriate for a sustainable/eco-friendly company
- **Key business metrics** (inventory value, stock levels, warehouse counts, etc.)
- **Data visualizations** using a charting library of your choice
- **Enhanced inventory overview** with improved usability
- **Fully responsive design** that works across all device sizes
- **Proper loading states** and error handling

Focus on creating an interface that balances visual appeal with practical functionality for daily warehouse operations.

---

## Task 2: Implement Stock Transfer System

**Objective:** Build a complete stock transfer workflow with proper business logic, validation, and data integrity.

### Requirements:

**A. Stock Transfer System**

Build a complete stock transfer system that allows moving inventory between warehouses. Your implementation should include:

- Data persistence for transfer records (create `data/transfers.json`)
- API endpoints for creating and retrieving transfers
- Proper validation and error handling
- Stock level updates across warehouses
- Transfer history tracking

Design the data structure, API contracts, and business logic as you see fit for a production system.

**B. Transfer Page UI**

Create a `/transfers` page that provides:

- A form to initiate stock transfers between warehouses
- Transfer history view
- Appropriate error handling and user feedback

Design the interface to be intuitive for warehouse managers performing daily operations.

---

## Task 3: Build Low Stock Alert & Reorder System

**Objective:** Create a practical system that helps warehouse managers identify and act on low stock situations.

### Requirements:

Build a low stock alert and reorder recommendation system that helps warehouse managers proactively manage inventory levels.

**Key Functionality:**

- Identify products that need reordering based on current stock levels and reorder points
- Categorize inventory by stock status (critical, low, adequate, overstocked)
- Provide actionable reorder recommendations
- Allow managers to track and update alert status
- Integrate alerts into the main dashboard

**Implementation Details:**

- Create an `/alerts` page for viewing and managing alerts
- Calculate stock across all warehouses
- Persist alert tracking data (create `data/alerts.json`)
- Design appropriate status workflows and user actions

Use your judgment to determine appropriate thresholds, calculations, and user workflows for a production inventory management system.

---

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Screen recording software for video submission (Loom, OBS, QuickTime, etc.)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Project Structure

```
inventory-management-task/
├── data/                  # JSON data files
├── src/
│   └── pages/            # Next.js pages and API routes
└── package.json
```

The existing codebase includes product, warehouse, and stock management features. Explore the code to understand the current implementation before starting your tasks.

---

## 📝 Submission Requirements

### 1. Code Submission

- Push your code to **your own GitHub repository** (fork or new repo)
- Clear commit history showing your progression
- Update `package.json` with any new dependencies
- Application must run with: `npm install && npm run dev`

### 2. Video Walkthrough (5-10 minutes) - REQUIRED ⚠️

Record a video demonstration covering:

**Feature Demo (4-5 minutes)**

- Redesigned dashboard walkthrough (demonstrate responsiveness)
- Stock transfer workflow (show both successful and error scenarios)
- Alert system functionality

**Code Explanation (3-4 minutes)**

- Key technical decisions and approach
- Most challenging aspects and solutions
- Code structure highlights

**Reflection (1-2 minutes)**

- What you're proud of
- Known limitations or trade-offs
- What you'd improve with more time

**Format:** Upload to YouTube (unlisted), Loom, or similar platform. Include link in your README.

### 3. Update This README

Add an implementation summary at the bottom with:

- Your name and completion time
- Features completed
- Key technical decisions
- Known limitations
- Testing instructions
- Video walkthrough link
- Any new dependencies added

---

## ⏰ Timeline

**Deadline:** 3 days (72 hours) from receiving this assignment

Submit:

1. GitHub repository link
2. Video walkthrough link
3. Updated README with implementation notes

**Estimated effort:** 15-18 hours total

**Note:** This timeline reflects real-world project constraints. Manage your time effectively and prioritize core functionality over bonus features.

---

## 🏆 Optional Enhancements

If you have extra time, consider adding:

- Live deployment (Vercel/Netlify)
- Dark mode
- Export functionality (CSV/PDF)
- Keyboard shortcuts
- Advanced filtering
- Accessibility features
- Unit tests
- TypeScript
- Additional features you think add value

**Important:** Complete all 3 core tasks before attempting bonuses. Quality of required features matters more than quantity of extras.

---

## 🤔 Frequently Asked Questions

**Q: Can I use additional libraries?**
A: Yes! Add them to package.json and document your reasoning.

**Q: What if I encounter technical blockers?**
A: Document the issue, explain what you tried, and move forward with the next task. Include this in your video explanation.

**Q: Can I modify the existing data structure?**
A: You can add fields, but don't break the existing structure that other features depend on.

**Q: What if I can't complete everything?**
A: Submit what you have with clear documentation. Quality over quantity.

**Q: How will my submission be used?**
A: This is solely for technical assessment. Your code will not be used commercially.

---

## 🚀 Final Notes

This assessment is designed to simulate real-world development scenarios. We're looking for:

- Clean, maintainable code
- Thoughtful problem-solving
- Professional UI/UX
- Proper error handling
- Good communication skills (via your video)

Do your best work, document your decisions, and show us how you approach building production applications.

Good luck! 💪

---

**Setup issues?** Verify Node.js is installed and you're using a modern browser. If problems persist, document them in your submission.

---

## 📝 Implementation Summary

**Developer:** Melchizedek Galvan Fernandez
**Completion Time:** 19 hours  
**Completion Date:** January 14, 2026

### ✅ Features Completed

#### Required Tasks

1. **Dashboard Redesign & Enhancement**

   - Modern eco-friendly green theme with dark mode support
   - 6 key business metric cards with icons
   - Data visualizations using Recharts (bar chart + pie chart)
   - Enhanced inventory table with search functionality
   - Fully responsive design with side navigation
   - Critical alerts preview section
   - Loading states and error handling

2. **Stock Transfer System**

   - Complete transfer workflow between warehouses
   - API endpoints with comprehensive validation
   - Real-time stock level updates
   - Transfer history tracking with date/time
   - Success/error feedback with visual alerts
   - Business logic preventing invalid transfers (same warehouse, insufficient stock)

3. **Low Stock Alert & Reorder System**
   - Automatic alert generation based on stock levels
   - Alert categorization (critical, low, warning, adequate, overstocked)
   - Filtering by status and acknowledged state
   - Search functionality across products
   - Acknowledge/unacknowledge actions
   - Reorder recommendations with cost estimates
   - Dashboard integration with alert preview
   - Statistics dashboard with 6 metric cards

#### Bonus Features

- **Dark Mode:** Toggle between light/dark themes with localStorage persistence
- **Side Navigation:** Professional persistent sidebar layout
- **Search Functionality:** Implemented on all major pages (Products, Warehouses, Stock, Transfers, Alerts)
- **Responsive Design:** Mobile-first approach, works on all device sizes
- **Enhanced UX:** Hover effects, animations, loading states throughout

### 🔧 Key Technical Decisions

1. **Component Architecture**

   - Reusable components (MetricCard, Layout, Alert components)
   - Separation of concerns (presentational vs container components)
   - Custom hooks for data fetching (`useDashboardData`)

2. **State Management**

   - React Context API for theme management
   - Local component state for forms and UI interactions
   - localStorage for theme persistence

3. **API Design**

   - RESTful endpoints with proper HTTP methods
   - Comprehensive validation and error handling
   - Automatic stock level updates on transfers
   - Dynamic alert generation based on current data

4. **Utility Functions**

   - Centralized calculation logic (`calculations.js`, `alertCalculations.js`)
   - Reusable formatting functions (currency, numbers)
   - Pure functions for predictable behavior

5. **Styling Approach**
   - Material-UI component library for consistency
   - Custom theme with eco-friendly color palette
   - Dark theme with proper contrast ratios
   - Responsive design using MUI breakpoints

### 🚧 Known Limitations

1. **No Authentication/Authorization** - All users have full access
2. **In-Memory Data** - Uses JSON files instead of a real database
3. **No Real-Time Updates** - Manual refresh required to see changes from other users
4. **Limited Analytics** - Basic charts, could expand with trends over time
5. **No Email Notifications** - Alert system doesn't send actual emails
6. **No Audit Trail** - Transfer/alert changes aren't tracked historically

### 🔮 Future Improvements (Given More Time)

1. **Database Integration** - PostgreSQL or MongoDB for production
2. **User Authentication** - Role-based access control (Admin, Manager, Viewer)
3. **Real-Time Updates** - WebSocket integration for live data
4. **Advanced Analytics** - Trend analysis, forecasting, seasonal patterns
5. **Email Notifications** - Automated alerts for critical stock levels
6. **Barcode Scanning** - Mobile app integration
7. **Multi-Language Support** - Internationalization (i18n)
8. **Audit Logs** - Complete history of all changes
9. **Batch Operations** - Bulk updates and imports
10. **Unit Tests** - Comprehensive test coverage

### 📦 New Dependencies Added

- `recharts` (^2.5.0) - Data visualization charts
- `@mui/icons-material` (^5.11.0) - Material-UI icons
- `date-fns` (^2.29.3) - Date formatting utilities

### 🧪 Testing Instructions

1. **Install dependencies:**

```bash
   npm install
```

2. **Run development server:**

```bash
   npm run dev
```

3. **Access the application:**

```
   http://localhost:3000
```

4. **Test Features:**

   - **Dashboard:** View metrics, charts, and alerts
   - **Products:** Add, edit, delete products
   - **Warehouses:** Manage warehouse locations
   - **Stock Levels:** Update inventory quantities
   - **Transfers:** Create transfers between warehouses (try valid and invalid scenarios)
   - **Alerts:** View low stock alerts, filter, acknowledge
   - **Dark Mode:** Toggle theme in sidebar
   - **Responsive:** Resize browser or use DevTools device emulation

5. **Test Data Scenarios:**
   - Reduce stock below reorder point to generate alerts
   - Transfer stock between warehouses
   - Acknowledge alerts and refresh
   - Search and filter on all pages

### 🎥 Video Walkthrough

https://www.youtube.com/watch?v=TsKNkHH_q6c

### 🙏 Acknowledgments

Built as part of a technical assessment for warehouse management systems. Special focus on clean code, user experience, and production-ready features.

---
