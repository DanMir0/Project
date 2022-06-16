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

create table counterparties
(
    id                 INTEGER not null
        primary key autoincrement
        unique,
    name               TEXT    not null
        unique,
    contact_info       text    not null,
    address            text    not null,
    inn                integer not null,
    contact_persons text not null,
    created_at         date default CURRENT_DATE not null,
    updated_at         date default CURRENT_DATE not null
);

create table document_types
(
    id     INTEGER not null
        primary key autoincrement
        unique,
    name   TEXT    not null
        unique,
    in_out text    not null
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
    created_at      date default CURRENT_DATE not null,
    updated_at      date default CURRENT_DATE not null,
    finished_at      date null
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
        references orders
            on delete cascade,
    created_at       date default CURRENT_DATE not null,
    updated_at       date default CURRENT_DATE not null
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
        references documents
            on delete cascade,
    product_id  INTEGER not null
        references products,
    quantity    REAL    not null
);

create unique index documents_products_document_id_product_id_uindex
    on documents_products (document_id, product_id);

create table settings
(
    key   text
        constraint settings_pk
            primary key,
    value text
);

create unique index settings_key_uindex
    on settings (key);

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
    created_at date default CURRENT_DATE not null,
    updated_at date default CURRENT_DATE not null
);

create table orders_tech_cards
(
    id           INTEGER not null
        primary key autoincrement
        unique,
    order_id     INTEGER not null
        references orders
            on delete cascade,
    tech_card_id INTEGER not null
        references tech_cards,
    quantity     integer not null
);

create unique index orders_tech_cards_order_id_tech_card_id_uindex
    on orders_tech_cards (order_id, tech_card_id);

create table tech_cards_products
(
    id           integer not null
        constraint tech_cards_products_pk
            primary key autoincrement,
    product_id   integer not null
        references products
            on delete cascade,
    tech_card_id integer not null
        references tech_cards
            on delete cascade,
    quantity     real    not null
);

create unique index tech_cards_products_product_id_tech_card_id_uindex
    on tech_cards_products (product_id, tech_card_id);

create unique index tech_cards_products_tech_card_id_product_id_uindex
    on tech_cards_products (tech_card_id, product_id);

INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (1, 'ООО "СЭЗ"', '+7 (835) 262-38-81', 'г. Москва, пер Погорельский, 6', 7706615785, 'Попова Софья Дмитриевна', '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (2, 'Производственные цех', '+7 (935) 262-38-82', 'г. Москва, пер Погорельский, 6', 7706615785, 'Николаев Михаил Романович', '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (3, 'ООО "Промтехматериалы"', '+7 (999) 077-27-44', 'г. Москва, ул Ташкентская, д 28', 9723030130, 'Марков Иван Олегович', '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (4, 'ООО "Компания UNICUM"', '+7 (343) 372-73-58', 'г. Екатеринбург, ул Чкалова, дом 250', 3706019489, 'Медведев Артемий Максимович', '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (5, 'ООО "Вертекс"', '+7 (341) 474-42-99', 'г. Сарапул, Гагарина , дом 55', 6670312310, 'Климова Варвара Богдановна', '2022-03-05', '2022-03-15');
INSERT INTO counterparties (id, name, contact_info, address, inn, contact_persons, created_at, updated_at) VALUES (6, 'ООО "Электро-Юг"', '+7 (863) 232-79-39', 'г. Ростов-на-Дону, пер. Семашко , дом 117, корпус А', 6454108447, 'Медведев Родион Филиппович', '2022-03-05', '2022-03-15');

INSERT INTO document_types (id, name, in_out) VALUES (1, 'Отгрузка', 'OUT');
INSERT INTO document_types (id, name, in_out) VALUES (2, 'Приемка', 'IN');

INSERT INTO measuring_units (id, name) VALUES (1, 'кг');
INSERT INTO measuring_units (id, name) VALUES (2, 'л');
INSERT INTO measuring_units (id, name) VALUES (3, 'м');
INSERT INTO measuring_units (id, name) VALUES (4, 'шт');

INSERT INTO products (id, name, measuring_unit_id) VALUES (1, 'Масло', 2);
INSERT INTO products (id, name, measuring_unit_id) VALUES (2, 'Металл', 1);
INSERT INTO products (id, name, measuring_unit_id) VALUES (3, 'Однофазный трансформатор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (4, 'Гайки', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (5, 'Болт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (6, 'Металлический сердечник', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (7, 'Катушки', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (8, 'Изолятор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (9, 'Радиаторы', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (10, 'Расширительный бак', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (11, 'Разъединитель контактной сети постоянного тока РКЖ-3,3/3000', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (12, 'Подвижный изолятор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (13, 'Дугогасящие рога', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (14, 'Главная токоведущая система', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (15, 'Неподвижный изолятор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (16, 'Болт заземления', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (17, 'Рама разъединителя', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (18, 'Рычаг', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (19, 'Упор ограничения поповорота вала', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (20, 'Вал', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (21, 'Пружина', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (22, 'Фарворовая тяга', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (23, 'Опорный изолятор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (24, 'Неподвижный контакт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (25, 'Подвижный контакт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (26, 'Разъединитель РВ-10', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (27, 'Крышка бака трансформатора', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (28, 'Шваллер', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (29, 'Разъединитель РНДЗ-2-100/2000', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (30, 'Заземляющие ножи', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (31, 'Главный нож с лопаткой', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (32, 'Главный нож с ламелями', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (33, 'Привод', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (34, 'Тяга к приводу', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (35, 'Трос', 3);
INSERT INTO products (id, name, measuring_unit_id) VALUES (36, 'Гирлянда изоляторов', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (37, 'Контактные наконечники', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (38, 'Телескопический заземлитель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (39, 'Контактное кольцо', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (40, 'Груз', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (41, 'Подвесной разъединитель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (42, 'Опора', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (43, 'Кронштейн', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (44, 'Крюковый болт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (45, 'Разъединитель постоянного тока на железобетонной опоре', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (46, 'Трехфазный трансформатор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (47, 'Магнитопровод', 3);
INSERT INTO products (id, name, measuring_unit_id) VALUES (48, 'Оботка высокого напряжения', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (49, 'Стальной бак', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (50, 'Переключатель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (51, 'Охлаждающие трубы', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (52, 'Измеритель уровня масла', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (53, 'Расширительный бачок', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (54, 'Двигатель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (55, 'Редуктор', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (56, 'Винт', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (57, 'Крепежа', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (58, 'Толкатель', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (59, 'Защитная трубка', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (60, 'Линейный привод', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (61, 'Выключатель нагрузки ВНП-10', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (62, 'Нож разъединителя', 4);
INSERT INTO products (id, name, measuring_unit_id) VALUES (63, 'Гасительня камера', 4);

INSERT INTO order_statuses (id, name) VALUES (1, 'новый');
INSERT INTO order_statuses (id, name) VALUES (2, 'в производстве');
INSERT INTO order_statuses (id, name) VALUES (3, 'готовый');
INSERT INTO order_statuses (id, name) VALUES (4, 'выдан');

INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (1,'Тех карта однофазный трансформатор',3,'2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (2,'Тех карта разъединитель РВ-10',26,'2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (3,'Тех карта разъединитель контактной сети постоянного тока РКЖ-3,3/3000',11,'2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (4,'Тех карта рамы разъединителя',17, '2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (5,'Тех карта разъединитель РНДЗ-2-100/2000',29,'2022-06-16','2022-06-16' );
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (6,'Тех карта подвесной разъединитель',41,'2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (7,'Тех карта разъединитель постоянного тока на железобетонной опоре',45,'2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (8,'Тех карта металлический сердечник',6, '2022-06-16','2022-06-16');
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (9,'Тех карта линейный привод',60,'2022-06-16','2022-06-16' );
INSERT INTO tech_cards (id, name, product_id, created_at, updated_at) VALUES (10,'Тех карта выключатель нагрузки ВНП-10',61, '2022-06-16','2022-06-16');

INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (1,10,1,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (2,8,1,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (3,6,1,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (4,9,1,4);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (5,7,1,4);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (6,27,1,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (7,17,2,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (8,19,2,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (9,18,2,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (10,25,2,6);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (11,21,2,12);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (12,22,2,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (13,24,2,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (14,23,2,6);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (15,16,2,6);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (16,13,3,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (17,12,3,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (18,15,3,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (19,14,3,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (20,28,4,4);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (21,17,5,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (22,23,5,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (23,32,5,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (24,31,5,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (25,30,5,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (26,33,5,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (27,34,5,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (28,35,6,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (29,36,6,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (30,37,6,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (31,21,6,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (32,40,6,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (33,39,6,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (34,38,6,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (35,23,6,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (36,42,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (37,43,7,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (38,18,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (39,12,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (40,13,7,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (41,15,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (42,20,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (43,17,7,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (44,44,7,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (45,4,4, 10);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (46,5,4,10);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (47,2,8,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (48,7,8,2);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (49,54,9,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (50,55,9, 1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (51,57,9,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (52,56,9,4);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (53,4,9,4);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (54,58,9,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (55,59,9, 1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (56,63,10,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (57,62,10,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (58,20,10,1);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (59,24,10, 3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (60,31,10,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (61,32,10,3);
INSERT INTO tech_cards_products (id, product_id, tech_card_id, quantity) VALUES (62,21,10,2);

INSERT INTO settings (key, value) VALUES ('CUSTOMER_ID','1');
INSERT INTO settings (key, value) VALUES ('PRODUCTION_HALL','2');
