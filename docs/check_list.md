# implementation Checklist

This checklist is derived from `app_design_document.md` and serves as a roadmap for development.

## 1. Backend & Infrastructure (Node.js / Express / MongoDB)

- [ ] **Setup & Config**
    - [x] Initialize Express app with TypeScript.
    - [x] Configure MongoDB connection (Mongoose).
    - [x] Setup Environment variables (.env).
    - [x] Implement Error Handling middleware.
    - [x] Setup CORS and Helmet security.

- [ ] **Authentication**
    - [x] Implement JWT Authentication middleware.
    - [x] Create Admin Login endpoint (`POST /auth/login`).
    - [x] Create User Registration/Login (if applicable for interactions).

- [x] **External Services**
    - [x] **OpenWeatherMap Integration**: Service to fetch weather data.
        - [x] Current Weather endpoint.
        - [x] 3-Day Forecast endpoint.
        - [x] Historical/Future date lookup (logic to find closest forecast).
    - [x] **Google Maps POI Harvester**:
        - [x] Implement Google Maps Places API service.
        - [x] Create POI extraction script (Harvest logic + Duplicate check).
        - [x] Configure Cron Job (e.g., via `node-cron`) to run script periodically.

- [ ] **Database Models (Mongoose Schemas)**
    - [x] **User**: `username`, `email`, `password_hash`, `role` (user/admin).
    - [x] **Place**: `name`, `description`, `category` (Nature/Urban/Heritage), `state`, `images[]`, `location` (lat/long), `content`.
    - [x] **Event**: `title`, `description`, `date`, `location`, `approved` (bool), `paymentReference`.
    - [x] **Ad**: `title`, `imageUrl`, `targetUrl`, `status` (pending/active/rejected), `paymentReference`, `duration`.
    - [x] **Comment**: `userId`, `entityId` (Place/Event), `content`, `parentId` (for nested threads).

- [ ] **API Endpoints**
    - [x] **Places**: CRUD (Get All, Get Detail, Create*, Update*, Delete*). (*Admin only)
    - [x] **History**: CRUD for historical articles.
    - [x] **Events**:
        - [x] Public: Get Active Events.
        - [x] User: Submit Event (create with `pending` status).
        - [x] Admin: Approve/Reject Event.
    - [x] **Ads**:
        - [x] Public: Get Active Ads (random/targeted).
        - [x] User: Submit Ad (create with `pending` status).
        - [x] Admin: Approve/Reject Ad.
    - [x] **Messaging (New)**:
        - [x] **Socket.io Setup**: Real-time communication server.
        - [x] **Message Model**: `senderId`, `receiverId`, `content`, `readStatus`.
        - [x] **API**: Get Chat History, Send Message.

## 2. Admin Dashboard (Next.js)

- [ ] **Layout & Auth**
    - [x] Create Protected Route wrapper.
    - [x] **Login Page**: Admin authentication form.
    - [x] **Sidebar Navigation**: Dashboard, Places, Events, Ads, Users, History.

- [ ] **Core Modules**
    - [x] **Dashboard Home**: Brief analytics (Users, Active Ads, Pending Approvals).
    - [x] **Places Management**:
        - [x] List View (Filter by State/Category).
        - [x] Create/Edit Form (Rich Text Editor, Image Upload).
    - [x] **History Management**: CRUD and List.
    - [x] **User Management**:
        - [x] List users and Roles.
        - [x] Promote/Demote/Delete User.
    - [x] **Advertisement Manager**:
        - [x] List all ads (filter by Status).
        - [x] Approval Detail View: Show Banner, Link, Payment Ref.
        - [x] Action: Approve (Set Active) / Reject.
    - [x] **Event Approval Center**:
        - [x] List pending events.
        - [x] Validate Payment Ref.
        - [x] Action: Approve/Reject.

## 3. Mobile App (React Native / Expo)

- [ ] **Navigation Structure**
    - [x] **Bottom Tab Navigator**: Home, Explore, Learn, Events, Profile.
    - [x] **Stack Navigator**: Detail pages, Forms, Auth.

- [ ] **Screens & Features**
    - [x] **Home Tab**:
        - [x] **Weather Widget**: Current location weather + Search bar for other locations.
        - [x] **Community Feeds Widget**: Quick access to Local (State-based) vs. Global threads.
        - [x] Daily Highlights Carousel.
        - [x] "Did You Know?" Card.
        - [x] **Ad Banner Integration** (Top of screen - supports Deep Linking).
    - [x] **Community Screen (New)**:
        - [x] **Global Tab**: General forum list.
        - [x] **Local Tab**:
            - [x] Header display: "Discussions in [State Name]".
            - [x] Dropdown to manually change State.
            - [x] GPS auto-detect logic (mocked).
    - [x] **Explore Tab (Places)**:
        - [x] Map View (or List View for MVP).
        - [x] List View (Lazy Loading / Infinite Scroll).
        - [x] Filter by State & Category.
        - [x] **Hidden Gems** Filter/Badge logic.
        - [x] **Place Detail Screen**:
            - [x] Image Gallery.
            - [x] Info & History.
            - [x] **Weather Card**: 3-Day Forecast for this location.
            - [x] **Comments Section** (Nested threads).
    - [x] **Learn Tab**:
        - [x] History Timeline Component (Scrollable).
        - [x] Cultural Articles.
        - [x] **Etiquette Guide** ("Do's and Don'ts").
        - [x] Language Basics (with Audio Player - Mocked).
    - [x] **Events Tab**:
        - [x] Calendar View.
        - [x] Location-based Event List.
        - [x] **Event Detail**: Show weather forecast for event date.
        - [x] **Submit Event FAB (Floating Action Button)** -> Submission Form (incl. Payment Ref).
    - [x] **Profile Tab**:
        - [x] Favorites List.
        - [x] **My Messages**: Inbox List & Chat Interface.
        - [x] **Submit Ad** Button -> Ad Submission Form (Upload Image, Link, Payment Ref).

- [x] **Technical Components**
    - [x] **Lazy Image Loader**: Optimized image component with caching.
    - [x] **Infinite Scroll Hook**: Reusable hook for pagination.
    - [x] **Push Notification Handler**: Setup listeners for event reminders.
