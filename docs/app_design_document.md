# Hey Malaysia - App Design Document

## 1. Executive Summary
**Hey Malaysia** is a comprehensive mobile companion designed to immerse users in the beauty, history, and vibrant culture of Malaysia. More than just a travel guide, it serves as a cultural bridge, offering deep insights into the nation's heritage while providing practical tools for exploration and event discovery.

**Platform:** Mobile App (iOS & Android)
**Framework:** React Native

## 2. Vision & Objectives
*   **Promote Tourism:** Showcase Malaysia as a premier destination for nature, culture, and urban adventures.
*   **Educate:** Provide accurate and engaging history, cultural etiquette, and general knowledge.
*   **Connect:** Link users with real-time local events and festivities.

## 3. Target Audience
*   **International Tourists:** First-time visitors needing guidance and cultural context.
*   **Domestic Travelers:** Locals exploring new states or seeking weekend activities.
*   **History & Culture Enthusiasts:** Users interested in the 'why' and 'how' of Malaysian traditions.

## 4. Core Features

### 4.1. The Knowledge Hub (History & Culture)
*   **Timeline of Malaysia:** Interactive history scroller from the Malacca Sultanate to Independence and modern day.
*   **Cultural Mosaic:** Detailed sections on the diverse ethnicities (Malay, Chinese, Indian, Indigenous tribes of Sabah/Sarawak), their festivals, traditional clothing, and food.
*   **Etiquette Guide:** "Do's and Don'ts" (e.g., removing shoes, greetings).
*   **Language Basics:** Common phrases in Bahasa Malaysia (Audio clips included).

### 4.2. Places of Interest (Destination Guide)
*   **State-by-State Discovery:** Explore attractions by state (e.g., "Penang - The Food Capital", "Sabah - Land Below The Wind").
*   **Categorized Listings:**
    *   *Nature* (Rainforests, Islands, Caves)
    *   *Urban* (Shopping Malls, Skyscrapers)
    *   *Heritage* (Temples, Mosques, Colonial Buildings)
*   **"Hidden Gems":** User-sourced or curated off-the-beaten-path locations.
*   **Weather Forecast:** Displays a 3-day weather forecast for each location.

### 4.3. Event Discovery (The "Happening Now" Engine)
*   **Event Calendar:** Official public holidays and cultural festivals.
*   **Nearby Events:** Geolocation-based suggestions for specific local events (Pasar Malam/Night Markets, Concerts, Art Exhibitions).
*   **Push Notifications:** Reminders for upcoming major festivals or events near the user.
*   **Event Weather:** Displays the weather forecast specifically for the event's date and time.

### 4.4. Interactive Features
*   **Nearby Explorer:** Map view showing attractions and events within a dynamic radius (e.g., 5km).
*   **Itinerary Builder:** Save places and events to a personal "My Trip" list. Includes pre-made itineraries based on user interests.
*   **Photo Spots:** Curated list of "Insta-worthy" locations.

### 4.5. Interaction (Community & Social)
*   **Two-Tier Forum System:**
    *   **Local Feed:** Discussions specific to a user's current location (e.g., Kuala Lumpur). Defaults to GPS location but allows manual state selection.
    *   **Global Feed:** General discussions about Malaysia, open to all users.
*   **Contextual Discussions:** Nested comment sections for every major content piece (Places, Events, History articles).
*   **Community Moderation:** Upvote/Report system to maintain high-quality interactions.

### 4.6. Advertisement Integration
*   **Dynamic Banners:** Interactable image banners displayed at the top of each Core Feature section (History, Places, Events).
*   **Deep Linking:** Tapping an ad redirects users to external websites or internal app pages (e.g., specific event or place).

### 4.7. Weather Integration (OpenWeatherMap)
*   **Real-time Forecast:** Displays current weather based on user ID location or manual search.
*   **Travel Planning:** Helps users plan visits based on 3-day forecasts for Places and specific date forecasts for Events.

