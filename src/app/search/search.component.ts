import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  mysearchText?:string;
  constructor(){}

  @Output()

  sendToParent:EventEmitter<string>=new EventEmitter<string>();
  
  searchData(){
    this.sendToParent.emit(this.mysearchText);
  }

  cleardata() {
    this.sendToParent.emit(''); 
  }

}
