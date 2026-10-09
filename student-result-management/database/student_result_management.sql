CREATE DATABASE IF NOT EXISTS student_result_management;
USE student_result_management;
DROP TABLE IF EXISTS results; DROP TABLE IF EXISTS students; DROP TABLE IF EXISTS admins;
CREATE TABLE admins(id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(50) UNIQUE NOT NULL,password VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE students(id INT AUTO_INCREMENT PRIMARY KEY,enrollment_no VARCHAR(20) UNIQUE NOT NULL,student_name VARCHAR(100) NOT NULL,email VARCHAR(100) NOT NULL,phone VARCHAR(20),course VARCHAR(100),semester VARCHAR(20),section VARCHAR(20),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE results(id INT AUTO_INCREMENT PRIMARY KEY,student_id INT UNIQUE NOT NULL,web_development INT,database_management INT,software_engineering INT,cyber_security INT,computer_networks INT,total_marks INT DEFAULT 0,percentage DECIMAL(5,2) DEFAULT 0,grade VARCHAR(3),result_status VARCHAR(4),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE);
INSERT INTO students(enrollment_no,student_name,email,phone,course,semester,section) VALUES
('240503020001','Dev Achhada','dev@example.com','9000000001','BCA','Sem 5','Class A'),
('240503020002','Rahul Manglani','rahul@example.com','9000000002','BCA','Sem 5','Class A'),
('240503020003','Aarav Patel','aarav@example.com','9000000003','BCA','Sem 5','Class A'),
('240503020004','Riya Shah','riya@example.com','9000000004','BCA','Sem 5','Class A'),
('240503020005','Kunal Mehta','kunal@example.com','9000000005','BCA','Sem 5','Class A'),
('240503020006','Neel Dube','neel@example.com','9000000006','BCA','Sem 5','Class A'),
('240503020007','Bhavya Tank','bhavya@example.com','9000000007','BCA','Sem 5','Class A'),
('240503020008','Yash Patel','yash@example.com','9000000008','BCA','Sem 5','Class A'),
('240503020009','Dhruv Shah','dhruv@example.com','9000000009','BCA','Sem 5','Class A'),
('240503020010','Krisha Patel','krisha@example.com','9000000010','BCA','Sem 5','Class A');
INSERT INTO results(student_id,web_development,database_management,software_engineering,cyber_security,computer_networks) VALUES
(1,95,92,94,91,93),(2,85,82,88,84,81),(3,75,72,78,74,71),(4,65,62,68,64,66),(5,55,52,58,54,56),
(6,45,42,48,44,46),(7,88,79,84,90,76),(8,35,30,38,32,36),(9,78,81,76,80,77),(10,92,88,95,90,89);
UPDATE results SET total_marks=web_development+database_management+software_engineering+cyber_security+computer_networks;
UPDATE results SET percentage=ROUND(total_marks/5,2);
UPDATE results SET grade=CASE WHEN percentage>=90 THEN 'A+' WHEN percentage>=80 THEN 'A' WHEN percentage>=70 THEN 'B+' WHEN percentage>=60 THEN 'B' WHEN percentage>=50 THEN 'C' WHEN percentage>=40 THEN 'D' ELSE 'F' END, result_status=IF(percentage>=40,'PASS','FAIL');