### 4.8. Automated Content Harvesting (Google Maps Platform)
*   **POI Harvester Script:** A backend script running via cron job to automatically discover new Points of Interest (POI) within Malaysia using the Google Maps Places API.
*   **Duplicate Detection:** Checks if the place already exists in the database before adding.
*   **Logic:** Adds 2 places per run (to manage API quota and quality).

## 5. Information Architecture (Navigation)

1.  **Home Tab**: Featured daily highlights, "Did You Know?", Upcoming Events ticker.
2.  **Explore Tab**: Map view and Category/State filters for Places of Interest.
3.  **Learn Tab**: History articles, Cultural guides, Language tools.
4.  **Events Tab**: Calendar and List view of ongoing/future events.
5.  **Profile/Saved**: User favorites, Saved Itineraries, Settings.

## 6. UI/UX Design Guidelines

### 6.1. Visual Identity
*   **Theme:** "Tropical Vibrance meets Modern Heritage".
*   **Color Palette:**
    *   *Primary:* Royal Yellow (Sovereignty), Courageous Red, Unity Blue (Jalur Gemilang colors).
    *   *Secondary:* Rainforest Green, Batik Gold, Hibiscus Pink.
*   **Typography:** Clean sans-serif for UI (e.g., Inter/Poppins), Serif for headings to evoke history (e.g., Playfair Display).

### 6.2. User Experience
*   **Immersive Imagery:** High-quality full-width photos of destinations.
*   **Micro-interactions:** Subtle animations (e.g., a wau bulan flying during loading, hibiscus blooming).
*   **Accessibility:** Multi-language support (English, Malay, Mandarin, Tamil - optional for V2).

## 7. Technical Stack Strategy (Monorepo)

**Structure:** Monorepo (using Yarn Workspaces or TurboRepo) to manage code sharing and dependencies effectively.

*   **Repository Structure:**
    *   `apps/mobile` (React Native Client)
    *   `apps/admin` (Next.js Admin Dashboard)
    *   `apps/backend` (Node.js API)
    *   `packages/shared` (Shared types, constants, utilities)

### 7.1. Mobile App (Client)
*   **Framework:** React Native (Expo)
*   **Role:** The main interface for tourists and users.
*   **Key Features:**
    *   **Offline Support:** Caching critical data for use without internet.
    *   **Performance Optimization:** **Lazy Loading & Infinite Scroll** implemented for long-list content (History, Feeds) to minimize database load and ensure smooth UI performance.
    *   **Location Services:** Geofencing and nearby suggestions.
    *   **User Submissions:**
        *   **Event Creation:** Users can submit local events (requires *Payment Reference No*).
        *   **Ad Submission:** Users can submit banner ads (requires *Payment Reference No*).
        *   *Note:* All submissions are set to "Pending" until approved by Admin.

### 7.2. Admin Dashboard (Web)
*   **Framework:** Next.js (React)
*   **Role:** Content Management System (CMS) for admins to manage Places, Events, and History content.
*   **Key Features:**
    *   **Content Management:** Rich Text Editor, Map Coordinate Picker.
    *   **Analytics:** User engagement and retention dashboard.
    *   **Advertisement Management:** Upload banner images, set target URLs, and manage campaign active status/duration.
    *   **Approval Workflow:** Review and Approve/Reject user-submitted Events and Ads. Validate *Payment Reference No* before activating.

### 7.3. Backend (API)
*   **Framework:** Node.js (Express or Fastify)
*   **Role:** Central API handling data requests, user authentication, and logic.
*   **Database:** MongoDB (Mongoose) for all data and authentication storage.
*   **Authentication:** Custom Authentication (stored in MongoDB) + JWT.

### 7.4. Shared
*   **Content:** Shared TypeScript interfaces and utility functions used across Mobile, Admin, and Backend.

## 8. Roadmap

*   **Phase 1 (MVP):** Static content (History, Places), Basic Maps, Offline support.
*   **Phase 2:** Cloud integration, User Accounts (Favorites), Dynamic Events, Comments/Ratings.
*   **Phase 3:** Ticket booking integration, AR History Tour.
