import { prisma } from "./context";
import { faker } from '@faker-js/faker';
import { hash } from "bcrypt";

async function main() {

    const numberOfUsers = 1000
    const numberOfCategories = 100
    const numberOfPosts = 10000

    // Creating users
    for (let i = 0; i < numberOfUsers; i++) {
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

    // Creating categories
    const categories = new Set<string>();
    while (categories.size < numberOfCategories) {
        const category = faker.word.noun();
        categories.add(category.charAt(0).toUpperCase() + category.slice(1));
    }
    for (const categoryName of categories) {
        await prisma.category.create({
            data: {
                name: categoryName
            }
        });
    }
    console.log('Categories created');

    // Get all users and categories for reference
    const users = await prisma.user.findMany();
    const createdCategories = await prisma.category.findMany();

    // Creating posts
    for (let i = 0; i < numberOfPosts; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const visibility = Math.random() < 0.5 ? "PUBLIC" : "PRIVATE";
        const randomCategories = createdCategories
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 categories per post
        await prisma.post.create({
            data: {
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraphs(),
                thumbnail: faker.image.url(),
                authorId: randomUser.id,
                visibility: visibility,
                categories: {
                    connect: randomCategories.map(cat => ({ id: cat.id }))
                }
            }
        });
    }
    console.log('Posts created');
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
