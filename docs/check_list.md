# implementation Checklist

This checklist is derived from `app_design_document.md` and serves as a roadmap for development.

## 1. Backend & Infrastructure (Node.js / Express / MongoDB)

- [ ] **Setup & Config**
    - [ ] Initialize Express app with TypeScript.
    - [ ] Configure MongoDB connection (Mongoose).
    - [ ] Setup Environment variables (.env).
    - [ ] Implement Error Handling middleware.
    - [ ] Setup CORS and Helmet security.

- [ ] **Authentication**
    - [ ] Implement JWT Authentication middleware.
    - [ ] Create Admin Login endpoint (`POST /auth/login`).
    - [ ] Create User Registration/Login (if applicable for interactions).

- [ ] **External Services**
    - [ ] **OpenWeatherMap Integration**: Service to fetch weather data.
        - [ ] Current Weather endpoint.
        - [ ] 3-Day Forecast endpoint.
        - [ ] Historical/Future date lookup (logic to find closest forecast).

- [ ] **Database Models (Mongoose Schemas)**
    - [ ] **User**: `username`, `email`, `password_hash`, `role` (user/admin).
    - [ ] **Place**: `name`, `description`, `category` (Nature/Urban/Heritage), `state`, `images[]`, `location` (lat/long), `content`.
    - [ ] **Event**: `title`, `description`, `date`, `location`, `approved` (bool), `paymentReference`.
    - [ ] **Ad**: `title`, `imageUrl`, `targetUrl`, `status` (pending/active/rejected), `paymentReference`, `duration`.
    - [ ] **Comment**: `userId`, `entityId` (Place/Event), `content`, `parentId` (for nested threads).

- [ ] **API Endpoints**
    - [ ] **Places**: CRUD (Get All, Get Detail, Create*, Update*, Delete*). (*Admin only)
    - [ ] **History**: CRUD for historical articles.
    - [ ] **Events**:
        - [ ] Public: Get Active Events.
        - [ ] User: Submit Event (create with `pending` status).
        - [ ] Admin: Approve/Reject Event.
    - [ ] **Ads**:
        - [ ] Public: Get Active Ads (random/targeted).
        - [ ] User: Submit Ad (create with `pending` status).
        - [ ] Admin: Approve/Reject Ad.

## 2. Admin Dashboard (Next.js)

- [ ] **Layout & Auth**
    - [ ] Create Protected Route wrapper.
    - [ ] **Login Page**: Admin authentication form.
    - [ ] **Sidebar Navigation**: Dashboard, Places, Events, Ads, Users, History.

- [ ] **Core Modules**
    - [ ] **Dashboard Home**: Brief analytics (Users, Active Ads, Pending Approvals).
    - [ ] **Places Management**:
        - [ ] List View (Filter by State/Category).
        - [ ] Create/Edit Form (Rich Text Editor, Image Upload).
    - [ ] **History Management**: Timeline editor.
    - [ ] **Advertisement Manager**:
        - [ ] List all ads (filter by Status).
        - [ ] Approval Detail View: Show Banner, Link, Payment Ref.
        - [ ] Action: Approve (Set Active) / Reject.
    - [ ] **Event Approval Center**:
        - [ ] List pending events.
        - [ ] Validate Payment Ref.
        - [ ] Action: Approve/Reject.

## 3. Mobile App (React Native / Expo)

- [ ] **Navigation Structure**
    - [ ] **Bottom Tab Navigator**: Home, Explore, Learn, Events, Profile.
    - [ ] **Stack Navigator**: Detail pages, Forms, Auth.

- [ ] **Screens & Features**
    - [ ] **Home Tab**:
        - [ ] **Weather Widget**: Current location weather + Search bar for other locations.
        - [ ] **Community Feeds Widget**: Quick access to Local (State-based) vs. Global threads.
        - [ ] Daily Highlights Carousel.
        - [ ] "Did You Know?" Card.
        - [ ] **Ad Banner Integration** (Top of screen - supports Deep Linking).
    - [ ] **Community Screen (New)**:
        - [ ] **Global Tab**: General forum list.
        - [ ] **Local Tab**:
            - [ ] Header display: "Discussions in [State Name]".
            - [ ] Dropdown to manually change State.
            - [ ] GPS auto-detect logic.
    - [ ] **Explore Tab (Places)**:
        - [ ] Map View (Geo-markers for places).
        - [ ] List View (Lazy Loading / Infinite Scroll).
        - [ ] Filter by State & Category.
        - [ ] **Hidden Gems** Filter/Badge logic.
        - [ ] **Place Detail Screen**:
            - [ ] Image Gallery.
            - [ ] Info & History.
            - [ ] **Weather Card**: 3-Day Forecast for this location.
            - [ ] **Comments Section** (Nested threads).
    - [ ] **Learn Tab**:
        - [ ] History Timeline Component (Scrollable).
        - [ ] Cultural Articles.
        - [ ] **Etiquette Guide** ("Do's and Don'ts").
        - [ ] Language Basics (with Audio Player).
    - [ ] **Events Tab**:
        - [ ] Calendar View.
        - [ ] Location-based Event List.
        - [ ] **Event Detail**: Show weather forecast for event date.
        - [ ] **Submit Event FAB (Floating Action Button)** -> Submission Form (incl. Payment Ref).
    - [ ] **Profile Tab**:
        - [ ] Favorites List.
        - [ ] **Submit Ad** Button -> Ad Submission Form (Upload Image, Link, Payment Ref).

- [ ] **Technical Components**
    - [ ] **Lazy Image Loader**: Optimized image component with caching.
    - [ ] **Infinite Scroll Hook**: Reusable hook for pagination.
    - [ ] **Push Notification Handler**: Setup listeners for event reminders.
