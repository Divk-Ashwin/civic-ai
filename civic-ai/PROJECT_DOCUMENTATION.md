# CivicAI - Complete Project Documentation

## Project Overview
**CivicAI** is an AI-assisted citizen reporting platform that transforms micro-disaster reporting into measurable social impact. It enables citizens to report urban hazards (potholes, garbage, electrical issues, etc.), uses AI clustering to identify critical hotspots, and provides transparent resolution tracking with government accountability.

---

## Core Philosophy
1. **Empowering the Citizen**: Every citizen becomes a guardian of their community through easy hazard reporting and community validation
2. **AI-Driven Efficiency**: Automatic clustering of related incidents reveals patterns and prioritizes critical issues
3. **Building Trust Through Transparency**: Mandatory photo verification and citizen notifications create accountability

---

## Tech Stack

### Frontend Framework
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**

### Styling & UI
- **Tailwind CSS v4** (with @tailwindcss/postcss)
- **Lucide React** (Icon library)
- Custom design system: "Civic-Tech Clean" theme
  - Primary color: #005A9C (Civic Blue)
  - Critical color: #DC2626 (Red)
  - Impact badges: Bronze #CD7F32, Silver #94A3B8, Gold #F59E0B
  - Font: Inter from Google Fonts

### State Management & Data
- **React Context API** (AuthContext for authentication)
- **LocalStorage** (for auth persistence - will migrate to Firebase)
- **Mock Data** (currently in `lib/mock-data.ts` - will migrate to Firestore)

### Mapping
- **Leaflet 1.9.4** (Mapping library)
- **react-leaflet 4.2.1** (React integration)
- Custom pulsing markers for hotspots
- OpenStreetMap tiles

### Charts & Visualization
- **Recharts 3.3.4** (for admin dashboard analytics)

### Notifications & Media
- **Sonner 2.0.7** (Toast notifications)
- **react-media-recorder 1.7.2** (Voice recording)

### Build Tools
- **PostCSS** with Autoprefixer
- **ESLint** for code quality
- **babel-plugin-react-compiler**

---

## Project Structure

```
civic-ai/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Home page (Hero + AI Input)
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   ├── globals.css               # Global styles (Tailwind imports)
│   │   ├── about/page.tsx            # About page (Mission & Philosophy)
│   │   ├── impact/page.tsx           # Impact metrics & leaderboard
│   │   ├── login/page.tsx            # Login page (email-based routing)
│   │   ├── signup/page.tsx           # Signup with role selection
│   │   ├── dashboard/page.tsx        # Citizen dashboard
│   │   ├── admin/page.tsx            # Admin/NGO dashboard
│   │   └── profile/page.tsx          # User profile & settings
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx            # Responsive navbar with auth
│   │   │
│   │   ├── features/
│   │   │   ├── landing/
│   │   │   │   └── Hero.tsx          # Landing page hero section
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── AuthLayout.tsx    # Auth page wrapper
│   │   │   │   └── RoleSelector.tsx  # Role selection (Citizen/Govt/NGO)
│   │   │   │
│   │   │   ├── reporting/
│   │   │   │   ├── AIInputBox.tsx    # AI analysis input (home page)
│   │   │   │   ├── AnalysisCard.tsx  # AI analysis results display
│   │   │   │   └── ReportForm.tsx    # Full hazard reporting form
│   │   │   │
│   │   │   ├── impact/
│   │   │   │   └── ImpactCard.tsx    # User impact stats & badges
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardHeader.tsx    # Citizen dashboard header
│   │   │   │   └── RecentReports.tsx      # Recent reports list
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminHeader.tsx        # Admin dashboard header
│   │   │       ├── StatsGrid.tsx          # Admin metrics (3 cards)
│   │   │       ├── ResolveModal.tsx       # Issue resolution modal
│   │   │       ├── IncidentTable.tsx      # Clustered incidents table
│   │   │       └── ClusterMap.tsx         # Interactive map view
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx           # Global authentication state
│   │
│   └── lib/
│       ├── utils.ts                  # cn() helper for Tailwind
│       └── mock-data.ts              # Mock incident data with clustering
│
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── REQUIREMENTS.md                   # All dependencies with versions
├── PROJECT_SPEC.md                   # Original project specification
├── install.bat                       # Windows installation script
└── install.sh                        # Unix installation script
```

