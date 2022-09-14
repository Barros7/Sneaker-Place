CREATE TABLE IF NOT EXISTS SneakerModels
(
  Model_id INT NOT NULL,
  Model VARCHAR(32) NOT NULL,
  PRIMARY KEY (Model_id)
);

CREATE TABLE IF NOT EXISTS Sneakers
(
  Sneaker_id INT NOT NULL,
  Brand VARCHAR(32) NOT NULL,
  Price FLOAT NOT NULL,
  Size FLOAT NOT NULL,
  Color VARCHAR(32) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  Model_id INT NOT NULL,
  Description VARCHAR(300) NOT NULL,
  PRIMARY KEY (Sneaker_id),
  FOREIGN KEY (Model_id) REFERENCES SneakerModels(Model_id)
);


CREATE TABLE IF NOT EXISTS Users
(
  Users_id INT NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(32) NOT NULL,
  Name VARCHAR(32) NOT NULL,
  Last_name VARCHAR(32) NOT NULL,
  Rule BOOL NOT NULL,
  City VARCHAR(50) NOT NULL,
  Country INT NOT NULL,
  Postal_code VARCHAR(32) NOT NULL,
  Street VARCHAR(32) NOT NULL,
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
  Comment VARCHAR(300) NOT NULL,
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
  PRIMARY KEY (Sneaker_id, Users_id),
  FOREIGN KEY (Sneaker_id) REFERENCES Sneakers(Sneaker_id),
  FOREIGN KEY (Users_id) REFERENCES Users(Users_id)
);