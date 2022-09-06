import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }
  contenidoMarkDown = '';


  ngOnInit(): void {
  }

  inputTextArea(texto: string){
    this.contenidoMarkDown = texto;
  }

}
