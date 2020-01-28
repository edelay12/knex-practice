require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./articleservice')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.TEST_DB_URL,
})

console.log(ArticlesService.getAllArticles())