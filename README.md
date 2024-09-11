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
export MAIL_USERNAME=your_mail
export MAIL_PASSWORD=your_password
```

5. Run backend:
```shell
./gradlew run
```

6. Go to the project frontend directory:
```shell
cd ../frontend
```

7. Build frontend:
```shell
npm install
```

8. Run frontend:
```shell
npm start
```

After that, the application will be available at `http://localhost:3000/` and the API documentation at `http://localhost:9122/swagger-ui.html`.
