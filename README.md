# AI Planning Software Repository

A centralized platform for accessing AI planning software, with features to discover, filter, sort, and add new software. This platform aims to consolidate metadata about various AI planning tools and provide an easy-to-use interface for users to find and manage these resources.

## Prerequisites

- **Docker Desktop**  
  Docker Desktop is required to run the application in a containerized environment. It can be installed from the official [Docker website](https://docs.docker.com/desktop/).

## Steps to Run the Application

1. **Open Docker Desktop**  
   Make sure Docker Desktop is running before proceeding.

2. **Clone the Repository**  
   Clone the repository using the following command:  
   ```bash
   git clone <repository_url>
   ```

3. **Navigate to the Project Folder**  
   Move to the project directory with:  
   ```bash
   cd <project_folder>
   ```

4. **Start Docker Desktop**  
   If not already running, open Docker Desktop.

5. **Build and Start the Containers**  
   Use the following command to build and start the containers:  
   ```bash
   docker-compose up --build
   ```

6. **Access the Application**  
   Open a web browser and go to: [http://localhost:3000](http://localhost:3000)

## Optional Steps

### Running Test Cases

1. **Frontend Tests**  
   To run the frontend test cases, open a command prompt and type:  
   ```bash
   docker exec -it frontend npm test
   ```

2. **Backend Tests**  
   To run the backend test cases, use:  
   ```bash
   docker exec -it backend npm test
   ```

## Steps for Admin

1. **Login to the Database**  
   Open a command prompt and login to the database using the command:  
   ```bash
   docker exec -it mysql_db mysql -u root -p
   ```  
   When prompted, enter the password as `"admin"`.

2. **Manage Records in the Database**  
   The admin can read, delete, or modify records using the following commands. Note that the admin receives the software ID via email when a new record is added.

   - **Read Records**  
     To read the details of a specific record, use:  
     ```sql
     SELECT * FROM ai_tools.ai_planning_softwares WHERE id = "ID_value"\G
     ```

   - **Delete a Record**  
     To delete a specific record from the database, run:  
     ```sql
     DELETE FROM ai_tools.ai_planning_softwares WHERE id = "ID_value";
     ```

   - **Update a Record**  
     To update a specific record, you can use a command like:  
     ```sql
     UPDATE ai_tools.ai_planning_softwares
     SET column_name = 'new_value'
     WHERE id = "ID_value";
     ```
