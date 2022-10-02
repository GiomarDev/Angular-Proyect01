import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maximoRating = 5;
  @Input()
  ratingSelect = 0;
  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  maximoRatingArr = [];
  votado = false;
  ratingAnterior;

  constructor(private seguridadServices: SeguridadService) { }

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
  }

  manejarMouse(index: number):void {
    this.ratingSelect = index + 1;
  }

  manejarMouseLeave(){
    if(this.ratingAnterior !== 0){
      this.ratingSelect = this.ratingAnterior;
    }else{
      this.ratingSelect = 0;
    }
  }

  rate(index: number): void{
    if(this.seguridadServices.estaLogeado() == true){
      this.ratingSelect = index + 1;
      this.votado = true;
      this.ratingAnterior = this.ratingSelect;
      this.rated.emit(this.ratingSelect);  
    }
    else{
      Swal.fire('Debe logearse', 'No puede realizar esta accion', 'error');
    }
  }
}
