import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router, private route: ActivatedRoute, private _electronService: ElectronService) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params) {
        this.link = params;
        this._electronService.fetchLink(this.link).subscribe((data: video[]) => {
          this.videos = data;
        });
      }
    });
  }

  ngOnInit() {
    
  }

  play(video: video) {
    let url = this.link.link + video.href;
    this._electronService.playLink(url).subscribe((data: video[]) => {
      this.videos = data;
    });
  }
  browse(video: video) {
    let url = this.link.link + video.href;
    let link = {link : url};

    this._electronService.fetchLink(link).subscribe((data: video[]) => {
    });
  }

}
