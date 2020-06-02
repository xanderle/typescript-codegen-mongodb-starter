const typedefs = `type User @entity {
    id: Int! @id
    firstName: String! @column
    lastName: String! @column

    }

    type Query @entity {
    user: User @link
    }

    schema {
    query: Query
    }`

export default typedefs