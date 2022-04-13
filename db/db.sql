drop table documents_products;
drop table documents;
drop table document_types;
drop table orders_tech_cards;
drop table orders;
drop table counterparties;
drop table order_statuses;
drop table tech_cards_products;
drop table tech_cards;
drop table products;
drop table measuring_units;
drop table settings;

create table settings
(
    key   text
        constraint settings_pk
            primary key,
    value text
);

create unique index settings_key_uindex
    on settings (key);

create table counterparties
(
    id           INTEGER not null
        primary key autoincrement
        unique,
    name         TEXT    not null
        unique,
    contact_info text    not null,
    address      text    not null,
    inn          integer not null,
    created_at   date DEFAULT CURRENT_DATE not null,
    updated_at   date DEFAULT CURRENT_DATE not null
);

create table document_types
(
    id   INTEGER not null
        primary key autoincrement
        unique,
    name TEXT    not null
        unique,
    in_out text not null
);

create table measuring_units
(
    id   integer not null
        constraint measuring_units_pk
            primary key autoincrement,
    name text    not null
);

create unique index measuring_units_name_uindex
    on measuring_units (name);

create table order_statuses
(
    id   INTEGER not null
        primary key autoincrement
        unique,
    name TEXT    not null
        unique
);

create table orders
(
    id              INTEGER not null
        primary key autoincrement
        unique,
    order_status_id INTEGER not null
        references order_statuses,
    counterparty_id integer not null
        references counterparties,
    created_at   date DEFAULT CURRENT_DATE not null,
    updated_at   date DEFAULT CURRENT_DATE not null
);

create table documents
(
    id               INTEGER not null
        primary key autoincrement
        unique,
    document_type_id INTEGER not null
        references document_types,
    counterparty_id  INTEGER not null
        references counterparties,
    order_id         integer
        references orders,
    created_at   date DEFAULT CURRENT_DATE not null,
    updated_at   date DEFAULT CURRENT_DATE not null
);

create table products
(
    id                INTEGER not null
        primary key autoincrement
        unique,
    name              INTEGER not null
        unique,
    measuring_unit_id integer not null
        references measuring_units
);

create table documents_products
(
    id          INTEGER not null
        primary key autoincrement
        unique,
    document_id integer not null
        references documents on delete cascade,
    product_id  INTEGER not null
        references products,
    quantity    REAL    not null
);

create unique index documents_products_document_id_product_id_uindex
    on documents_products (document_id, product_id);

create table tech_cards
(
    id         INTEGER not null
        constraint tech_cards_pk
            primary key autoincrement
        unique,
    name       TEXT    not null
        unique,
    product_id integer not null
        references products,
    created_at   date DEFAULT CURRENT_DATE not null,
    updated_at   date DEFAULT CURRENT_DATE not null
);

create table orders_tech_cards
(
    id           INTEGER not null
        primary key autoincrement
        unique,
    order_id     INTEGER not null
        references orders on delete cascade,
    tech_card_id INTEGER not null
        references tech_cards,
    quantity     text    not null
);

create unique index orders_tech_cards_order_id_tech_card_id_uindex
    on orders_tech_cards (order_id, tech_card_id);

create table tech_cards_products
(
    id           integer not null
        constraint tech_cards_products_pk
            primary key autoincrement,
    product_id   integer not null
        references products on delete cascade,
    tech_card_id integer not null
        references tech_cards,
    quantity     real    not null
);

create unique index tech_cards_products_product_id_tech_card_id_uindex
    on tech_cards_products (product_id, tech_card_id);

create unique index tech_cards_products_tech_card_id_product_id_uindex
    on tech_cards_products (tech_card_id, product_id);

INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (1, 'ООО "ЕССО-Технолоджи"', '+7 (835) 262-38-81', 'г. Чебоксары, К. Маркса, дом 52, корпус 8', 7805716417, '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (2, 'ООО "ЭЛЕКТРОЗАПЧАСТЬ"', '+7 (985) 773-48-26', 'г. Москва, пер Погорельский, 6', 7706615785, '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (3, 'ООО "Промтехматериалы"', '+7 (999) 077-27-44', 'г. Москва, ул Ташкентская, д 28', 9723030130, '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (4, 'ООО "Компания UNICUM"', '+7 (343) 372-73-58', 'г. Екатеринбург, ул Чкалова, дом 250', 3706019489, '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (5, 'ООО "Вертекс"', '+7 (341) 474-42-99', 'г. Сарапул, Гагарина , дом 55', 6670312310, '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, created_at, updated_at) VALUES (6, 'ООО "Электро-Юг"', '+7 (863) 232-79-39', 'г. Ростов-на-Дону, пер. Семашко , дом 117, корпус А', 6454108447, '2022-03-05', '2022-03-15');

INSERT INTO document_types (id, name, in_out) VALUES (1, 'Отгрузка', 'OUT');
INSERT INTO document_types (id, name, in_out) VALUES (2, 'Приемка', 'IN');

INSERT INTO measuring_units (id, name) VALUES (1, 'кг');
INSERT INTO measuring_units (id, name) VALUES (2, 'л');
INSERT INTO measuring_units (id, name) VALUES (3, 'м');
INSERT INTO measuring_units (id, name) VALUES (4, 'шт');

INSERT INTO products (id, name, measuring_unit_id) VALUES (1, 'Масло', 2);
INSERT INTO products (id, name, measuring_unit_id) VALUES (2, 'Металл', 1);
INSERT INTO products (id, name, measuring_unit_id) VALUES (3, 'Однофазный трансформатор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (4, 'Пластмассовые щеки', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (5, 'Гайки', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (6, 'Болт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (7, 'Фарфоровые тяговые изоляторы', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (8, 'Заземлитель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (9, 'Алюминиевая труба', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (10, 'Алюминий', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (11, 'Гибкий проводник', 3);
INSERT INTO products (id, name, measuring_unit_id) VALUES (12, 'Металлический сердечник', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (13, 'Катушки', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (14, 'Шваллер', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (15, 'Рама разъединителя', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (16, 'Разъединитель', 4);

INSERT INTO order_statuses (id, name) VALUES (1, 'новый');
INSERT INTO order_statuses (id, name) VALUES (2, 'в производстве');
INSERT INTO order_statuses (id, name) VALUES (3, 'готовый');
INSERT INTO order_statuses (id, name) VALUES (4, 'выдан');

INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (1,'Тех карта однофазный трансформатор',3,'2022-04-05','2022-04-06');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (2,'Тех карта  заземлитель',8,'2022-04-06','2022-04-06');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (3, 'Тех карта рамы разъединителя',15,'2022-04-06','2022-04-06');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (4,'Тех карта разъединителя',16,'2022-04-06','2022-04-06');

INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (1,13,1,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (2,12,1,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (3,9,2,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (4,14,3,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (5,15,4,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (6,8,4,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (7,7,4,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (8,6,4,28);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (9,5,4,28);

INSERT INTO settings (key, value) VALUES ('CUSTOMER_ID','1');
INSERT INTO settings (key, value) VALUES ('LANG','RU');





