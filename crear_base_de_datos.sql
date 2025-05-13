-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS finanzas_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finanzas_app;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Tabla de movimientos
CREATE TABLE IF NOT EXISTS movimientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('ingreso', 'gasto') NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  descripcion VARCHAR(255),
  fecha DATE NOT NULL,
  categoria_id INT,
  usuario_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Datos de ejemplo
INSERT INTO categorias (nombre) VALUES
  ('Alimentación'),
  ('Transporte'),
  ('Entretenimiento'),
  ('Salud'),
  ('Educación');

INSERT INTO usuarios (nombre, correo, contrasena) VALUES
  ('Usuario Demo', 'demo@correo.com', 'demo123');

-- Insert de prueba para movimiento
INSERT INTO movimientos (tipo, monto, descripcion, fecha, categoria_id, usuario_id) VALUES
  ('gasto', 500.00, 'Compra de víveres', '2024-05-01', 1, 1),
  ('ingreso', 2000.00, 'Pago de salario', '2024-05-02', NULL, 1);