---

## Authentication System (Current Mock Implementation)

### AuthContext (`src/contexts/AuthContext.tsx`)
**Current Implementation:**
- Uses React Context API for global state
- Stores user data in `localStorage` as JSON
- User object structure:
  ```typescript
  {
    name: string,      // Derived from email
    email: string,     // User's email
    role: "citizen" | "admin" | "ngo"
  }
  ```
- Functions:
  - `login(email, role)` - Creates user session
  - `logout()` - Clears user session
  - `isLoggedIn` - Boolean flag
  - `user` - Current user object or null

**Mock Logic:**
- Login page: If email contains "admin" → admin role, "ngo" → ngo role, else citizen
- Signup page: Role selected via RoleSelector component
- Auth persists across page refreshes via localStorage

**Firebase Migration Plan:**
```typescript
// Replace with:
- Firebase Authentication (email/password, Google OAuth)
- Store user role in Firestore `/users/{uid}` collection
- Use onAuthStateChanged for real-time auth state
- Replace localStorage with Firebase session management
```

---

## Mock Data Structure

### Current Location: `src/lib/mock-data.ts`

### Incident Data Structure:
```typescript
interface Incident {
  id: string;              // e.g., "INC-001"
  title: string;           // Brief description
  description: string;     // Detailed description
  category: string;        // "Sewage" | "Road" | "Electrical" | "Waste"
  location: string;        // Address string
  coordinates: { lat: number; lng: number };
  severity: "critical" | "high" | "medium";
  status: "pending" | "in-progress" | "resolved";
  reportedDate: string;    // ISO date string
  reportedBy: string;      // User ID/name
  confirmations: number;   // Witness count for clustering
  assignedTo?: string;     // Admin/NGO assigned
  resolvedDate?: string;   // ISO date string
  beforeImage?: string;    // URL or base64
  afterImage?: string;     // URL or base64
}
```

### Current Mock Data (8 Incidents):
1. **INC-001**: Charminar Sewage - 42 confirmations (CRITICAL hotspot)
2. **INC-002**: Banjara Hills Road - 8 confirmations
3. **INC-003**: Gachibowli Electrical - 12 confirmations
4. **INC-004**: Secunderabad Garbage - 28 confirmations (CRITICAL hotspot)
5. **INC-005**: Hitec City Road - 5 confirmations
6. **INC-006**: Jubilee Hills Waste - 35 confirmations (CRITICAL hotspot)
7. **INC-007**: Madhapur Electrical - 3 confirmations
8. **INC-008**: Kukatpally Road - 15 confirmations

**Clustering Logic:**
- Incidents with `confirmations > 10` are marked as "hotspots"
- Map view shows pulsing red markers for hotspots
- Admin table displays witness count with Users icon
- Hotspot = Critical priority requiring immediate action

### Stats Calculation (`getIncidentStats()`):
```typescript
{
  totalIncidents: number,
  activeIssues: number,      // pending + in-progress
  resolvedToday: number,      // resolved today count
  communityImpact: number,    // Sum of all confirmations
  criticalCount: number,      // severity === "critical"
  averageResponseTime: string // "4.2 hours"
}
```

**Firebase Migration Plan:**
```
Firestore Collections:
├── /incidents/{incidentId}          # Main incident documents
│   ├── id, title, description, category
│   ├── location, coordinates (GeoPoint)
│   ├── severity, status
│   ├── reportedDate (Timestamp)
│   ├── reportedBy (userId reference)
│   ├── confirmations (number)
│   ├── confirmedBy (array of userIds)
│   ├── assignedTo (userId reference)
│   ├── resolvedDate (Timestamp)
│   ├── beforeImageUrl (Cloud Storage URL)
│   └── afterImageUrl (Cloud Storage URL)
│
├── /users/{userId}                   # User profiles
│   ├── name, email, phone
│   ├── role ("citizen" | "admin" | "ngo")
│   ├── rewardPoints (number)
│   ├── badge (string)
│   ├── level (number)
│   ├── location (string)
│   └── joinedDate (Timestamp)
│
├── /userComplaints/{userId}/complaints/{complaintId}  # User's reports
│   └── Reference to /incidents/{incidentId}
│
└── /notifications/{notificationId}   # Push notifications
    ├── userId (reference)
    ├── incidentId (reference)
    ├── type ("resolved" | "status_update")
    ├── message (string)
    ├── read (boolean)
    └── timestamp (Timestamp)
```

