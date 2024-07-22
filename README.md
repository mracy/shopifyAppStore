Shopify Best-Selling Products and Most Valuable Customers App

Overview

This application is designed to integrate with Shopify to display critical sales metrics to store administrators. It provides a Shopify app that showcases the top-selling products and the most valuable customers based on their purchase history.

Features

Top-Selling Products:

Displays the top 5 products that have sold the most, sorted in descending order by quantity sold.

Most Valuable Customers:

Lists the top 5 customers who have spent the most, sorted in descending order of total purchase value.

Technology Stack

Operating System: macOS
Integrated Development Environment (IDE): IntelliJ IDEA Community Edition
Programming Language: Node.js
Database: MongoDB
API: RESTful API with CRUD operations
Setup and Installation
Prerequisites
Node.js
MongoDB
Shopify Store and API Access
Installation

Clone the Repository:

bash
Copy code

git clone git@github.com:mracy/shopifyAppStore.git
cd shopifyAppStore

Install Dependencies:

bash
Copy code

npm install

Configuration:

Create a .env file in the root directory and add your Shopify credentials and MongoDB URI:

env

Copy code

MONGODB_URI=your-mongodb-uri
PORT=your-port

Run the Application:

bash
Copy code

npm start

API Endpoints

Products
Get Top-Selling Products
URL: /api/products/top-selling-products
Method: GET
Description: Retrieve the top 5 products sorted by quantity sold in descending order.

Customers
Get Most Valuable Customers
URL: /api/customers/most-valuable
Method: GET
Description: Retrieve the top 5 customers based on total purchase value in descending order.

Example Usage
Fetching Top-Selling Products
Request:

bash
Copy code
curl -X GET [http://localhost:3000/api/products/top-selling-products]

Response:

json
Copy code

[
    {
        "_id": "669d363c5973b55fe9708879",
        "productId": "prod_009",
        "name": "Acoustic Guitar",
        "description": "A high-quality acoustic guitar with a solid spruce top, mahogany back and sides, and rosewood fretboard. Perfect for both beginners and professionals.",
        "price": 499.99,
        "category": "Musical Instruments",
        "brand": "MusicMaster",
        "stock": 725,
        "quantitySold": 370,
        "images": [
            "https://example.com/images/acousticguitar1.jpg",
            "https://example.com/images/acousticguitar2.jpg"
        ],
        "createdAt": "2024-07-27T10:00:00.000Z",
        "updatedAt": "2024-07-22T16:10:44.857Z",
        "__v": 0
    },
    {
        "_id": "669e4c2c8b5a1340644389db",
        "productId": "prod_013",
        "name": "Induction Cooktop",
        "description": "A sleek and efficient induction cooktop with multiple temperature settings and a fast heating feature. It includes a digital touch panel for easy control and is perfect for modern kitchens.",
        "price": 149.99,
        "category": "Kitchen Appliances",
        "brand": "ChefMaster",
        "stock": 730,
        "quantitySold": 300,
        "images": [
            "https://example.com/images/inductioncooktop1.jpg",
            "https://example.com/images/inductioncooktop2.jpg"
        ],
        "createdAt": "2024-07-30T10:00:00.000Z",
        "updatedAt": "2024-07-22T16:10:44.740Z",
        "__v": 0
    },
    {
        "_id": "60d5f4825b91b256b7d68e56",
        "productId": "prod_004",
        "name": "Portable Air Cooler",
        "description": "Compact and efficient air cooler with adjustable fan speeds and remote control.",
        "price": 159.99,
        "category": "Home Appliances",
        "brand": "CoolBreeze",
        "stock": 1150,
        "quantitySold": 150,
        "images": [
            "https://example.com/images/aircooler1.jpg",
            "https://example.com/images/aircooler2.jpg"
        ],
        "createdAt": "2024-03-15T08:00:00.000Z",
        "updatedAt": "2024-07-22T16:10:44.968Z",
        "__v": 0
    },
    {
        "_id": "669d31f0a582bcbcd7ac34c4",
        "productId": "prod_008",
        "name": "High-End Gaming PC",
        "description": "Powerful gaming PC with an Intel i9 processor, 64GB RAM, and RTX 4090 GPU. Ideal for high-performance gaming and video editing.",
        "price": 2999.99,
        "category": "Computers",
        "brand": "GameMaster",
        "stock": 796,
        "quantitySold": 148,
        "images": [
            "https://example.com/images/gamingpc1.jpg",
            "https://example.com/images/gamingpc2.jpg"
        ],
        "createdAt": "2024-07-25T12:00:00.000Z",
        "updatedAt": "2024-07-22T16:10:45.296Z",
        "__v": 0
    },
    {
        "_id": "669cce5ea4b0beadcd8fac79",
        "productId": "prod_003",
        "name": "Smart Fitness Tracker Watch",
        "description": "A sleek and stylish fitness tracker watch with heart rate monitoring, sleep tracking, and activity tracking features.",
        "price": 129.99,
        "category": "Wearables",
        "brand": "FitTrack",
        "stock": 1029,
        "images": [
            "https://example.com/images/fitness-tracker1.jpg",
            "https://example.com/images/fitness-tracker2.jpg"
        ],
        "quantitySold": 74,
        "createdAt": "2024-03-15T10:00:00.000Z",
        "updatedAt": "2024-07-22T16:10:45.186Z",
        "__v": 0
    }
]

Development Notes
Database: MongoDB is used for storing products, customers, and orders data.
IDE: Developed using IntelliJ IDEA Community Edition for a streamlined coding experience.
RESTful API: The application uses RESTful API principles for efficient data retrieval and management with complete CRUD operations.

License
This project is licensed under the HIT License.
