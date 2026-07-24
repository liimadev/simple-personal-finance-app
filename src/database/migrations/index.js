import { addColumns, createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                addColumns({
                    table: 'Usuario',
                    columns: [
                        { 
                            name: 'bloqueioApp', 
                            type: 'boolean', 
                            isOptional: true
                        }
                    ]
                }),

                createTable({
                    name: 'Categoria',
                    columns: [
                        { name: 'titulo', type: 'string' },
                        { name: 'tipo', type: 'number' },
                        { name: 'metaMensal', type: 'number' },
                        { name: 'corDestaque', type: 'string' }
                    ]
                })
            ]
        }
    ]
})