---

## User Roles & Permissions

### 1. Citizen Role
**Access:** `/dashboard`, `/profile`

**Features:**
- Report hazards via ReportForm (8 categories)
- Upload images (before photos)
- Record voice notes (future: speech-to-text)
- View personal impact stats (reports, verified, people helped)
- Earn reward points (1250 mock points)
- Badge progression: Bronze → Silver → Gold → City Sentinel
- Cancel pending complaints
- View recent reports with status
- Help Center access

**Dashboard Layout:**
- Left (66%): ReportForm with geolocation, category picker, media upload
- Right (33%): ImpactCard + RecentReports

**Profile Sections:**
- User details (name, email, phone, location, joined date)
- Reward Points card with progress bar
- My Complaints (4 mock complaints with cancel option)
- Help Center (3 links)
- Logout button

### 2. Admin Role (Government Officials)
**Access:** `/admin`, `/profile`

**Features:**
- View all clustered incidents (table + map toggle)
- Filter by status (All/Pending/In Progress/Resolved)
- Filter by severity (All/Critical/High/Medium)
- Assign incidents to self or team
- Resolve incidents with mandatory after photo
- Notify all witnesses upon resolution
- View stats grid (active issues, resolved today, community impact)
- Interactive map with hotspot markers

**Dashboard Layout:**
- AdminHeader with Shield icon
- StatsGrid (3 metric cards)
- Filter controls
- IncidentTable OR ClusterMap (toggle view)
- ResolveModal for completion

**Profile Sections:**
- User details
- Recently Resolved Complaints (4 mock with citizen notification count)
- Logout button

### 3. NGO Role
**Access:** Same as Admin (`/admin`, `/profile`)
**Permissions:** Identical to Admin (partner organizations)

---

## Key Features & Components

### 1. AI Input & Analysis (Home Page)
**Component:** `AIInputBox.tsx`
- Large textarea for hazard description
- Image upload with preview
- Voice recording with timer (pulsing red animation)
- "Analyze" button triggers mock AI analysis
- Shows AnalysisCard with E-Waste example

**Mock Analysis Output:**
```javascript
{
  category: "E-Waste",
  severity: "Medium",
  description: "Electronic waste disposal violation detected...",
  recommendation: "Contact Municipal E-Waste Collection Center",
  estimatedImpact: "Preventing soil contamination for 500+ residents"
}
```

**Firebase Migration:**
- Integrate Google Cloud Vision API for image analysis
- Use Cloud Functions for AI classification
- Store analysis results in Firestore

### 2. Hazard Reporting (Dashboard)
**Component:** `ReportForm.tsx`
- Auto-detect location via Geolocation API
- 8 categories: Pothole, Garbage/Waste, Electrical, Water Leak, Street Light, Sewage, Fallen Tree, Other
- Description textarea
- Image upload with preview
- Voice recording (react-media-recorder)
- Submit button → Creates new incident

**Firebase Migration:**
- Upload images to Firebase Cloud Storage
- Create Firestore document in `/incidents`
- Send notification to nearby admins (Cloud Functions + FCM)
- Increment user's reward points

### 3. Clustering & Hotspots
**Current Logic:**
- Incidents with same category + nearby location = clustered
- `confirmations` field = witness count
- confirmations > 10 = CRITICAL hotspot
- Display: Blue badge with Users icon in table, pulsing red marker on map

**Firebase Migration:**
```javascript
// Geospatial Clustering with Firestore GeoQueries
import { GeoFirestore } from 'geofirestore';

// Query incidents within radius
const geoQuery = geoCollection.near({
  center: new firebase.firestore.GeoPoint(lat, lng),
  radius: 1 // 1km radius
});

// Calculate cluster confirmations
const clusterConfirmations = relatedIncidents.reduce((sum, inc) => 
  sum + inc.data().confirmations, 0
);
```

