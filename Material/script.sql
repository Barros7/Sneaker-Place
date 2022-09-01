CREATE TABLE Clientes
(
  Id_Clientes INT NOT NULL AUTO_INCREMENT,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(32) NOT NULL,
  Nome VARCHAR(32) NOT NULL,
  Sobrenome VARCHAR(32) NOT NULL,
  PRIMARY KEY (Id_Clientes)
);

CREATE TABLE Administradores
(
  Id_Administrador INT NOT NULL AUTO_INCREMENT,
  Sobrenome VARCHAR(32) NOT NULL,
  Nome VARCHAR(32) NOT NULL,
  Email VARCHAR(32) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  PRIMARY KEY (Id_Administrador)
);

CREATE TABLE Tenis
(
  Id_Tenis INT NOT NULL AUTO_INCREMENT,
  Marca VARCHAR(32) NOT NULL,
  Preco FLOAT NOT NULL,
  PRIMARY KEY (Id_Tenis)
);

CREATE TABLE Modelo
(
  Id_Modelo INT NOT NULL AUTO_INCREMENT,
  Nome VARCHAR(32) NOT NULL,
  Id_Tenis INT NOT NULL,
  PRIMARY KEY (Id_Modelo),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis)
);

CREATE TABLE Tamanho
(
  Id_Tamanho INT NOT NULL AUTO_INCREMENT,
  Numero FLOAT NOT NULL,
  PRIMARY KEY (Id_Tamanho)
);

CREATE TABLE Cor
(
  Id_Cor INT NOT NULL AUTO_INCREMENT,
  Nome VARCHAR(32) NOT NULL,
  PRIMARY KEY (Id_Cor)
);

CREATE TABLE Negocia
(
  Data_negocio DATE NOT NULL,
  Hora_negocio DATE NOT NULL,
  Id_Clientes INT NOT NULL,
  Id_Tenis INT NOT NULL,
  PRIMARY KEY (Id_Clientes, Id_Tenis),
  FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis)
);

CREATE TABLE Gere
(
  Id_Administrador INT NOT NULL,
  Id_Tenis INT NOT NULL,
  PRIMARY KEY (Id_Administrador, Id_Tenis),
  FOREIGN KEY (Id_Administrador) REFERENCES Administradores(Id_Administrador),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis)
);

CREATE TABLE TenisTamanho
(
  Id_Tenis INT NOT NULL,
  Id_Tamanho INT NOT NULL,
  PRIMARY KEY (Id_Tenis),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis),
  FOREIGN KEY (Id_Tamanho) REFERENCES Tamanho(Id_Tamanho)
);

CREATE TABLE TenisCor
(
  Id_Tenis INT NOT NULL,
  Id_Cor INT NOT NULL,
  PRIMARY KEY (Id_Tenis, Id_Cor),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis),
  FOREIGN KEY (Id_Cor) REFERENCES Cor(Id_Cor)
);

CREATE TABLE TenisFavoritos
(
  Id_Clientes INT NOT NULL,
  Id_Tenis INT NOT NULL,
  PRIMARY KEY (Id_Clientes, Id_Tenis),
  FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes),
  FOREIGN KEY (Id_Tenis) REFERENCES Tenis(Id_Tenis)
);
