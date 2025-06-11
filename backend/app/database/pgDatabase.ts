import { Client } from 'pg'

const pgDatabase = new Client ({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'm1gu3l4543',
    database: 'gestion'
})

pgDatabase.connect()
export default pgDatabase;