### 4. Resolution Feedback Loop
**Component:** `ResolveModal.tsx`
**Process:**
1. Admin clicks "Resolve" button in IncidentTable
2. Modal opens requiring:
   - Before image (auto-filled from report)
   - **After image (mandatory upload)**
3. Button text: "Mark Resolved & Notify [X] Citizens"
4. On submit:
   - Update incident status to "resolved"
   - Send notification to all `confirmations` witnesses
   - Close modal with success toast

**Firebase Migration:**
```javascript
// Cloud Function triggered on status update
exports.notifyWitnesses = functions.firestore
  .document('incidents/{incidentId}')
  .onUpdate(async (change, context) => {
    const after = change.after.data();
    if (after.status === 'resolved') {
      const userIds = after.confirmedBy; // Array of user IDs
      
      // Send FCM notifications
      const tokens = await getUserTokens(userIds);
      await admin.messaging().sendToDevice(tokens, {
        notification: {
          title: 'Issue Resolved! 🎉',
          body: `${after.title} has been fixed. View before/after photos.`,
          clickAction: `/incidents/${context.params.incidentId}`
        }
      });
    }
  });
```

### 5. Interactive Map
**Component:** `ClusterMap.tsx`
- Leaflet map centered on Hyderabad (17.3850, 78.4867)
- Custom DivIcon markers:
  - **Red pulsing**: confirmations > 10 (hotspots)
  - **Red static**: severity === "critical"
  - **Orange**: severity === "high"
  - **Yellow**: severity === "medium"
  - **Green**: status === "resolved"
- Popup shows: Title, Category, Confirmations, Status badge
- CSS animation for pulsing effect

**Firebase Migration:**
- Use GeoFirestore for efficient geospatial queries
- Real-time marker updates via Firestore snapshots
- Filter by date range, category, severity

---

## Navigation & Routing

### Public Routes (No Auth Required)
- `/` - Home page (Hero + AI Input)
- `/about` - Mission & Philosophy
- `/impact` - Global metrics & leaderboard
- `/login` - Email/password login
- `/signup` - Role selection + registration

### Protected Routes (Auth Required)
- `/dashboard` - Citizen dashboard (role: citizen)
- `/admin` - Admin/NGO dashboard (role: admin, ngo)
- `/profile` - User profile & settings (all roles)

### Navbar Behavior
**When NOT logged in:**
- Links: How It Works (/about), Impact (/impact), Dashboard (/login redirect)
- Buttons: Login, Sign Up

**When logged in:**
- Links: How It Works, Impact, Dashboard (routes to /dashboard or /admin based on role)
- Buttons: Log Out (red button, clears auth)

### Role-Based Routing
```javascript
// getDashboardRoute() function in Navbar
if (!isLoggedIn) return "/login";
if (user?.role === "admin" || user?.role === "ngo") return "/admin";
return "/dashboard";
```

---

## Design System

### Color Palette
```css
/* Primary */
--primary: #005A9C;           /* Civic Blue */
--primary-foreground: #FFFFFF;

/* Secondary (Grays) */
--secondary-50: #F8FAFC;
--secondary-100: #F1F5F9;
--secondary-200: #E2E8F0;
--secondary-600: #475569;
--secondary-700: #334155;
--secondary-900: #0F172A;

/* Critical/Error */
--critical: #DC2626;

/* Impact Badges */
--impact-bronze: #CD7F32;
--impact-silver: #94A3B8;
--impact-gold: #F59E0B;
```

### Typography
- **Font**: Inter (Google Fonts, variable font)
- **Headings**: Bold, sizes 2xl to 5xl
- **Body**: Regular, size base to lg
- **Font stack**: Inter, ui-sans-serif, system-ui

### Button Styles
```jsx
// Primary Button
className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
  transition-colors font-medium shadow-sm"

// Critical/Logout Button
className="px-6 py-2 bg-critical text-white rounded-lg hover:bg-critical/90 
  transition-colors font-medium shadow-sm"

// Secondary Button
className="px-6 py-2 border-2 border-secondary-300 text-secondary-700 
  rounded-lg hover:bg-secondary-100 transition-colors font-medium"
```

