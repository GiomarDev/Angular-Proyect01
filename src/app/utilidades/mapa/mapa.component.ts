import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, icon } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  @Input()
  soloLectura: boolean = false;

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor =>
      {
        let marcardor = marker([valor.latitud, valor.longitud])
        
        if(valor.mensaje){
          marcardor.bindPopup(valor.mensaje, {autoClose: false, autoPan: false})
        }

        return marcardor
      });
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 18,
    center: latLng(-12.011955100275483, -437.0815479757338)
  };
  
  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){

    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      
      this.capas = [];
      this.capas.push(marker([latitud, longitud], {
        icon: icon({
          iconSize: [25,41],
          iconAnchor: [13,41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
          })
      }));
      
      this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud});
    }

  }
}
