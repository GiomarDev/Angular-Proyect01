import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: actorDTO= {
    nombre: 'Giomar',
    fechaNacimiento: new Date(),
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chris_Evans_SDCC_2014.jpg/1200px-Chris_Evans_SDCC_2014.jpg'
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //alert(params.id);
    });
  }

  guardarCambios(actor: actorCreacionDTO){
    console.log(actor);
  }

}
