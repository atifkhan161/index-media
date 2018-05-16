import { Injectable } from '@angular/core';

@Injectable()
export class DataStore {
    myStorage: any = window.localStorage;

    getBookmarks(): any {
        let db: Object = JSON.parse(this.myStorage.getItem("IndexMedia"));
        if (db) {
            return db["bookmarks"];
        }
        else {
            let seedData = JSON.stringify({ "bookmarks": [] });
            this.myStorage.setItem("IndexMedia", seedData);
            return [];
        }
    }
    saveLink(item) {
        let db: Object = JSON.parse(this.myStorage.getItem("IndexMedia"));
        let bookmarks: Array<Object> = db["bookmarks"];
        bookmarks.push(item);
        this.myStorage.setItem("IndexMedia", JSON.stringify(db));
    }

    removeLink(item) {
        let db: Object = JSON.parse(this.myStorage.getItem("IndexMedia"));
        let bookmarks: Array<Object> = db["bookmarks"];
        bookmarks = bookmarks.filter((link :  any) => {
            return link.link != item.link;
        });
        db["bookmarks"] = bookmarks;
        this.myStorage.setItem("IndexMedia", JSON.stringify(db));
    }

    clearAll() {
        let db: Object = JSON.parse(this.myStorage.getItem("IndexMedia"));
        let seedData = JSON.stringify({ "bookmarks": [] });
        this.myStorage.setItem("IndexMedia", seedData);
    }

    isBookmarked(item) : boolean{
        let result = false;
        let db: Object = JSON.parse(this.myStorage.getItem("IndexMedia"));
        let bookmarks: Array<Object> = db["bookmarks"];
        let filter = bookmarks.filter((link :  any) => {
            return link.link == item.link;
        });
        if (filter && filter.length > 0) {
            result = true;
        }
        return result;
    }
}