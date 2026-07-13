CREATE DATABASE IF NOT EXISTS tienda_vehiculos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_vehiculos;
DROP TABLE IF EXISTS vehiculos;
CREATE TABLE vehiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(80) NOT NULL,
  anio SMALLINT NOT NULL,
  precio DECIMAL(12,0) NOT NULL,
  categoria VARCHAR(40) NOT NULL,
  transmision ENUM('Manual','Automática') NOT NULL DEFAULT 'Manual',
  combustible ENUM('Bencina','Diésel','Híbrido','Eléctrico') NOT NULL DEFAULT 'Bencina',
  stock INT NOT NULL DEFAULT 0,
  imagen_url VARCHAR(255) DEFAULT NULL,
  descripcion TEXT DEFAULT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_marca (marca), INDEX idx_categoria (categoria)
) ENGINE=InnoDB;
INSERT INTO vehiculos (marca, modelo, anio, precio, categoria, transmision, combustible, stock, descripcion) VALUES
('Toyota','Corolla XEI',2024,22990000,'Sedán','Automática','Bencina',8,'Sedán confiable, bajo consumo y alta reventa.'),
('Toyota','RAV4 Hybrid',2024,34990000,'SUV','Automática','Híbrido',4,'SUV híbrida con tracción integral.'),
('Toyota','Hilux 4x4 SRV',2023,39990000,'Camioneta','Automática','Diésel',5,'Pick-up robusta para trabajo y aventura.'),
('Nissan','Versa Advance',2024,16990000,'Sedán','Automática','Bencina',10,'Sedán compacto, equipado y eficiente.'),
('Nissan','Kicks Exclusive',2024,21990000,'SUV','Automática','Bencina',6,'SUV urbana con diseño moderno.'),
('Nissan','Frontier Pro-4X',2023,37990000,'Camioneta','Automática','Diésel',3,'Camioneta doble cabina de alto rendimiento.'),
('Mazda','Mazda3 Sport',2024,24990000,'Hatchback','Automática','Bencina',5,'Hatchback deportivo con tecnología SkyActiv.'),
('Mazda','CX-5 Grand Touring',2024,33990000,'SUV','Automática','Bencina',4,'SUV premium con acabados de lujo.'),
('Chevrolet','Sail LT',2024,12990000,'Sedán','Manual','Bencina',12,'Sedán económico ideal para ciudad.'),
('Chevrolet','Groove LT',2024,17990000,'SUV','Automática','Bencina',7,'SUV compacta con excelente equipamiento.'),
('Chevrolet','Silverado LTZ',2023,45990000,'Camioneta','Automática','Diésel',2,'Pick-up full-size con máximo confort.'),
('Peugeot','208 Active',2024,18990000,'Hatchback','Automática','Bencina',6,'Hatchback francés con diseño i-Cockpit.'),
('Peugeot','2008 Allure',2024,25990000,'SUV','Automática','Bencina',4,'SUV compacta con estilo europeo.'),
('Peugeot','e-208 GT',2024,32990000,'Hatchback','Automática','Eléctrico',3,'Versión 100% eléctrica, cero emisiones.'),
('Ford','Territory Titanium',2024,28990000,'SUV','Automática','Bencina',5,'SUV familiar con pantalla panorámica.'),
('Ford','Ranger XLT',2023,36990000,'Camioneta','Automática','Diésel',6,'Camioneta líder en ventas, muy versátil.'),
('Ford','Mustang Mach-E',2024,49990000,'SUV','Automática','Eléctrico',1,'SUV eléctrica deportiva de alto desempeño.'),
('Toyota','Yaris Sport',2024,15990000,'City Car','Manual','Bencina',9,'City car ágil y económico.');
CREATE USER IF NOT EXISTS 'alumno'@'%' IDENTIFIED BY 'alumno123';
GRANT SELECT, INSERT, UPDATE, DELETE ON tienda_vehiculos.* TO 'alumno'@'%';
FLUSH PRIVILEGES;
SELECT COUNT(*) AS total_vehiculos FROM vehiculos;
