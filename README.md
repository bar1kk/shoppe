# Shoppe jewelry online store

A project developed during the third year of study as a term paper.
Internet store for the sale of jewelry.

## Backend Technologies
- Java 17
- Spring Boot 3.1.5
- Spring Web
- Spring Data JPA
- Spring security
- Spring validation
- Spring mail
- SpringDoc OpenAPI
- MapStruct
- JWT
- Lombok
- Gradle
- Flyway
- PostgreSQL

## Build and Run

1. Clone the repository:
```shell
git clone https://github.com/Danilbel/shoppe.git
```

2. Go to the project backend directory:
```shell
cd shoppe/backend
```

3. Build backend:
```shell
./gradlew build
```

4. The project uses mailing of messages through mail. To specify the password and mail from which the mailing will take place, it is necessary to enter environment variables
```shell
export MAIL_USERNAME=<your_mail>
export MAIL_PASSWORD=<your_password>
```

5. To configure the PostgeSQL database, you must specify the following environment variables
```shell
export DB_URL=jdbc:postgresql://localhost:5432/<your_name_db>
export DB_USERNAME=<your_username>
export DB_PASSWORD=<your_password>
```

6. To display images, specify the path to the `images` folder
```shell
export APP_IMAGE_BUCKET_PATH=<your_path>
```

7. Run backend:
```shell
./gradlew run
```

8. Go to the project frontend directory:
```shell
cd ../frontend
```

9. Build frontend:
```shell
npm install
```

10. Run frontend:
```shell
npm start
```

After that, the application will be available at `http://localhost:3000/` and the API documentation at `http://localhost:9122/swagger-ui.html`.
