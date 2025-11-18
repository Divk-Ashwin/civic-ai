PROJECT_SPEC.md — CivicAI Master Plan (Social Impact Version)
1. Project Overview
App Name: CivicAI Tagline: "Your Voice. Smarter Action." Concept: An AI-assisted citizen reporting platform that transforms micro-disaster reporting into measurable social impact. Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, Recharts (for Impact Graphs). Visual Theme: "Civic-Tech Clean" — Professional, Trustworthy, Government-Grade.

2. Design System
Primary Color: #005A9C (Civic Blue).

Secondary Color: #1E293B (Slate-800) — Authority/Dark Mode elements.

Impact Colors (Badges):

Bronze (Contributor): #CD7F32

Silver (Guardian): #94A3B8

Gold (Sentinel): #F59E0B

Typography: Inter. Clean, ample whitespace.

UI Vibe: Less "Game App", more "Dashboard/Professional Profile".

3. Advanced Feature Logic
A. Geospatial Clustering (The Admin Savior)
Logic: Frontend clustering (using turf.js).

Behavior: If 50 users report the same pothole within 20m, the Admin sees "1 Incident (50 Witnesses)".

Value: Prevents dashboard clutter and shows priority based on crowd volume.

B. The "Feedback Loop" (Trust Builder)
Trigger: Admin marks an issue as RESOLVED.

Requirement: Admin must upload an "After" photo.

Action: System sends a notification: "The hazard you reported has been fixed. View the proof." This closes the loop and builds trust.

C. Civic Impact & Recognition (Replacing Gamification)
Concept: Instead of coupons, users earn "Social Credibility".

Metrics Calculated:

Reports Verified: Number of true reports.

Community Safety Score: estimated people helped (e.g., 1 Pothole = 50 commuters helped).

Carbon Offset: estimated waste properly diverted.

Badges:

Level 1: Active Citizen (1 Report).

Level 2: Community Guardian (10 Verified Reports).

Level 3: City Sentinel (50 Verified Reports + Top 1% Impact).

Certificate Generation: A button to "Download Certificate of Appreciation" (PDF style) signed by the Municipal Board (Mock).

4. Detailed Page Specifications
A. Home Page (app/page.tsx)
Hero: "Be the Eyes of Your City."

AI Interaction: Gemini-style input box.

Input: Upload Image of waste/hazard.

Output:

Identification: "Classified: E-Waste (High Hazard)."

Environmental Note: "Improper disposal releases toxins. Please report for specialized pickup."

Action: "Report generated."

B. Authentication (app/login, app/signup)
Professional Login: No "fun" graphics. Clean, centered cards.

Roles: Citizen, Govt Official, NGO Partner.

C. User Dashboard (app/dashboard/page.tsx)
Header: Profile with "Impact Level: Guardian 🛡️".

Main Layout:

Left (Report): Clean form with Location Pin, Image, and Voice Note (for accessibility).

Right (My Impact Card):

Stats: "3 Hazards Fixed", "150 Neighbors Helped".

Visual: A small progress bar to the next Badge Level.

Action: "Download My Impact Certificate" (Button).

My History: List of reports.

Status: If Resolved, show a "View Proof" button (displays the Admin's "After" photo).

D. Admin Dashboard (app/admin/page.tsx)
Top Bar: "City Command Center".

Filters: Area, Category, "Cluster View".

Data Table:

Smart Grouping: Rows represent Clusters, not just single reports.

Column: "Witness Count" (e.g., 42 people reported this).

Severity: AI-assigned (Critical/High/Low).

Resolve Modal:

Mandatory: Upload "Proof of Fix" image.

Text: "Notify [X] Citizens".

5. Folder Structure & Component Architecture
Plaintext

/app
  /admin
    page.tsx       # Admin Command Center
  /dashboard
    page.tsx       # User Impact Dashboard
  /login
    page.tsx
  /signup
    page.tsx
  page.tsx         # Landing Page
  layout.tsx       # Root Layout
  globals.css

/components
  /ui              # Reusable atoms (Button, Input, Card, Badge)
  /features
    /impact        # ImpactCard, BadgeIcon, CertificateDownload
    /reporting     # ReportForm, VoiceRecorder, ImageUpload
    /admin         # IncidentTable, ClusterMap, ResolveModal
  /layout          # Navbar (Sticky), Footer

/lib
  utils.ts         # Clustering logic (haversine/turf)
  impact-calc.ts   # Logic to calculate "People Helped" score
  mock-data.ts     # 50+ incidents (Clustered & Scattered)
6. Mock Data Strategy (lib/mock-data.ts)
Cluster A (Urgent): 35 reports of "Sewage Leak" at a specific interaction. High Severity.

Cluster B (Nuisance): 15 reports of "Fallen Branch". Low Severity.

User Profile Mock:

Name: "Arjun K."

Role: "Citizen"

Stats: 12 Reports, 8 Resolved, Badge: "Guardian".