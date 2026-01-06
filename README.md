# Hey Malaysia 🇲🇾

**Hey Malaysia** is a comprehensive digital tourism ecosystem designed to promote Malaysian tourism through a modern mobile app and a powerful backend administration system.

## 🏗 Project Structure

This project is a **Monorepo** managed with npm workspaces, consisting of:

*   **`apps/mobile`**: React Native (Expo) mobile application for tourists.
*   **`apps/admin`**: Next.js web dashboard for administrators to manage content and approvals.
*   **`apps/backend`**: Node.js/Express API server with MongoDB and Socket.io.
*   **`packages/shared`**: Shared TypeScript types and utilities.

## ✨ Features

### Mobile App
*   **Discover**: Browse tourism places by category (Nature, Urban, Heritage).
*   **Events**: View public events and submit your own local events.
*   **Ads**: View promotions and submit advertisement campaigns.
*   **Chat**: Real-time support chat with administrators.
*   **Navigation**: Bottom tab navigation + optimized stack for details.

### Admin Dashboard
*   **Content Management**: Create, edit, and delete Places.
*   **Approval Workflow**: Review and approve/reject user-submitted Events and Ads.
*   **Authentication**: Secure login for administrators.

### Backend API
*   **REST API**: Endpoints for Places, Events, Ads, Auth, and Users.
*   **Real-time**: Socket.io integration for instant messaging.
*   **Security**: JWT Authentication, Helmet, CORS.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Running locally or Atlas URI)
*   Expo Go (on mobile) or Android/iOS Simulator

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd heymalaysia
    ```

2.  **Install dependencies** (Root level)
    ```bash
    npm install
    ```

### 🏃‍♂️ Running the Apps

#### 1. Backend Server
Running on port `5555`.
```bash
cd apps/backend
npm run dev
```
*   Ensure MongoDB is running.
*   Check `.env` for configuration (default provided).

#### 2. Admin Dashboard
Running on port `3000`.
```bash
cd apps/admin
npm run dev
```
*   Open [http://localhost:3000](http://localhost:3000)
*   Login with admin credentials (ensure you seeded an admin user).

#### 3. Mobile App
```bash
cd apps/mobile
npm start
```
*   Press `a` for Android Emulator, `i` for iOS Simulator, or scan QR with Expo Go.

## 📝 Documentation

*   [App Design Document](./docs/app_design_document.md)
*   [Implementation Checklist](./docs/check_list.md)

## 🛠 Tech Stack

*   **Frontend**: React Native, Next.js, TypeScript, Tailwind CSS
*   **Backend**: Node.js, Express, Socket.io
*   **Database**: MongoDB (Mongoose)
*   **Tools**: Expo, npm workspaces, Lucide Icons