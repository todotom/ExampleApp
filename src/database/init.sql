CREATE DATABASE inventory;

CREATE TABLE inventory.items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE KEY,
    description VARCHAR(50),
    price FLOAT
);

INSERT INTO inventory.items (name, description, price)
VALUE ("Test name", "Test description", 520.15);