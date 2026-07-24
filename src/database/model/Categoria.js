import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Categoria extends Model {
    static table = 'Categoria'

    @field('titulo') titulo
    @field('tipo') tipo
    @field('metaMensal') metaMensal
    @field('corDestaque') corDestaque
}