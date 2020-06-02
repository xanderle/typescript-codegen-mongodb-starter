// const MongoClient = require('mongodb').MongoClient

import { MongoClient, Collection } from "mongodb";
import { UserDbObject } from '../types'
MongoClient.connect('mongodb://localhost:27017/animals').then(
    client => {
        const db = client.db('star-wars-quotes')
        const MyCollection: Collection<UserDbObject> = db.collection<UserDbObject>(
            'users'
        );
    }
)


