# social-platform-mongo-express

## Description

A social platform web application built with MERN stack. This is the codebase for the MongoDB NodeJS and Express RESTful backend API.

This is the solution for the full-stack web dev course @CoderSchoolVn

## Features

This include all common features of a Social Platform.

### User authentication and managing account (UserFlow)

1. User can create account with email and password
2. User and Admin can login with email and password
3. User and Admin can login with facebook and google
4. Owner can see own user's information
5. Owner can update own account profile
6. Owner can deactivate own account

7. Admin can see a list of all users
8. Admin can see detail information of all Users
9. Admin can update information of all Users
10. Admin can see a list of all users
11. Admin can deactive any account

### CRUD product and manage product (ProductFlow)

1. User and Admin can see list of product at home page.
2. User can filter product by (search by name, category, keywords).
3. User can see detail information of single product.
4. Admin can add a product.
5. Admin can add discription(HTML/CSS) for product.
6. Admin can update information of a product.
7. Admin can deactive a product.

### CRUD review and manage review (ReviewFlow)

1. User can see list of review.
2. Authenticated user and Admin can add reviews.
3. Authenticated user can update own reviews.
4. Admin can update any reviews.
5. Admin can deactive a review.

### CRUD category (CategoryFlow)

1. User can see list of category
2. User can see a single category
3. Admin can add category
4. Admin can update a category
5. Admin can deactive a category
6. Authenticated user when click on category can see a list of products.

### CRUD cart (CartFlow)

1. Authenticated user can see list of product in cart
2. Authenticated user can see detail info of product when user click on image of product.
3. Authenticated user can change quantity of products.
4. Admin can change status of order
5. Admin can cancel order with many reason.

### CRUD order (OrderFlow)

1. Authenticated user can see list of order
2. Authenticated user can see detail info of order
3. Authenticated user can check status of order
4. Authenticated user can deactive of order
5. Admin can change status of order
6. Admin can cancel order with many reason.

### CRUD SEO with meta data (SEOFlow)

1. Admin can add meta tag for product.
2. When we access detail product, we can see some of meta data will show at the top of head tag HTML.

## Production API

- [Doc](https://app.swaggerhub.com/apis-docs/dhminh1024/CoderComm/1.0.0#/Reaction/createReaction)

- [App demo](https://codercomm-dot-cs-platform-306304.et.r.appspot.com/)

## Project setup

1. Generate express boiler plate

   ```console
   npx express-generator --no-view
   npm install
   touch .gitignore .env
   ```

2. Install project dependencies

   ```console
   npm i nodemon cors bcryptjs dotenv
   npm i jsonwebtoken mongoose
   ```

3. Add dev script

   ```json
   {
       "scripts":{
           ...
           "dev":"nodemon ./bin/www"
       }
   }
   ```

4. Environment variable config (JSK, MURI)
   In `.env`

   ```txt
    JWT_SECRET_KEY=someKey
    MONGO_DEV_URI=mongodb://locahost:27017/
    MONGO_PRO_URI=mongodb_srv://atlas.com/
   ```

   In `.gitignore`

   ```txt
    node_modules
   .env
   ```

## The end

@copyright by Quach Trung Tin
