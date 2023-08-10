import bcrypt from "bcryptjs";

const users = [
    {
        name: "admin",
        email: "admin@test.com",
        password: bcrypt.hashSync("12345"),
        isAdmin: true
    },
    {
        name: "Ehsan Aryan",
        email: "ehsan@test.com",
        password: bcrypt.hashSync("12345"),
        isAdmin: false
    },
    {
        name: "User 2",
        email: "user2@example.com",
        password: bcrypt.hashSync("user2_1234"),
        isAdmin: false
    },
    {
        name: "User 3",
        "email": "user3@example.com",
        password: bcrypt.hashSync("user3_1234"),
        isAdmin: false
    }
]

export default users;