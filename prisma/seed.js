const prisma = require("../api");
const seed = async (numAuthors = 20, booksPerAuthor = 3) => {
  //20 authors

  const createAuthorPromises = Array.from({ length: numAuthors }, (_, i) => {
    /*
    Array.from() is a quick way to create an array of a certain length
    and fill it with dynamically generated data.
  */
    const books = Array.from({ length: booksPerAuthor }, (_, j) => ({
      title: `Book ${i}${j}`,
    }));
    return prisma.author.create({
      data: {
        name: `Author ${i}`,
        books: {
          create: books,
        },
      },
    });
  });
  /*
    Promise.all allows us to start all the `create` requests
    at the same time, rather than waiting for each one to finish.
    We then wait for all of them to finish with `await`.
  */

  await Promise.all(createAuthorPromises);
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
