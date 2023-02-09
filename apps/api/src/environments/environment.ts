export const environment = {
  production: false,
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'weborders',
  },
  auth: {
    secret: 'dev123',
  },
  admin: {
    email: 'admin@test.com',
    password: 'admin',
  },
};
