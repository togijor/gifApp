import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsvc:GifsService){}

  //esto es para obtener los datos gestionados en el html
  get historial(){
    return this.gifsvc.historial;
  }
  //con este metodo lo que se genera es que al momento de hacer click a
  //un termino ya buscado se vuelva a cargar la informacion referente
  buscar(termino : string){
    this.gifsvc.buscargifs(termino)

  }
}
