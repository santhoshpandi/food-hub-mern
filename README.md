# Food Hub - MERN

A full-stack web application built using the MERN stack (`MongoDB`, `Express.js`, `React`, `Node.js`) with JWT-based authentication. The app allows users to sign up, log in, view reviews, order food, view their orders, manage their profile, and log out.

## Developed by

- `Santhosh Pandi` -- **Live Preview** https://food-hub-cyan.vercel.app

## Screenshots
![image](https://github.com/user-attachments/assets/134a5624-6485-4c9f-ba68-e66e52e3e1b3)

![image](https://github.com/user-attachments/assets/351d9ffc-5384-46c4-9b0d-24e33901a6ab)

![image](https://github.com/user-attachments/assets/3d96c0e2-cfe6-4c69-9d3f-27aa647be7a4)

![image](https://github.com/user-attachments/assets/1fd7f1b2-c9d9-4974-8694-fe92dad5e154)
![image](https://github.com/user-attachments/assets/33bda19c-0502-4d1f-8579-b692c77cd599)



## Features

- **User Authentication**: Users can sign up and log in using JWT (JSON Web Tokens) for secure authentication.
   
- **Home Page**: Displays a welcome message and customer reviews.

- **Serve Page**: Users can browse the available food items and place an order.

- **Order Page**: Users can view their past and current orders.

- **User Profile**: Users can modify their personal details or delete their account.

- **Logout**: Secure logout functionality, ensuring the user session is terminated.

- **State Management**: <b>Context API</b> is used for State Management. Here we have created a state `useBill` & `useUser`

- **Routing**: Each navigation item routes to its corresponding component for dynamic content display.

- **Responsive Design**: The layout adjusts to different screen sizes, ensuring the dashboard looks great on both desktop and mobile devices.

- **Customizable Components**: Easily customizable components to fit various use cases.

- **Customized 404 Page**: A custom 404 page is included to handle "not found" errors gracefully, improving the user experience when navigating to non-existent routes.

## Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - Vite (for faster development builds)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: Version 14 or higher
- **Node.js** (version 14 or above)
- **MongoDB** (local or Atlas for cloud-based DB)
- **Git**: Version 6 or higher

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/santhoshpandi/food-hub-mern.git
   ```

2. Navigate to the project directory:
   ```
   cd food-hub-mern
   ```

3. Install the dependencies:
   ```
   npm install
   ```

  ### Environment Variables Setup

  You’ll need to set up the following environment variables for both the backend and the frontend:

  #### Backend (Create `.env` file inside `backend` folder )

  ```
  PORT = 3000
  FOOD_DB_URL = <your_mongodb_connection_string>
  ACCESS_TOKEN_SECRET = <some_random_strings>
  REFRESH_TOKEN_SECRET = <some_random_strings>
  FRONT_END_URL = http://localhost:5173
  NODE_ENV = development
  ```

  #### Frontend (Create `.env` file inside `frontend` folder )

  ```
  VITE_APP_API_URI = http://localhost:3000
  ```

4. Start the App ( From `food-hub-mern` ):

   ```
   npm run dev
   ```

The App will be available at http://localhost:5173

Happy Coding😊👩‍💻


## Acknowledgments


- **React**: A JavaScript library for building user interfaces.
- **Context API**: A Built-in method in react used for State Management.
- **MongoDB**: A NoSQL database used for storing data in a flexible, JSON-like format. It provides high scalability and performance, making it ideal for modern web applications.

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine. It allows the execution of JavaScript code on the server side, enabling full-stack JavaScript development.

- **Express.js**: A minimalist web framework for Node.js that simplifies the creation of server-side applications by providing a robust set of features for building APIs and handling requests.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: An extremely fast build tool for modern web projects.


  

