-- Creamos la base de datos
CREATE DATABASE dbalwaysmusic;


-- Verificamos la base de datos
\l

-- muestra las tablas
\dt;

-- nos conectamos a la bbdd
\c dbalwaysmusic;

-- Creamos la tabla alumnos
CREATE TABLE alumnos (
    rut VARCHAR(30) PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    curso VARCHAR(30) NOT NULL,
    nivel VARCHAR(30) NOT NULL
    );

-- para eliminar la tabla anterior
    DROP DATABASE dbalwaysmusic;
