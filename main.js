const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const Champion = require('./Champion' )

const app = express()

//use
app.use(cors())

const schema = buildSchema(`
  type Query {
    language: String
    getChampions: [Champion]
    getChampionByName(name: String!): Champion
  }
  type Champion {
    name: String
    attackDamage: Float
  }
  type Mutation {
    updateAttackDamage(name: String!, attackDamage: Float): Champion
  }
`)

const rootValue = {
    language: () => 'GraphQL',
    
    getChampions: () => champions,
    
    getChampionByName: ({ name }) => {
        return champions.find(x => x.name === name)
    },

    updateAttackDamage: ({ name, attackDamage = 150 }) => {
        const champion = champions.find(x => x.name === name)
        champion.attackDamage = attackDamage
        return champion
    }
}

const champions = [
    new Champion('Ashe', 100),
    new Champion('Vayne', 200)
]

//api
app.use('/graphql', graphqlHTTP({
    rootValue, schema, graphiql: true
}))


//startServer
app.listen(4000, () => console.log('Listening on 4000'))