### Card Styles
```jsx
className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6"
```

### Status Badges
```javascript
const statusStyles = {
  pending: "bg-critical/10 text-critical",
  "in-progress": "bg-primary/10 text-primary",
  resolved: "bg-impact-gold/10 text-impact-gold"
};
```

---

## Firebase Migration Checklist

### Phase 1: Authentication
- [ ] Set up Firebase project
- [ ] Install `firebase` and `@firebase/auth`
- [ ] Configure Firebase in `lib/firebase.ts`
- [ ] Replace AuthContext with Firebase Auth
- [ ] Implement email/password authentication
- [ ] Add Google OAuth provider
- [ ] Store user roles in Firestore `/users/{uid}`
- [ ] Update login/signup flows
- [ ] Add password reset functionality
- [ ] Implement onAuthStateChanged listener

### Phase 2: Database (Firestore)
- [ ] Design Firestore schema (see structure above)
- [ ] Create Firestore security rules
- [ ] Migrate mock incident data to `/incidents` collection
- [ ] Create user profiles in `/users` collection
- [ ] Implement real-time incident queries
- [ ] Add pagination for large datasets
- [ ] Set up GeoFirestore for location queries
- [ ] Create indexes for common queries

### Phase 3: Storage (Cloud Storage)
- [ ] Set up Firebase Storage buckets
- [ ] Create upload functions for images
- [ ] Implement image compression (Sharp or Firebase Extensions)
- [ ] Generate thumbnail URLs
- [ ] Update ReportForm to upload to Storage
- [ ] Update ResolveModal to upload after images
- [ ] Set up Storage security rules
- [ ] Add progress indicators for uploads

### Phase 4: Cloud Functions
- [ ] Initialize Cloud Functions project
- [ ] Create `onIncidentCreate` trigger (notify nearby admins)
- [ ] Create `onIncidentResolve` trigger (notify witnesses)
- [ ] Implement AI analysis function (Cloud Vision API)
- [ ] Create clustering algorithm function
- [ ] Add reward points calculation trigger
- [ ] Implement badge upgrade function
- [ ] Create scheduled cleanup functions

### Phase 5: Notifications (FCM)
- [ ] Set up Firebase Cloud Messaging
- [ ] Add FCM service worker for web push
- [ ] Request notification permissions
- [ ] Store FCM tokens in user documents
- [ ] Send notifications on incident updates
- [ ] Send badge upgrade notifications
- [ ] Add in-app notification center
- [ ] Implement notification preferences

### Phase 6: Analytics & Performance
- [ ] Set up Firebase Analytics
- [ ] Add Google Analytics 4 integration
- [ ] Implement Performance Monitoring
- [ ] Add custom event tracking
- [ ] Set up Crashlytics (if mobile)
- [ ] Monitor query performance
- [ ] Optimize bundle size
- [ ] Add error tracking (Sentry integration)

---

## Environment Variables (for Firebase)

Create `.env.local`:
```bash
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-your_measurement_id

# API Keys
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
NEXT_PUBLIC_CLOUD_VISION_API_KEY=your_vision_key

# Admin SDK (Server-side only)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
```

---

