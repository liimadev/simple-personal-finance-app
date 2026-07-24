import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'
import migrations from './migrations'
import Usuario from './model/Usuario.js'
import { Database } from '@nozbe/watermelondb'
import Categoria from './model/Categoria.js'

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'sobrou_database'
})

export const database = new Database({
    adapter,
    modelClasses: [Usuario, Categoria]
})