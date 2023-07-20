Real Estate Web App

This repository contains the source code for a real estate web application built with Spring Boot and Angular. The web app is currently under development.

Table of Contents

Project Description
Features
Technologies Used
Installation
Contact

Project Description

The Real Estate Web App is a platform designed to facilitate property management and search. It allows users to create, update, and delete property listings, as well as search for properties based on various criteria. Users can also save properties as favorites and manage their saved searches. The web app includes user registration, login, and profile management functionalities, along with password recovery using OTP (One-Time Password). Additionally, there is an admin dashboard for property and message management.

Features

Home: Provides an overview and navigation to different sections of the web app.
Create Property: Allows users to add new property listings to the system.
Update Property: Enables users to modify existing property details.
Delete Property: Allows users to remove properties from the system.
My Properties: Displays a list of properties added by the logged-in user.
Property Details: Shows detailed information about a specific property.
Property Search: Enables users to search for properties based on various criteria.
Favorite Properties: Allows users to save properties as favorites for quick access.
Saved Searches: Enables users to save their search criteria for future use.
Register: Allows new users to create an account.
Login: Provides authentication for registered users.
Profile: Allows users to update their account settings and password.
Password Recovery: Allows users to reset their password using OTP.
Contact Form: Provides a contact form with reCAPTCHA v2 for users to send messages.
Admin Dashboard: Allows administrators to manage properties and messages.
Property List (Admin): Displays a list of properties with options for deletion and update.
Message List (Admin): Shows a list of messages received with option for deletion.
Message Details (Admin): Displays detailed information about a specific message.

Technologies Used

Spring Boot: Backend framework for building the web app.
Spring Security (JWT): Provides user authentication and authorization using JSON Web Tokens.
Spring Mail: Enables email functionality for password recovery.
Angular: Frontend framework for building the user interface.
Angular Material: UI component library for designing the app's frontend.
MySQL: Relational database management system used for data storage.
Hibernate: Object-relational mapping (ORM) framework for database interactions.
LocalStorage: Browser storage mechanism used for storing user-specific data.
reCAPTCHA v2: Google's CAPTCHA service used for enhancing form security.

Installation

To run the Real Estate Web App locally, follow these steps:

Clone this repository to your local machine.
Make sure you have Java, Node.js, and MySQL installed.
Set up the MySQL database and update the database configuration in the application properties.
Build and run the backend Spring Boot application.
Navigate to the frontend directory and install the necessary dependencies using npm install.
Start the frontend development server using npm start.
Access the web app through the provided URL in your browser.

Contact

For any inquiries or suggestions, feel free to reach out to the project owner at

ali.magroun1@gmail.com.