## Sample Firebase Configuration

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export default app;
```

---

## Dependencies to Add for Firebase

```json
{
  "dependencies": {
    "firebase": "^10.7.0",
    "@firebase/auth": "^1.5.0",
    "@firebase/firestore": "^4.4.0",
    "@firebase/storage": "^0.12.0",
    "@firebase/messaging": "^0.12.0",
    "geofirestore": "^6.0.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "firebase-tools": "^13.0.0",
    "firebase-admin": "^12.0.0"
  }
}
```

---

## Current Issues & Known Limitations

1. **Mock Data**: All incidents are hardcoded in `mock-data.ts`
2. **No Persistence**: User reports don't save (submit button only shows toast)
3. **No Real Clustering**: Confirmations are manually set, not calculated
4. **No Image Storage**: Images stored as base64 in component state
5. **No Voice Processing**: Voice recording saves locally, no speech-to-text
6. **No Real Notifications**: Toast messages only, no push notifications
7. **No Admin Assignment**: Incidents not actually assigned to admins
8. **No Real Resolution**: After photos not saved, witnesses not notified
9. **Static Leaderboard**: Top guardians are hardcoded mock data
10. **No Email Verification**: Login accepts any email/password

---

## Performance Optimizations

### Current Implementation
- Dynamic imports for Leaflet (ssr: false)
- React Compiler enabled (babel plugin)
- Tailwind CSS purging
- Image optimization via Next.js Image component (not yet implemented)

### Recommended for Firebase
- [ ] Implement pagination (Firestore limit + startAfter)
- [ ] Add infinite scroll for incident lists
- [ ] Cache Firestore queries with SWR or React Query
- [ ] Implement lazy loading for map markers
- [ ] Use Next.js Image for all uploaded images
- [ ] Add service worker for offline support
- [ ] Implement skeleton loaders
- [ ] Use Firestore bundle loading for initial data

---

## Security Considerations

### Current State
- No security (mock data, client-side only)
- No input validation
- No rate limiting
- No CSRF protection

### Firebase Security Rules Example
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid))
        .data.role in ['admin', 'ngo'];
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId);
    }
    
    // Incidents collection
    match /incidents/{incidentId} {
      allow read: if true; // Public read
      allow create: if isSignedIn();
      allow update: if isAdmin() || isOwner(resource.data.reportedBy);
      allow delete: if isAdmin();
    }
    
    // User complaints subcollection
    match /userComplaints/{userId}/complaints/{complaintId} {
      allow read, write: if isOwner(userId);
    }
  }
}
```

---

## Testing Strategy (Future)

### Unit Tests
- [ ] Component rendering tests (Jest + React Testing Library)
- [ ] Utility function tests (cn(), getIncidentStats())
- [ ] Form validation tests

### Integration Tests
- [ ] Auth flow (login → dashboard → logout)
- [ ] Report submission flow
- [ ] Admin resolution flow
- [ ] Clustering algorithm

### E2E Tests (Cypress/Playwright)
- [ ] Complete citizen journey
- [ ] Complete admin journey
- [ ] Map interaction
- [ ] Notification delivery

---

## Deployment

### Current Setup
- Development only (`npm run dev`)
- No production build tested

### Recommended Deployment
1. **Vercel** (recommended for Next.js)
   - Automatic CI/CD from GitHub
   - Edge functions support
   - Environment variable management
   
2. **Firebase Hosting** (alternative)
   - `firebase deploy --only hosting`
   - Integrated with Firebase services
   
3. **Docker** (for self-hosting)
   - Create Dockerfile for Next.js
   - Use nginx for reverse proxy

---

## Future Enhancements

### Short-term
- [ ] Email verification on signup
- [ ] Password strength indicator
- [ ] Forgot password flow
- [ ] Profile photo upload
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)

### Medium-term
- [ ] Mobile apps (React Native)
- [ ] SMS notifications (Twilio integration)
- [ ] Payment gateway for donations
- [ ] Certificate download (PDF generation)
- [ ] Social sharing (resolved incidents)
- [ ] Admin team management

### Long-term
- [ ] AI-powered category prediction
- [ ] Predictive maintenance alerts
- [ ] Integration with 311 systems
- [ ] Public API for developers
- [ ] Data analytics dashboard
- [ ] ML model for incident prioritization

---

## Contact & Support

**Development Team:**
- Project Lead: [Your Name]
- GitHub Repository: https://github.com/Divk-Ashwin/civic-ai
- Documentation: This file

**Tech Support:**
- For Firebase setup issues: Firebase Console → Support
- For deployment issues: Vercel Support / Firebase Support
- For bug reports: GitHub Issues

---

## License
[Specify your license - MIT, Apache 2.0, etc.]

---

## Acknowledgments
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Leaflet community for mapping solutions
- Firebase team for the backend infrastructure

---

**Last Updated:** November 19, 2025
**Version:** 1.0.0 (Mock Data Implementation)
**Next Version:** 2.0.0 (Firebase Integration)
