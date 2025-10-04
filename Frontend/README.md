
# Uber Clone Frontend

## Overview
This is the frontend for an Uber-like ride-hailing application, built with React and Vite. It provides user and captain authentication, ride booking, and real-time UI panels for ride status. The frontend communicates with the backend via RESTful APIs.

## Technologies Used
- **React**: UI library for building interactive interfaces
- **Vite**: Fast development server and build tool
- **React Router**: For client-side routing
- **Axios**: For HTTP requests to backend APIs
- **Tailwind CSS**: For utility-first styling

## Project Structure
```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx                # Main app routing
│   ├── main.jsx               # Entry point
│   ├── index.css, App.css     # Global styles
│   ├── assets/                # Static assets
│   ├── components/            # Reusable UI panels
│   │   ├── ConfirmedRide.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── WaitingForDriver.jsx
│   ├── context/               # React Contexts
│   │   ├── CaptainContext.jsx
│   │   └── UserContext.jsx
│   └── pages/                 # Route pages
│       ├── CaptainHome.jsx
│       ├── CaptainLogin.jsx
│       ├── CaptainLogout.jsx
│       ├── CaptainProtectedWrapper.jsx
│       ├── CaptainSignup.jsx
│       ├── Home.jsx
│       ├── Riding.jsx
│       ├── Start.jsx
│       ├── UserLogin.jsx
│       ├── UserLogout.jsx
│       ├── UserProtectedWrapper.jsx
│       └── UserSignup.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── README.md
```

## Setup Instructions
1. **Install dependencies**
	 ```bash
	 npm install
	 ```
2. **Configure environment variables**
	 - Create a `.env` file in the `Frontend/` directory.
	 - Add your backend base URL:
		 ```env
		 VITE_BASE_URL=http://localhost:5000
		 ```
3. **Start the development server**
	 ```bash
	 npm run dev
	 ```

## Routing & Pages
- `/` : Start page
- `/login` : User login
- `/signup` : User signup
- `/captain-login` : Captain login
- `/captain-signup` : Captain signup
- `/home` : User home (protected)
- `/captain-home` : Captain home (protected)
- `/user/logout` : User logout (protected)
- `/captain/logout` : Captain logout (protected)
- `/riding` : Ride status page

## Authentication Flow
- Uses JWT stored in localStorage for session management
- Protected routes use wrappers (`UserProtectedWrapper`, `CaptainProtectedWrapper`) to check authentication and fetch profile
- Login and signup pages send credentials to backend and store token on success
- Logout pages call backend logout API and clear token

## Contexts
- **UserContext**: Provides user state and setter across the app
- **CaptainContext**: Provides captain state and setter across the app

## Components
- **ConfirmedRide**: Panel to confirm ride details and fare
- **LocationSearchPanel**: Panel to select pickup/destination
- **LookingForDriver**: Panel showing search for available drivers
- **VehiclePanel**: Panel to select vehicle type (car, auto, etc.)
- **WaitingForDriver**: Panel showing assigned driver and ride status

## Example API Usage
- **Login User**:
	```js
	axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password })
	```
- **Get User Profile**:
	```js
	axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
	```
- **Logout User**:
	```js
	axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, { headers: { Authorization: `Bearer ${token}` } })
	```

## Styling
- Uses Tailwind CSS for rapid UI development
- Responsive layouts for mobile and desktop

## Extending Functionality
- Add real-time ride updates using WebSockets
- Integrate payment gateway for ride payments
- Add map integration for location selection and tracking
- Implement notifications for ride status

## License
MIT


---

## Detailed Pages & Functionality

### Start (`/`)
Landing page with Uber branding and a button to continue to login/signup.

### User Login (`/login`)
Form for user email and password. On submit, sends credentials to backend `/users/login` and stores JWT token in localStorage. Redirects to `/home` on success.

### User Signup (`/signup`)
Form for user registration (first name, last name, email, password). On submit, sends data to backend `/users/register` and stores JWT token. Redirects to `/home`.

### Captain Login (`/captain-login`)
Form for captain email and password. On submit, sends credentials to backend `/captains/login` and stores JWT token. Redirects to `/captain-home`.

### Captain Signup (`/captain-signup`)
Form for captain registration (name, email, password, vehicle details). On submit, sends data to backend `/captains/register` and stores JWT token. Redirects to `/captain-home`.

### Home (`/home`)
User dashboard for booking rides. Includes:
- Location search panel (recent locations, select pickup/destination)
- Vehicle selection panel (choose car, auto, etc.)
- Confirmed ride panel (shows fare, details, confirm button)
- Looking for driver panel (shows searching animation)
- Waiting for driver panel (shows assigned driver and ride details)
Panels are managed via state and transitions (GSAP animations).

### Captain Home (`/captain-home`)
Simple dashboard for captain after login/signup. Can be extended for ride management, status updates, etc.

### Riding (`/riding`)
Shows ride in progress, driver details, pickup/destination, fare, and payment button.

### User/Captain Logout (`/user/logout`, `/captain/logout`)
Calls backend logout API, removes JWT token from localStorage, and redirects to login page.

### Protected Wrappers (`UserProtectedWrapper`, `CaptainProtectedWrapper`)
Checks for JWT token in localStorage. If present, fetches profile from backend and allows access to protected pages. If not, redirects to login.

### Contexts
- **UserContext**: Stores user info and provides setter for global access.
- **CaptainContext**: Stores captain info and provides setter for global access.

### Component Interactions
- **LocationSearchPanel**: Selecting a location opens vehicle panel.
- **VehiclePanel**: Selecting a vehicle opens confirm ride panel.
- **ConfirmedRide**: Confirming ride opens looking for driver panel.
- **LookingForDriver**: Shows searching animation, can transition to waiting for driver.
- **WaitingForDriver**: Shows assigned driver and ride details.

### UI Logic
- State variables manage which panel is open (e.g., `panelOpen`, `vehiclePanelOpen`, etc.)
- GSAP is used for smooth panel transitions and animations.
- All API calls use Axios and backend base URL from `.env`.

---

## How to Extend
- Add ride history, payment integration, real-time driver tracking, notifications, and more advanced captain dashboard features.
