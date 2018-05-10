import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { link } from './model/link.model';

@Injectable()
export class ElectronService {

  constructor(private http: HttpClient) { }

  getLinks(query) {
    let body = { query: query };
    return this.http.post('http://localhost:3000/api/query', body);
  }

  fetchLink(link) {
    return this.http.post('http://localhost:3000/api/query/link', link);
  }

  playLink(url) {
    return this.http.post('http://localhost:3000/api/play', { url: url });
  }
}
