require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client : 'pg',
    connection: process.env.DB_URL
})
const ourTable = 'shopping_list'
const searchTerm = 'snack'
knexInstance.from('shopping_list').select('*').then(res => {console.log(res)});


//selet from all text
knexInstance.select('*').from(ourTable)
.where('name', 'ILIKE', `%${searchTerm}%`).then(result => {console.log(result)});

//get all items paginated

function pagniateTable(page) {
    const productsPerPage = 6;
    const offset = productsPerPage * (page - 1)
    knexInstance
    .select('item_key', 'name', 'price', 'category')
    .from(ourTable)
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {console.log(result)});
}

pagniateTable(2);

//list items after data
function afterDate(daysAgo) {
knexInstance
.select('item_key', 'name', 'price', 'category')
.from(ourTable)
.where('date_added', 
'>',
knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
.then(result => {console.log(result)});

}
afterDate(3)
//total cost

function getTotal(){
    knexInstance
    .select('category')
      .from(ourTable)
      .sum('price as total')
      .groupBy('category')
      .then(result => {
          console.log('Total cost per category') 
            console.log(result)
    })
}
getTotal();