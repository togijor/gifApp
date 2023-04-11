import { Component,ElementRef,ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  constructor (private gifsvc:GifsService ){

  }

  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;



  buscar(){

    const valor =this.txtbuscar.nativeElement.value;

    if(valor.trim().length===0){
      return;
    }

    this.gifsvc.buscargifs(valor);

    this.txtbuscar.nativeElement.value = " ";

  }
}


