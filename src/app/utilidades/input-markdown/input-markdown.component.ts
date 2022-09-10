import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  
  @Input()
  contenidoMarkDown = '';
  @Input()
  placeHolderTextArea: string ='Texto';
  
  @Output()
  cambioMarkDown: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
  }

}
