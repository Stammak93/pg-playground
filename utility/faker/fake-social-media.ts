import { faker } from "@faker-js/faker";

const createUsersTable = () => {

    return (
        `CREATE TABLE fake_users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(70),
            country VARCHAR(30),
            city VARCHAR(30),
            job_title VARCHAR(50)
        );\n`
    )
};

const createPostsTable = () => {

    return (
        `CREATE TABLE fake_posts (
            id SERIAL PRIMARY KEY,
            content VARCHAR(250),
            image VARCHAR(80),
            user_id INTEGER REFERENCES fake_users(id)
        );\n`
    )
};

const createCommentsTable = () => {

    return (
        `CREATE TABLE fake_comments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES fake_users(id),
            comment_id INTEGER REFERENCES fake_comments(id),
            image_id INTEGER REFERENCES fake_posts(id)
        );\n`
    )
};