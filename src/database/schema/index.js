import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 2,
    tables: [
        tableSchema(
            {
                name: 'Usuario',
                columns: [
                    { name: 'nome', type: 'string' },
                    { name: 'bloqueioApp', type: 'boolean', isOptional: true }
                ]
            }
        ),
        tableSchema(
            {
                name: 'Categoria',
                columns: [
                    { name: 'titulo', type: 'string' },
                    { name: 'tipo', type: 'number' },
                    { name: 'metaMensal', type: 'number' },
                    { name: 'corDestaque', type: 'string' }
                ]
            }
        )
    ]
})