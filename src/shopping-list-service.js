const ShoppingService = {
    getList(knex){
    return console.log('Shopping List')
    },
    insertItem(knex, newItem){
    return knex
        .insert(newItem)
        .into('shopping_list')
        .returning('*')
        .then(rows => {
            return rows[0];
        })
    
    },
    getById(knex, id){
        return knex.from('shopping_list').select('*').where('id' , id).first()
    },

    deleteItem(knex, id) {
        return knex('shopping_list')
        .where({ id })
        .delete()
    },
    updateItem(knex, id, newFields){
        return knex('shopping_list')
            .where({ id })
            .update({newFields})
    }

}

module.exports = ShoppingService