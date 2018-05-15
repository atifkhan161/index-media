import { Injectable } from '@angular/core';

@Injectable() 
export class DataService {
  links: string;

  getLinks() : any {
      return this.links;
  }
  setLinks(links) {
      this.links = links;
  }

}