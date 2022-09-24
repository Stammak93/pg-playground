import { faker } from "@faker-js/faker";
import { REMOVE_FAKE_TABLES } from "../list-tables-query";

const createProductsTable = () => {

    return (
        `CREATE TABLE fake_products (
            id SERIAL PRIMARY KEY,
            department VARCHAR(50),
            name VARCHAR(70),
            price REAL,
            weight REAL
        );\n`
    )
};

const createUsersTable = () => {

    return (
        `CREATE TABLE fake_users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(80),
            last_name VARCHAR(80)
        );\n`
    )
};

const createOrdersTable = () => {

    return (
        `CREATE TABLE fake_orders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES fake_users(id),
            product_id INTEGER REFERENCES fake_products(id),
            paid BOOLEAN
        );\n`
    )
};

const generateFakeUserData = () => {

    let userBaseQuery = `INSERT INTO fake_users (
        first_name,
        last_name
    )\nVALUES `

    for (let i = 0; i < 700; i++) {
        let first_name = faker.name.firstName();
        let last_name = faker.name.lastName();

        if(first_name.match(/\w+\'\w+/)) {
            first_name = first_name.split("'").join("''");
        }

        if(last_name.match(/\w+\'\w+/)) {
            last_name = last_name.split("'").join("''");
        }

        userBaseQuery += `('${first_name}','${last_name}')`
        i < 699 ? userBaseQuery += `,\n` : userBaseQuery += `;\n`
    }

    return userBaseQuery;
};

const generateFakeOrderData = () => {

    let orderBaseQuery = `INSERT INTO fake_orders (
        user_id,
        product_id,
        paid
    )\nVALUES `

    for (let i = 0; i < 500; i++) {
        let product_id = faker.datatype.number({min: 1, max: 400 });
        let user_id = faker.datatype.number({min: 1, max: 500 });
        let paid = faker.datatype.boolean();

        orderBaseQuery += `(${user_id},${product_id},${paid})`
        i < 499 ? orderBaseQuery += `,\n` : orderBaseQuery += `;\n`
    }

    return orderBaseQuery;
}


const generateFakeProductData = () => {

    let productBaseQuery = `INSERT INTO fake_products (
        department,
        name,
        price,
        weight
        )\nVALUES `

    for (let i = 0; i < 1000; i++) {
        let department = faker.commerce.department();
        let name = faker.commerce.productName();
        let price = faker.commerce.price(1,50);
        let weight = faker.commerce.price(1,4);

        productBaseQuery += `('${department}','${name}',${price},${weight})`
        i < 999 ? productBaseQuery += `,\n` : productBaseQuery += `;\n`
    }
    
    return productBaseQuery;
};


export const setupFakeStore = () => {

    let query = ``;

    query += REMOVE_FAKE_TABLES + '\n';

    query += createUsersTable();
    query += createProductsTable();
    query += createOrdersTable();


    query += generateFakeUserData();
    query += generateFakeProductData();
    query += generateFakeOrderData();

    return query;
};