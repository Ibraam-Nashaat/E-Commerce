# E-Commerce

## Prerequisites

- Node.js
- npm
- PostgreSQL

## Getting Started

1. Install Dependencies
   - Install the required dependencies using npm:

      ```bash
      $ npm install
      ```

2. Set Up Environment Variables
   - Create a .env file in the root of your project and add the following environment variables:


        ```.env file
        DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?schema=public
        JWT_SECRET=your_jwt_secret_key
        ```
    - Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials.

3. Install Prisma CLI
    - If you haven't installed Prisma CLI globally, you can install it using npm:

        ```
          $ npm install -g @nestjs/cli
        ```
4. Run Prisma Migrations
   - Run the Prisma migrations to ensure your database schema is up to date:

        ```bash
        $ npx prisma migrate dev
        ```

5. Start the Application
   - Start the NestJS application in development mode:
        ```bash
        $ npm run start:dev
        ```
   - Your application should now be running on http://localhost:3000.

## Additional Commands

- Open Prisma Studio
    - Prisma Studio allows you to explore and manipulate your database:

      ```
      $ npx prisma studio
      ```

## Access Swagger API Documentation

- To view the API documentation generated by Swagger:

  1. While the application is running, open your browser.
  2. Navigate to http://localhost:3000/api.

- You should see the Swagger UI, where you can explore and interact with your API endpoints.

