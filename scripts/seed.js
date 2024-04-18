const { db } = require('@vercel/postgres');
const {
  users,
  tickets,
  comments,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    // const createTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS users (
    //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     email TEXT NOT NULL UNIQUE,
    //     password TEXT NOT NULL
    //     isadmin boolean
    //   );
    // `;

    // console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, isadmin)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.isadmin})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      // createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedTickets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "tickets" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    status VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    email VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "tickets" table`);

    // Insert data into the "tickets" table
    const insertedTickets = await Promise.all(
      tickets.map(
        (ticket) => client.sql`
        INSERT INTO tickets (customer_id, status, create_date, last_updated, email, title, description)
        VALUES (${ticket.customer_id}, ${ticket.status}, ${ticket.create_date}, ${ticket.last_updated},
        ${ticket.email}, ${ticket.title}, ${ticket.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTickets.length} tickets`);

    return {
      createTable,
      tickets: insertedTickets,
    };
  } catch (error) {
    console.error('Error seeding tickets:', error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "comments" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID references tickets(id),
    customer_id UUID NOT NULL,
    create_date TIMESTAMP NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    description VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "comments" table`);

    // Insert data into the "comments" table
    const insertedComments = await Promise.all(
      comments.map(
        (ticket) => client.sql`
        INSERT INTO tickets (customer_id, status, create_date, last_updated, email, title, description)
        VALUES (${ticket.customer_id}, ${ticket.status}, ${ticket.create_date}, ${ticket.last_updated},
        ${ticket.email}, ${ticket.title}, ${ticket.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTickets.length} tickets`);

    return {
      createTable,
      tickets: insertedTickets,
    };
  } catch (error) {
    console.error('Error seeding tickets:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  // await seedTickets(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
