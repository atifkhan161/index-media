import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(video: any, args?: any): any {
    let url = video.title ? video.title : video.href;
    return decodeURIComponent(url);
  }

}
