CREATE TABLE IF NOT EXISTS SneakerModels
(
  Model_id INT NOT NULL AUTO_INCREMENT,
  Model VARCHAR(15) NOT NULL,
  PRIMARY KEY (Model_id)
);

CREATE TABLE IF NOT EXISTS Sneakers
(
  Sneaker_id INT NOT NULL AUTO_INCREMENT,
  Brand VARCHAR(15) NOT NULL,
  Price FLOAT NOT NULL,
  Size FLOAT NOT NULL,
  Photo VARCHAR(32),
  Color VARCHAR(10) NOT NULL,
  Name VARCHAR(15) NOT NULL,
  Model_id INT NOT NULL,
  Description TEXT NOT NULL,
  PRIMARY KEY (Sneaker_id),
  FOREIGN KEY (Model_id) REFERENCES SneakerModels(Model_id)
);


CREATE TABLE IF NOT EXISTS Users
(
  Users_id INT NOT NULL AUTO_INCREMENT,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(32) NOT NULL,
  Name VARCHAR(15) NOT NULL,
  Last_name VARCHAR(10) NOT NULL,
  Role VARCHAR(10) NOT NULL,
  City VARCHAR(15) NOT NULL,
  Country VARCHAR(15) NOT NULL,
  Postal_code VARCHAR(15) NOT NULL,
  Street TEXT NOT NULL,
  Floor INT NOT NULL,
  Door INT NOT NULL,
  PRIMARY KEY (Users_id)
);

CREATE TABLE IF NOT EXISTS Orders
(
  Order_date DATE NOT NULL,
  Order_time TIME NOT NULL,
  Users_id INT NOT NULL,
  Sneaker_id INT NOT NULL,
  Price FLOAT NOT NULL,
  PRIMARY KEY (Users_id, Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id)
);

CREATE TABLE IF NOT EXISTS FavoriteSneakers
(
  Users_id INT NOT NULL,
  Sneaker_id INT NOT NULL,
  PRIMARY KEY (Users_id, Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id)
);

CREATE TABLE IF NOT EXISTS Ratings
(
  Rating INT NOT NULL,
  Users_id INT NOT NULL,
  Sneaker_id INT NOT NULL,
  PRIMARY KEY (Users_id, Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id)
);

CREATE TABLE IF NOT EXISTS Comments
(
  Comment TEXT NOT NULL,
  Users_id INT NOT NULL,
  Sneaker_id INT NOT NULL,
  PRIMARY KEY (Users_id, Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id)
);

CREATE TABLE IF NOT EXISTS Sales
(
  Sneaker_id INT NOT NULL,
  Users_id INT NOT NULL,
  Price FLOAT NOT NULL,
  Size INT NOT NULL,
  PRIMARY KEY (Sneaker_id, Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id)
);