import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.peliculasEnCines = [
      {
        titulo: "Spider-Man Far From Home",
        fecha: new Date(),
        precio: 240.400,
        poster: 'https://th.bing.com/th/id/R.8b0c3a2ab2c45316f9126630c14ea950?rik=ussqg6juzVz3Jw&pid=ImgRaw&r=0'
      },
      {
        titulo: "Moana",
        fecha: new Date('2022-12-12'),
        precio: 240.400,
        poster: 'https://th.bing.com/th/id/OIP.kW16bAVZpcoPDkqvCjWhvwHaE7?pid=ImgDet&rs=1'
      }
    ]
  }
  peliculasEnCines;
  peliculasProximosEstrenos = [
  ]

}
