const ShoppingService = require('../src/shopping-list-service')
 const knex = require('knex')
 require('dotenv').config()

 describe(`Shopping-list service object`, function() {
    let db
    let list = [
          {
           id: 1,
           name: "first post",
            price: 11,
            date_added:  new Date('2029-01-22T16:28:32.615Z'),
            category : 'grocery'
          },
          {
            id: 2,
            name: "first post",
             price: 11,
             date_added:  new Date('2029-01-22T16:28:32.615Z'),
             category : 'grocery'
         },
          {
           id: 3,
           name: "first post",
             price: 11,
             date_added:  new Date('2029-01-22T16:28:32.615Z'),
             category : 'grocery'
          },
        ]

        before(() => {
            db = knex({
              client: 'pg',
              connection: process.env.DB_URL,
             })
           })

           before(() => {
            return db
            .into('shopping_list')
            .insert(list)
            })

            after(() => db.destroy())
            before(() => db('shopping_list').truncate())
            afterEach(() => db('shopping_list').truncate())

            describe('getList()' , () => {
                context('Given shopping_list has data' , () => {
                    beforeEach(() => {
                        return db
                        .into('shopping_list')
                        .insert(list)
                    })
                it(`getAllArticles() resolves all articles from 'shopping_list' table`, )
                return ArticlesService.getAllArticles(db)
                .then(actual => {
                 expect(actual).to.eql(testArticles.map(article => ({
                              ...article,
                              date_published: new Date(article.date_published)
                            })))          
                }) 
              
            })
            it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
                const thirdId = 3
                const thirdTestArticle = testArticles[thirdId - 1]
                return ShoppingService.getById(db, thirdId)
                  .then(actual => {
                    expect(actual).to.eql({
                      id: thirdId,
                      title: thirdTestArticle.title,
                      content: thirdTestArticle.content,
                      date_published: thirdTestArticle.date_published,
                    })
                  })

                 
              })
              it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
                const idOfItemToUpdate = 3
                const newItemData = {
                  title: 'updated title',
                  price: 3.25,
                  date_added: new Date(),
                }
                return ShoppingService.updateArticle(db, idOfItemToUpdate, newItemData)
                  .then(() => ShoppingService.getById(db, idOfItemToUpdate))
                  .then(item => {
                    expect(item).to.eql({
                      id: idOfItemToUpdate,
                      ...newItemData,
                    })
                  })
              })
            context(`Given 'shopping_list' has no data`, () => {
                it(`getList() resolves an empty array`, () => {
                    return ShoppingService.getList(db)
                       .then(actual => {
                        expect(actual).to.eql([])
                               })
                           })
                         })











 });
