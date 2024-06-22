# WorkoutDev

Web application to setup, record, and track workout sessions progress.

## Technologies
- Node.js
- JavaScript
- HTML
- CSS
- MongoDB
- Docker

## Setup

### Prerequisite

Before you begin, ensure you have installed [Docker Desktop](https://www.docker.com/products/docker-desktop/) in your machine.

### Starting the Application

1. Clone the repository:
    ```sh
    git clone https://github.com/VitorBarbi/workout-dev.git
    ```

2. Navigate to the project directory:
    ```sh
    cd workout-dev
    ```

3. Create the .env file and set the `SESSION_SECRET` (to secure the session data):
    ```sh
    "SESSION_SECRET=your_secret_key" | Out-File -FilePath .env -Encoding UTF8
    ```

    Replace `your_secret_key` with a secure, random string.

4. Build the application image:
    ```sh
    docker build -t workout-dev .
    ```   
    
5. Create and start containers:
    ```sh
    docker-compose up
    ``` 

6. Open your web browser and go to:
    ```
    http://localhost:3000
    ```