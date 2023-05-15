# Mentoring Platform API

This repository contains the code for the Mentoring Platform API, which is a part of the Bangkit Company Capstone Project on Dicoding. The API is built using Node.js, Express, and Typescript, following the Clean Code architecture principles. It utilizes Cloud SQL as the database and Prisma ORM for database operations. Firebase is used for authentication, and the application is dockerized and deployed on Google Cloud Run.

## Project Overview

The Mentoring Platform API serves as the backend for a mentoring platform. It provides various endpoints to manage users, mentors, mentees, and mentoring sessions. The API handles user authentication and authorization, allowing users to sign up, log in, and access the relevant features based on their role. Mentors can create mentoring sessions, and mentees can request mentoring sessions.

## Installation

To set up the Mentoring Platform API locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies by running the following command:
   ```
   npm install
   ```
3. Set up the required environment variables. Create a `.env` file in the project root directory and provide the necessary values. You can refer to the `.env.example` file for the required variables.
4. Make sure you have Docker installed on your machine.
5. Build the Docker image by running the following command:
   ```
   docker build -t mentoring-platform-api .
   ```
6. Run the Docker container by executing the command:
   ```
   docker run -p 8080:8080 mentoring-platform-api
   ```

The API will now be running locally on `http://localhost:8080`.

## API Documentation

To understand how to interact with the Mentoring Platform API, please refer to the [API documentation]([documentation.md](https://documenter.getpostman.com/view/17733078/2s93eeRV3d)). The documentation provides detailed information about the available endpoints, request/response formats, and authentication requirements.

## Deployment

The Mentoring Platform API is deployed on Google Cloud Run and can be accessed using the following link: [https://mentoring-platform-api-glalxkjpha-et.a.run.app/](https://mentoring-platform-api-glalxkjpha-et.a.run.app/)

## Technologies Used

The following technologies and tools were used to develop the Mentoring Platform API:

- Node.js: JavaScript runtime environment
- Express: Web application framework
- Typescript: Programming language
- Cloud SQL: Managed relational database service
- Prisma: Database toolkit and ORM
- Firebase: Authentication service
- Docker: Containerization platform
- Google Cloud Run: Serverless compute platform

## Contributions

Contributions to the Mentoring Platform API project are welcome! If you find any issues or want to propose new features, please open an issue in this repository. You can also submit pull requests to contribute directly to the codebase.

When contributing, please follow the existing code style and conventions. Ensure that your changes are well-tested and provide clear documentation.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Contact

If you have any questions or need further assistance, you can reach out to the project maintainer at [fahrelga30@gmail.com](mailto:fahrelga30@gmail.com).
