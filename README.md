# WorkoutDev

Web application to setup, record, and track workout sessions progress.

## Technologies
- Node.js
- JavaScript
- HTML
- CSS
- MongoDB

## Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/) (version 20.15.0)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 7.0.11)

### Running the Server

1. Start MongoDB:
    ```sh
    mongod
    ```

2. Clone the repository:
    ```sh
    git clone https://github.com/VitorBarbi/workout-dev.git
    ```

3. Navigate to the project directory:
    ```sh
    cd workout-dev
    ```

4. Create the .env file and set the `SESSION_SECRET` (to secure the session data):
    ```sh
    "SESSION_SECRET=your_secret_key" | Out-File -FilePath .env -Encoding UTF8
    ```

    Replace `your_secret_key` with a secure, random string.

5. Install the dependencies:
    ```sh
    npm install
    ```
    
6. Start the server:
    ```sh
    npm run dev
    ```

7. Open your web browser and go to:
    ```
    http://localhost:3000
    ```