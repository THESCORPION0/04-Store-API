# My Way to Learn NodeJS - Build a Store API

This repo contains my second project in learning Backend using Express.js. I applied different features like sorting, numeric filters, search, limit fields, and pagination that can be applied to any future API.

## Features

- **Sorting**: Sort products based on various fields.
- **Numeric Filters**: Filter products based on numeric fields like price and rating.
- **Search**: Search products by name.
- **Limit Fields**: Limit the fields returned in the response.
- **Pagination**: Paginate the list of products.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Getting Started

Run `npm install` to install all needed packages and then run `npm start` to start the server.

## Endpoints

- `GET /api/v1/products`: Get all products from the API server

## Usage

1. Clone the repository.
2. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
    ```
    MONGO_URI=your_mongo_uri
    PORT=5000
    ```
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.
5. Use a tool like Postman to test the endpoints.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- dotenv
- express-async-errors
- http-status-codes
- mongoose