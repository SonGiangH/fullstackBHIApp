# Pull MySQL image version 8.3.0
docker pull mysql:8.3.0

# Run MySQL container with specified configurations
docker run --name mysqlcontainer -e MYSQL_ROOT_PASSWORD=123456 -p 3336:3306 -d mysql:8.3.0

# Access MySQL container
docker exec -it "name of mysql container above" bash

# Build image of JAR file to Docker container
cd to_folder_containing_dockerfile_in_project_to_build_image_of_jar_file_to_docker_container
docker build --tag=bakerhughesapp-backend:0.0.1 .

# Check port of app in application properties
# Change the port to map between desired port and port of the application
docker run -p 8887:8888 bakerhughesapp-backend:0.0.1

# Build containers using docker-compose
docker-compose -f ./deployment.yaml up -d mysql8-container
docker-compose -f ./deployment.yaml up -d phpmyadmin8-container
docker-compose -f ./deployment.yaml up -d bhiapp-spring-container

# Front end Angular to connect
# Access environment.ts and change the port to port of bhiapp-spring container: 8099

# Connect MySQL via Docker container
version: '3.7'
services:
  mysql8-container:
    container_name: mysql8-container
    image: mysql:8.2.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: bhiapp
    ports:
      - 3307:3306
    networks:
      - bhiapp-network

# ---> no map port tu 3306 ---> 3307 do đó phải edit lại port trong file application.properties trong Java spring boot thành như sau
server:
  port: 8088    // port 8088 này là để test api bằng postman   ( ví dụ: http://localhost:8088/api/v1/tool)
spring:
  datasource:
    url: jdbc:mysql://localhost:3307/BhiApp?useSSL=false&serverTimezone=UTC   ->>> port 3307 là port của docker do đã map ở trên (bình thường sẽ là 3306)
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

Khong can neu da build mysql8-container (no' da map port 3307:3306)
# Dockerfile for building image
# Multi-staging for efficiency
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY bakerhughesapp-backend /app/bakerhughesapp-backend
RUN mvn package -f /app/bakerhughesapp-backend/bakerhughesapp/pom.xml

FROM openjdk:17-slim  
WORKDIR /app
COPY --from=build /app/bakerhughesapp-backend/bakerhughesapp/target/bakerhughesapp-0.0.1-SNAPSHOT.jar bhiapp.jar

EXPOSE 8088
CMD ["java","-jar","bhiapp.jar"]
# How to deploy Angular project into VPS
# Build Angular app for production
ng build --configuration production

# Edit index.html file inside dist/angular-app-name
# Copy all files inside dist/angular-app-name into server folder /var/www/html/
scp -pr kinhdichapp/* root@103.101.163.117:/var/www/html/

# Install nginx on server
apt install nginx

# Allow ports in firewall
sudo apt install ufw
sudo ufw allow 'OpenSSH'
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx Full'
sudo ufw allow 3000
sudo ufw enable

# Edit nginx config
vim /etc/nginx/sites-available/myserver.config
# Add server configuration and link the file
sudo ln -s /etc/nginx/sites-available/myserver.config /etc/nginx/sites-enabled/myserver.config

# Check syntax of nginx config and restart nginx
nginx -t
sudo systemctl restart nginx
# Commands to delete Docker containers and images
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi -f $(docker images -aq)
# Zip all files and directories inside folder to VPS
scp -pr folder_name root@your_server:/root/folder_name

# Install 7z
sudo apt-get install p7zip-full

# Install Docker
apt install docker.io

# Start Docker service
sudo service docker start

# Install Docker Compose
apt install docker-compose

# Remove all files and directories inside html folder
rm -r /var/www/html/*

# Set all values in a single column MySQL query
# Add column
ALTER TABLE table_name
ADD column_name datatype;
