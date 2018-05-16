import { Component, OnInit } from '@angular/core';
import { link } from '../model/link.model';
import { ElectronService } from '../electron-service.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { DataStore } from '../services/data.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  query: string;
  links: link[];
  bookmarks: link[];
  constructor(private _electronService: ElectronService, private dataService: DataService,
    private router: Router, private dataStore: DataStore) { }

  ngOnInit() {
    this.query = "";
    this.links = this.dataService.getLinks();
    this.bookmarks = this.dataStore.getBookmarks();
  }
  public search() {
    this._electronService.getLinks(this.query).subscribe((data: link[]) => {
      this.links = data;
      this.dataService.setLinks(this.links);
    });
  }

  public fetch(link: link) {
    this.router.navigate(['media', link]);
  }

  public removeBookmark(link: link) {
    this.dataStore.removeLink(link);
    this.bookmarks = this.dataStore.getBookmarks();
  }

  public clearBookmark() {
    this.dataStore.clearAll();
    this.bookmarks = [];
  }
}
