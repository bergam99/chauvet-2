DROP TABLE IF EXISTS Orders CASCADE; 
DROP TABLE IF EXISTS UserAddresses CASCADE; 
DROP TABLE IF EXISTS Users CASCADE; 

CREATE TABLE Users (
    _id SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE UserAddresses (
    _id SERIAL PRIMARY KEY, 
    localId VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES Users(_id)
);

CREATE TABLE Orders (
    _id SERIAL PRIMARY KEY, 
    userId INT NOT NULL,
    shippingAddress VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL,
    amountPaid FLOAT NOT NULL,
    created INT NOT NULL,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users(_id),
    CONSTRAINT fk_shippingAddress FOREIGN KEY (shippingAddress) REFERENCES UserAddresses(localId)
    -- shippingAddress is ForeignKey named "fk_shippingAddress" in Orders table 
    -- that references localId from UserAddresses table.
);

INSERT INTO Users (email, name) VALUES
('user1.com', 'user1'),
('user2.com', 'user2'),
('user3.com', 'user3'),

SELECT * FROM Orders JOIN UserAddresses ON Orders.shippingAddress = UserAddresses.localId JOIN Users ON Orders.userId = Users._id;

