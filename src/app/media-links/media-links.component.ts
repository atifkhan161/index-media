import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { link, video } from '../model/link.model';
import { ElectronService } from '../electron-service.service';

@Component({
  selector: 'app-media-links',
  templateUrl: './media-links.component.html',
  styleUrls: ['./media-links.component.scss']
})
export class MediaLinksComponent implements OnInit {
  link: any;
  videos: video[];
  currentUrl: string;
  linksrc: string = "";
  linktype: string = "video/webm";

  @ViewChild ("player") player : ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, private _electronService: ElectronService) {
    this.route.params.subscribe(params => {
      if (params) {
        this.link = params;
        this.currentUrl = this.link.link;
        this._electronService.fetchLink(this.link).subscribe((data: video[]) => {
          this.videos = data;
        });
      }
    });
  }

  ngOnInit() {

  }

  play(video: video) {
    let url = this.currentUrl + video.href;
    this.linksrc = url;
    this.player.nativeElement.src = url;
    this.player.nativeElement.play();
    // this._electronService.playLink(url).subscribe((data) => {
    // });
  }
  browse(video: video) {
    let element = document.createElement("a");
    element.href = this.currentUrl + video.href;
    let url = this.currentUrl = element.href;
    let link = {link : url};

    this._electronService.fetchLink(link).subscribe((data: video[]) => {
      this.videos = data;
    });
  }

}
