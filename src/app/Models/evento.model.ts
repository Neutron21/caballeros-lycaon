export class Evento{
    constructor(public type: string,
                public fecha: string,
                public ciudad: string,
                public lugar: string,
                public presupuesto: number,
                public distancia: number,
                public url: string
                ){}
}