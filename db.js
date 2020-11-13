const knex = require('knex')

try {
  var db = knex({
    client: 'pg',
    connection:
      process.env.DATABASE_URL ||
      'postgres://admin:helloworld@127.0.0.1:5432/face_reco',
  })
} catch (err) {
  console.error(err)
}
db.select()
  .from('login')
  .then((rows) => {
    console.log('Table login exists.')
  })
  .catch((err) => {
    console.error('message:', err.message, 'code: ', err.code)
    if (err.message.match(/relation ".*" does not exist/g)) {
      db.schema
        .createTable('login', (table) => {
          table.string('email')
          table.string('hash')
        })
        .then(() => {
          console.log('Table login created')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
  .then(() => {
    db.select()
      .from('users')
      .then((rows) => {
        console.log('Table users exists')
      })
      .catch((err) => {
        console.error('message:', err.message, 'code: ', err.code)
        if (err.message.match(/relation ".*" does not exist/g)) {
          db.schema
            .createTable('users', (table) => {
              table.string('email')
              table.string('name')
              table.string('joined')
              table.integer('entries')
            })
            .then(() => {
              console.log('Table users created')
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
  })

module.exports = db
