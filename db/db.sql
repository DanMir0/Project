create table counterparties
(
    id           INTEGER not null
        primary key autoincrement
        unique,
    name         TEXT    not null
        unique,
    contact_info text    not null,
    address      text    not null,
    inn          integer not null
);

create unique index counterparties_contact_info_uindex
    on counterparties (contact_info);

create unique index counterparties_inn_uindex
    on counterparties (inn);

create table document_types
(
    id   INTEGER not null
        primary key autoincrement
        unique,
    name TEXT    not null
        unique
);

create table documents
(
    id               INTEGER not null
        primary key autoincrement
        unique,
    document_type_id INTEGER not null
        references document_types,
    implementation   TEXT    not null,
    counterparty_id  INTEGER not null
        references counterparties
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
        references counterparties
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
        references documents,
    product_id  INTEGER not null
        references products,
    amount      REAL    not null
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
        references products
);

create table orders_tech_cards
(
    id           INTEGER not null
        primary key autoincrement
        unique,
    order_id     INTEGER not null
        references orders,
    tech_card_id INTEGER not null
        constraint production_orders_technical_cards_technical_cards_id_fk
            references tech_cards,
    amount       text    not null
);

create unique index orders_tech_cards_order_id_tech_card_id_uindex
    on orders_tech_cards (order_id, tech_card_id);

create table tech_cards_products
(
    id           integer not null
        constraint tech_cards_products_pk
            primary key autoincrement,
    product_id   integer not null
        references products,
    tech_card_id integer not null
        references tech_cards,
    amount       real    not null
);

create unique index tech_cards_products_product_id_tech_card_id_uindex
    on tech_cards_products (product_id, tech_card_id);

create unique index tech_cards_products_tech_card_id_product_id_uindex
    on tech_cards_products (tech_card_id, product_id);

INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (1, 'ООО "ЕССО-Технолоджи"', '7 (8352) 62-38-81', 'г. Чебоксары, К. Маркса, дом 52, корпус 8', 7805716417);
INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (2, 'ООО "ЭЛЕКТРОЗАПЧАСТЬ"', '7 (985) 773-48-26', 'г. Москва, пер Погорельский, 6', 7706615785);
INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (3, 'ООО "Промтехматериалы"', '7 (999) 077-27-44', 'г. Москва, ул Ташкентская, д 28', 9723030130);
INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (4, 'ООО "Компания UNICUM"', '7 (343) 372-73-58', 'г. Екатеринбург, ул Чкалова, дом 250', 3706019489);
INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (5, 'ООО "Вертекс"', '7 (34147) 442-99', 'г. Сарапул, Гагарина , дом 55', 6670312310);
INSERT INTO counterparties (id, name, contact_info, address, inn) VALUES (6, 'ООО "Электро-Юг"', '7 (863) 232-79-39', 'г. Ростов-на-Дону, пер. Семашко , дом 117, корпус А', 6454108447);

INSERT INTO document_types (id, name) VALUES (1, 'Отгрузка');
INSERT INTO document_types (id, name) VALUES (2, 'Заказ на производство');
INSERT INTO document_types (id, name) VALUES (3, 'Приемка');

INSERT INTO measuring_units (id, name) VALUES (1, 'кг');
INSERT INTO measuring_units (id, name) VALUES (2, 'л');
INSERT INTO measuring_units (id, name) VALUES (3, 'м');
INSERT INTO measuring_units (id, name) VALUES (4, 'шт');

INSERT INTO products (id, name, measuring_unit_id) VALUES (1, 'Масло', 2);
INSERT INTO products (id, name, measuring_unit_id) VALUES (2, 'Металл', 1);
INSERT INTO products (id, name, measuring_unit_id) VALUES (3, 'Трансформатор', 4);

