module.exports = {
  async up(db, callback) {
    return db.collection('login-users').insertOne(
      {
        username: 'desafiosharenergy',
        password: '92305f21d8281ac002904977d84c0b2a',
      },
      { $set: { blacklisted: true } },
      callback
    );
  },

  async down(db, _client) {
    return await db.dropDatabase();
  },
};
