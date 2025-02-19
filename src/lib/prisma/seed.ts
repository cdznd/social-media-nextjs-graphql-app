import { prisma } from "./context";
import { faker } from '@faker-js/faker';
import { hash } from "bcrypt";

async function main() {

    // Creating users
    for (let i = 0; i < 10; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const hashedPassword = await hash('password123', 10);
        await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email: faker.internet.email({ firstName, lastName }),
                username: faker.internet.userName({ firstName, lastName }),
                password: hashedPassword,
                image: faker.image.avatar(),
                emailVerified: faker.date.past(),
            }
        })
    }
    console.log('Users created');

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
