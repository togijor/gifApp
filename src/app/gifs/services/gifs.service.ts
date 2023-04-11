import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Searchgifresponse } from '../interface/interfaces';
import { Gif } from '../interface/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  //esta es la key que entrega la pagina para poder gestionar el consumo de la api
  private apikey = 'WQMqnzzh4NHxK8RgxwYjcna1HqjdgNFN';
  private serviciourl = 'http://api.giphy.com/v1/gifs';

  constructor(private http : HttpClient) {
    //esto es para guardar el historial que ingresa el usuario por
    //pantalla y poder tener informacion de manera persistente.
    //con el signo de exclamacion uno asegura de que la informacion sea un any

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) ||[];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) ||[];
  }

  private _historial : string[] =[]

  get historial(){

    return[...this._historial]
  }



  public resultados : Gif []=[];

  buscargifs(query : string){
    //esto es para que borre los espacios en blanco con trim() y los guarde todo en minuscula con toLowerCase()
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      //el metodo unshift es para guardar datos de manera invertida
      this._historial.unshift(query);

      //esto es solo para manterner en la busqueda solo una cantidad limitada de
      //acciones que ingresa el usuario en busqueda

      this._historial = this._historial.splice(0,9)
      //esto es para guardar los datos ingresados por el usuario en el
      //localstorage del navegador
      localStorage.setItem('historial',JSON.stringify(this._historial))

    }
    // con el httpParams puede hacer atajos mas directos y asi evitar crear una url mas larga
    //serviciourl esta declarado como una constante ya que es un valor inmutable durante la ejecucion
    const Parametros = new HttpParams()
    .set( 'apikey',this.apikey)
    .set('limit','10')
    .set('q','query')


    this.http.get<Searchgifresponse>(`${this.serviciourl}/search`,{params:Parametros})
    .subscribe( (resp:any) => {
      //console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultado',JSON.stringify(this.resultados));
    });

  }

}
