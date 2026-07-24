import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

export default class Usuario extends Model {
    static table = 'Usuario'

    @field('nome') nome
    @field('bloqueioApp') bloqueioApp
}