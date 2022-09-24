import { faker } from "@faker-js/faker";
import { REMOVE_FAKE_TABLES } from "../list-tables-query";

const createUsersTable = () => {

    return (
        `CREATE TABLE fake_users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(70),
            country VARCHAR(70),
            job_title VARCHAR(70)
        );\n`
    )
};

const createPostsTable = () => {

    return (
        `CREATE TABLE fake_posts (
            id SERIAL PRIMARY KEY,
            image VARCHAR(80),
            user_id INTEGER REFERENCES fake_users(id)
        );\n`
    )
};

const createCommentsTable = () => {

    return (
        `CREATE TABLE fake_comments (
            id SERIAL PRIMARY KEY,
            content VARCHAR(450),
            user_id INTEGER REFERENCES fake_users(id),
            image_id INTEGER REFERENCES fake_posts(id)
        );\n`
    )
};


const createFakeUserData = () => {

    let baseUserQuery = `INSERT INTO fake_users (
        first_name,
        last_name,
        email,
        country,
        job_title
    )\nVALUES `

    for (let i = 0; i < 700; i++) {
        let first_name = faker.name.firstName();
        let last_name = faker.name.lastName();
        let email = faker.internet.email(first_name);
        let country = faker.address.country();
        let job_title = faker.name.jobTitle();

        if(first_name.match(/\w+\'\w+/)) {
            first_name = first_name.split("'").join("''");
        }

        if(last_name.match(/\w+\'\w+/)) {
            last_name = last_name.split("'").join("''");
        }

        if(country.match(/\w+\'\w+/)) {
            country = country.split("'").join("''")
        }


        baseUserQuery += `('${first_name}','${last_name}', '${email}', '${country}', '${job_title}')`
        i < 699 ? baseUserQuery += ',' + '\n' : baseUserQuery += ';' + '\n'
    }

    return baseUserQuery;
};


const createFakePostData = () => {

    let basePostQuery = `INSERT INTO fake_posts (
        image,
        user_id
    )\nVALUES `

    for (let i = 0; i < 600; i++) {
        let image = faker.image.imageUrl();
        let user_id = faker.datatype.number({ min: 1, max: 450 });

        basePostQuery += `('${image}', ${user_id})`
        i < 599 ? basePostQuery += ',' + '\n' : basePostQuery += ';' + '\n'
    }

    return basePostQuery;
}

const createFakeCommentData = () => {
    let baseCommentQuery = `INSERT INTO fake_comments (
        content,
        user_id,
        image_id
    )\nVALUES `

    for (let i = 0; i < 700; i++) {
        let content = faker.lorem.paragraph();
        let user_id = faker.datatype.number({ min: 1, max: 450 });
        let image_id = faker.datatype.number({ min: 1, max: 400 });

        if(content.match(/\w+\'\w+/)) {
            content = content.split("'").join("''")
        }

        baseCommentQuery += `('${content}', ${user_id}, ${image_id})`
        i < 699 ? baseCommentQuery += ',' + '\n' : baseCommentQuery += ';'
    }

    return baseCommentQuery;
};


export const setupFakeSocialMedia = () => {

    let query = ``;
    query += REMOVE_FAKE_TABLES + '\n';
    query += createUsersTable();
    query += createPostsTable();
    query += createCommentsTable();

    query += createFakeUserData();
    query += createFakePostData();
    query += createFakeCommentData();

    return query;
}