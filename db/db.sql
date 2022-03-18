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
    amount      TEXT    not null
);

create table tech_cards
(
    id         INTEGER not null
        unique,
    name       TEXT    not null
        unique,
    product_id INTEGER not null
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
            references tech_cards (id),
    amount       text    not null
);


