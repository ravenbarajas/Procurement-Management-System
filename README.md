# Procurement Management System - Frontend Prototype

A functional and visually appealing frontend prototype for a Procurement Management System built with React, TypeScript, and Shadcn UI components. This system focuses on tracking procurement processes, managing vendor contracts, and providing financial insights through interactive mock data and real-time analytics.

## Features

### Procurement Tracking
- Monitor purchase orders, approvals, and delivery statuses.
- Filterable tables for tracking procurement activities.

### Vendor Management
- Manage vendor details, contracts, and performance metrics.
- Interactive tools to evaluate vendor compliance and delivery reliability.

### Financial Insights
- Dashboard displaying KPIs such as total procurement spend, cost savings, and budget utilization.
- Drill-down charts for detailed financial analysis.

### Real-Time Analytics
- Interactive charts and reports showcasing trends in procurement activities.
- Search functionality across all pages.

## UI/UX Specifications
- **Design**: Polished and consistent design using Shadcn UI components.
- **Theme**: Dark mode and light mode toggle functionality.
- **Responsiveness**: Optimized for desktop, tablet, and mobile devices.

## Navigation
- Intuitive navigation bar with links to:
  - Dashboard
  - Procurement Processes
  - Vendor Management
  - Financial Reports
  - Settings (including theme toggle)
- Breadcrumbs for easy navigation within nested pages.

## Mock Data
Simulated data includes:
- Purchase orders (e.g., pending, approved, rejected).
- Vendor performance metrics (e.g., delivery time, contract compliance).
- Financial transactions (e.g., budget allocation vs. actual spend).

## Technology Stack

- **Framework**: React with TypeScript.
- **UI Components**: Shadcn UI.
- **Charting Library**: Chart.js or Recharts for analytics visualizations.
- **State Management**: Context API or Zustand.

## Project Structure

```
/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/      # Dashboard-specific components
│   │   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   │   └── ui/             # Shadcn UI components
│   │   ├── data/               # Mock data for demonstration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── pages/              # Page components
│   │   └── App.tsx             # Main application component
├── server/                     # Minimal Express backend
└── shared/                     # Shared types and utilities
```

## Getting Started

### Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5000`

## Usage

This prototype demonstrates the UI and interaction patterns for a Procurement Management System. It uses mock data for demonstration purposes and does not require backend integration.

## Contributing

This project is a prototype designed for educational purposes. Fork the repository to customize or extend its features.

## License

<<<<<<< HEAD
This project is available under the MIT License for educational and demonstration purposes.
=======
This project is available under the MIT License for educational and demonstration purposes.
>>>>>>> 2339a04 (Updated Project Contents)
