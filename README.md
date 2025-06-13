# Shoppe - E-Commerce Jewelry Store Front-End

This project is the front-end for "Shoppe," an e-commerce application for a jewelry store, originally developed as a university term paper. It showcases a complete and feature-rich user-facing experience, from Browse and filtering products to a full checkout and user account management system.

The application is built with React and communicates with a pre-existing Java Spring Boot REST API for data and authentication.

---

## ✨ Features

* **User Authentication:** Secure user registration, login, and session management using `react-auth-kit` for a seamless experience.
* **Product Catalog:** Browse all available products with robust filtering and sorting options.
    * Filter by product type (Rings, Earrings, etc.).
    * Filter by price range using an interactive slider.
    * Sort products by price (Min to Max / Max to Min).
    * Search for products by name.
    * Toggle to show only in-stock items.
* **Shopping Cart:** Add/remove items, and adjust quantities before proceeding to checkout.
* **User Account Dashboard:**
    * View recent order history and details.
    * Manage and add multiple shipping addresses.
    * Update account details and change passwords.
* **Secure Checkout Process:** A protected route for authenticated users to place their orders.
* **Product Details & Reviews:** View detailed information for each item and read or submit customer reviews.
* **Responsive Design:** A clean and modern UI that works across different screen sizes.
* **Notifications:** An integrated notification system to provide feedback to the user on actions (e.g., item added to cart, order placed).
* **Static Pages:** Includes "About Us," "Terms of Use," and "Privacy Policy" pages.

---

## 🚀 Technologies & Libraries Used

* **Core:** React, React Router
* **State Management:** Redux Toolkit
* **Styling:** Sass (SCSS)
* **Forms:** Formik & Yup for robust form handling and validation.
* **Authentication:** React Auth Kit for client-side authentication management.
* **Animations & UI:**
    * Framer Motion for page transitions and animations.
    * Swiper.js for the main page image slider.
    * FontAwesome for icons.
* **HTTP Requests:** Custom `useHttp` hook for interacting with the backend API.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This is a front-end application and requires the corresponding [Shoppe Backend](https://github.com/Danilbel/shoppe) to be running. By default, the backend is expected to be available at `http://localhost:9122`.

### Installation & Launch

1.  Clone the repository:
    ```shell
    git clone [https://github.com/Danilbel/shoppe.git](https://github.com/Danilbel/shoppe.git)
    ```
2.  Navigate to the frontend directory:
    ```shell
    cd shoppe/frontend
    ```
3.  Install NPM packages:
    ```shell
    npm install
    ```
4.  Run the app in development mode:
    ```shell
    npm start
    ```

The application will now be available at `http://localhost:3000`.

---

## 📝 Backend Information

This frontend was developed to work with a Java Spring Boot backend. The backend provides the REST API for products, users, authentication, and orders, which this application consumes. You can find the original repository containing both frontend and backend [here](https://github.com/Danilbel/shoppe).
