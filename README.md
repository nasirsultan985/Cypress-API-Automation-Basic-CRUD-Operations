# 🚀 Cypress API Automation - Basic CRUD Operations  

## Project Overview  
This repository contains a **basic API automation project using Cypress** for performing CRUD operations on the [Restful Booker API](https://restful-booker.herokuapp.com/).  

The purpose of this project is to help **beginners** understand how to automate API testing using Cypress **without setting up a full framework**.  

---

##  What You Will Learn  
-  How to send API requests using Cypress (`cy.request()`).  
-  Performing CRUD operations on a REST API.  
-  Handling authentication and authorization in API testing.  
-  Validating API responses using Cypress assertions.  
-  Implementing negative test cases for security validation.  

---

## Test Cases Overview  
The test suite covers the following scenarios:  

### **CRUD Operations:**  
1. **Create Booking** – Creates a new booking and stores the booking ID.  
2. **Fetch Booking Details** – Retrieves and verifies the details of the newly created booking.  
3. **Get All Bookings** – Fetches all existing bookings from the API.  

### **Negative Test Cases:**  
4. **[Negative] Update Booking Without Authorization** – Attempts to update a booking **without authentication** (Expected: `403 Forbidden`).  
5. **[Negative] Delete Booking Without Authorization** – Tries to delete a booking **without authentication** (Expected: `403 Forbidden`).  

### **Authentication & Authorized Actions:**  
6. **User Authentication** – Logs in with valid credentials and retrieves an authentication token.  
7. **Update Booking with Authorization** – Updates the booking details using **authentication**.  
8. **Delete Booking with Authorization** – Successfully deletes a booking using authentication.  
9. **Verify Deletion** – Ensures that the deleted booking is **no longer accessible** (Expected: `404 Not Found`).  

---

## Installation & Setup  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (LTS version recommended)  

### 🚀 Steps to Set Up and Run the Tests  
#### 1. Clone this repository  
```sh
git clone https://github.com/your-username/cypress-api-automation.git  
cd cypress-api-automation
```
#### 2. Install dependencies  
```sh
npm install
```
#### 3. Run the Cypress tests
To run tests in headless mode:
```sh
npx cypress run  
```
To run tests in headed/browser mode:

```sh
npx cypress open  
```
Now select the desired browser and execute

### Contributions
Feel free to fork this repository, make improvements, and submit a pull request! 
