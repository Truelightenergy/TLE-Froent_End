# Authentication System with JWT and Refresh Token Mechanism

This project is a simple authentication system built with **Next.js**, **TypeScript**, and **TailwindCSS**. It features a login page with a refresh token mechanism utilizing **JWT**. The project adheres to modern development practices and includes reusable components for ease of scalability and maintainability.

---

## Features

- **User Authentication** (Sign In and Sign Up)
- **JWT-based Authentication** with access and refresh tokens
- **TailwindCSS** for responsive styling
- **Reusable Components**: buttons, inputs, forms, labels
- **Server-side API** for authentication
- **Environment Configuration** for enhanced security

---

## Project Structure

```plaintext
app/
 ├── api/                # Backend API routes
 ├── fonts/              # Fonts used in the project
 ├── signin/             # Sign in page
 ├── signup/             # Sign up page
 ├── favicon.ico         # Favicon for the app
 ├── globals.css         # Global CSS for the app
 ├── layout.tsx          # Layout component
 ├── page.tsx            # Main page component
components/
 ├── ui/                 # Reusable UI components
     ├── button.tsx      # Button component
     ├── form.tsx        # Form component
     ├── input.tsx       # Input component
     ├── label.tsx       # Label component
lib/                     # Library and helper functions
.env.local               # Environment variables for development
.eslintrc.json           # ESLint configuration
.gitignore               # Git ignore file
components.json          # Components export configuration
jsonToExcel.html         # HTML for JSON to Excel conversion (if applicable)
next-env.d.ts            # Next.js TypeScript configuration
next.config.mjs          # Next.js configuration file
package.json             # Project dependencies
postcss.config.mjs       # PostCSS configuration for TailwindCSS
README.md                # Project README file
tailwind.config.ts       # TailwindCSS configuration
```

## Installation
### Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git

### Navigate to the project directory:

cd path/to/repo/TLE_Frontend

### Install the project dependencies:

npm install

### Set up environment variables:

Create a .env.local file in the root directory and configure the following variables:
```
JWT_SECRET=your_jwt_secret
API_URL=http://localhost:3000/api
```

### Running the Project
To run the development server, use the following command:
```
npm run dev
```
The app will now be running at http://localhost:3000.

### Building for Production
To build the project for production, run:

```
npm run build
```
This will create an optimized build of the app in the .next folder.

## Authentication Flow
### JWT Token Handling
This project uses JWT tokens for authentication, which works as follows:

#### Login (Sign In):

The user submits their credentials.
If valid, the server returns an access token and a refresh token.
Access Token:

The access token is used for authorizing user actions.
It expires after a set time (e.g., 15 minutes).
Refresh Token:

When the access token expires, the refresh token is sent to the server to obtain a new access token, avoiding the need for the user to log in again.
The refresh token has a longer expiration time compared to the access token.
Token Storage:

The access token is stored in memory or local storage.
The refresh token is stored securely in HTTP-only cookies to enhance security.
## API Routes
The authentication API routes are defined under the /api folder:
```
/api/login: Authenticates the user and returns access and refresh tokens.
/api/refresh-token: Provides a new access token using a valid refresh token.
/api/logout: Invalidates the refresh token and logs the user out.
```
## Components
This project includes reusable UI components located in the components/ui/ folder:
```
Button: A customizable button component.
Form: A wrapper for handling form submissions.
Input: A generic input component.
Label: A label component for form inputs.
```

## Styling
This project uses TailwindCSS for responsive and utility-first styling. Configuration for TailwindCSS is located in the tailwind.config.ts file.

#### Customizing Styles
You can further customize styles by modifying the globals.css file and the tailwind.config.ts file to add custom configurations.

## Environment Configuration
The environment variables used by the app are defined in the .env.local file. This file should not be committed to version control (as specified in .gitignore). Ensure the appropriate secrets, such as JWT_SECRET and API_URL, are properly configured in this file.

## Deployment
To deploy the project to production, follow these steps:

## Build the app:

```
npm run build
```

## Start the production server:

```
npm start
```