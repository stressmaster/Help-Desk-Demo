// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-2003-4718-9855-fec4b6a6442a',
    name: 'TestUser',
    email: 'TestUser@getzealthy.com',
    password: 'zealthy',
    isadmin: false,
  }
  // {
  //   id: '410544b2-4001-4271-9855-fec4b6a6442a',
  //   name: 'User',
  //   email: 'user@nextmail.com',
  //   password: '123456',
  //   isadmin: false,
  // },
  // {
  //   id: '410544d2-3011-4231-9855-fed4b6a6442a',
  //   name: 'Admin',
  //   email: 'admin@nextmail.com',
  //   password: '123456',
  //   isadmin: true,
  // },
  // {
  //   id: '410544b2-4001-4271-9652-fce2b1c6442a',
  //   name: 'Daniel',
  //   email: 'daniel@nextmail.com',
  //   password: '123456',
  //   isadmin: false,
  // },
  // {
  //   id: '512344b2-2100-4271-9855-fec4b6a2442a',
  //   name: 'Zealthy',
  //   email: 'Zealthy@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: false,
  // },
  // {
  //   id: '512344c1-2100-4271-9855-fec4b6a2442a',
  //   name: 'ZealthyAdmin',
  //   email: 'ZealthyAdmin@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: true,
  // },
  // {
  //   id: '512312c4-3120-4271-9855-fec4b6a2442a',
  //   name: 'ZealthyAdmin2',
  //   email: 'ZealthyAdmin2@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: true,
  // },
  // {
  //   id: '512344c1-2300-4271-9945-fcb4b6a2442a',
  //   name: 'Kyle',
  //   email: 'Kyle@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: false,
  // },
  // {
  //   id: '512344c1-2341-3282-9945-fcb4b6a2442a',
  //   name: 'Brie',
  //   email: 'Brie@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: false,
  // },
  // {
  //   id: '512344c1-2300-4271-9945-fcd4b4b2342a',
  //   name: 'Shanti',
  //   email: 'Shanti@nextmail.com',
  //   password: 'zealthy',
  //   isadmin: false,
  // },
];

const date = new Date().toISOString().split('T')[0]
const tickets = [];

const comments = [];

module.exports = {
  users,
  tickets,
  comments,
};
