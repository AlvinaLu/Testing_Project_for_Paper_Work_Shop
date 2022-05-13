DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS orderr CASCADE;
DROP TABLE IF EXISTS order_item CASCADE;
DROP TABLE IF EXISTS payment CASCADE;



CREATE TABLE category
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description VARCHAR(512),
    name        VARCHAR(64)
);
CREATE TABLE address
(
    id_address INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       varchar(64),
    surname    varchar(64),
    number     varchar(15),
    city       VARCHAR(64)  NOT NULL,
    street     VARCHAR(128) NOT NULL,
    zip        CHAR(5)      NOT NULL
        CHECK ( zip ~ '[0-9][0-9][0-9][0-9][0-9]')
);
CREATE TABLE users
(
    id_user   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email     VARCHAR(64)  NOT NULL UNIQUE CHECK (email LIKE '%_@__%.__%'),
    firstname VARCHAR(128) NOT NULL,
    lastname  VARCHAR(128) NOT NULL,
    password  VARCHAR(64)  NOT NULL,
    admin     BOOLEAN DEFAULT false

);
CREATE TABLE item
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(128) NOT NULL,
    amount      INTEGER      NOT NULL,
    description VARCHAR(512),
    price       REAL         NOT NULL,
    state       VARCHAR(128),
    category_id INTEGER,
    CONSTRAINT item_category
        FOREIGN KEY (category_id) REFERENCES category (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE orderr
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    created     timestamp,
    ordermethod VARCHAR(128),
    orderStatus VARCHAR(128),
    address_id  INTEGER NOT NULL,
    CONSTRAINT user_id_address
        FOREIGN KEY (address_id) REFERENCES address (id_address)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT user_id_order
        FOREIGN KEY (customer_id) REFERENCES users (id_user)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);
CREATE TABLE order_item
(
    id       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id INTEGER,
    item_id  INTEGER,
    count    INTEGER,
    CONSTRAINT order_item_order FOREIGN KEY (order_id) references orderr (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT order_item_item FOREIGN KEY (item_id) references item (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE


);

CREATE TABLE payment
(
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    paid    BOOLEAN DEFAULT FALSE NOT NULL,
    order_id      INTEGER,
    paymentMethod VARCHAR(128),
    total         REAL                  NOT NULL,
    CONSTRAINT user_id_order
        FOREIGN KEY (order_id) REFERENCES orderr (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);


INSERT INTO category(description, name)
VALUES ('Pens', 'Pens');
INSERT INTO category(description, name)
VALUES ('Pencils', 'Pencils');
INSERT INTO category(description, name)
VALUES ('Writing Sets', 'Writing Sets');
INSERT INTO category(description, name)
VALUES ('Address Books', 'Address Books');
INSERT INTO category(description, name)
VALUES ('Paper & Envelopes', 'Paper & Envelopes');

INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Ombre Ballpoint Pens - Pack of 4', 50,
        'Look good and feel good with this stylish set of ombre ballpoint pens. Featuring a metal body with pen lid and clip, these pens write with ease and finesse.',
        8, 'CZE', 1);

INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Pastel highlighters - pack of 10', 50,
        'Pack of 10 pastel highlighters, ideal for work and revision. With two types of highlighter for every colour, you can decide whether to highlight or underline your work with the different pen nibs.',
        10, 'CZE', 1);

INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Slogan Mechanical Pens - Pack of 2', 50,
        'Equilibrium is a vibrant collection of powerful pieces designed to celebrate and promote unity, diversity and inclusivity. To support this, we are donating part of the proceeds from the collection to the charity CAMFED – Campaign for Female Education.',
        8, 'CZE', 1);

INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Cat Shaped Highlighters - Pack of 4', 50,
        'Pastel ink highlighters but make ''em fun. Featuring a chisel nib for precise highlighting, these cat highlighters are the purfect companions for your work.',
        4, 'CZE', 1);

INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Rose gold HB pencils - set of 5', 50,
        'Style up your stationery with this set of 5 HB pencils. In rose gold, they are both practical and pretty! Pencils are supplied in a handy zip-lock wallet. Set measures (approx) 53x210mm.',
        3, 'CZE', 2);
INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Cats Mini Fold & Send Letter Set', 50,
        'Our mini fold and send letters are unique to Paperchase and seeing how much you loved our previous designs we thought we''d bring it back for Cattitude! Fun and quirky, this booklet is filled with everything you need to send a quick note to a friend or family member.',
        5, 'CZE', 3);
INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Agenzio medium address book', 50,
        'This beautiful black, leather-look address book is embossed with ''Address book'' text making it a sleek and elegant way to keep track of addresses and numbers. It contains tabbed sections for every letter of the alphabet, each with 5 printed pages split into sections for your contacts. Finished with a ribbon page marker, it contains 84 sheets () in total. The Nitty Gritty Measures (approx) 155 x 13 x 225mm.',
        12, 'CZE', 4);
INSERT INTO item(name, amount, description, price, state, category_id)
VALUES ('Paperworks marble white A4 card - pack of 20', 50,
        'A pack of A4 card from our Paperworks collection featuring a beautiful marble-effect. The pack contains 20 A4 sheets of 200gsm card which is suitable for inkjet and laser printers so you can produce your own wedding stationery or give your personal documents a professional finish. Made from responsible sources, matching envelopes are available. Add it to your crafting toolkit today! Each sheet measures (approx) 210x300mm.',
        3, 'CZE', 5);

INSERT INTO users(email, firstname, lastname, password, admin)
values ('testNSS@gmail.com', 'testNSS', 'testNSS', '3bc0b85ff3c00ef6d818400847629189', true);
INSERT INTO users(email, firstname, lastname, password, admin)
values ('alvina@gmail.com', 'Alvina', 'alvina', '640afa65be5bfacffe4bc2e7516c1096', true)



