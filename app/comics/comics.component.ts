import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

import { Comic } from "./comic";
import { ComicService } from "./comic.service";

@Component({
    selector: "all-comics",
    moduleId: module.id,
    templateUrl: "./comics.component.html",
})
export class ComicsComponent implements OnInit {

    comics: Comic[];
    subscription: any;

    constructor(private comicService: ComicService) { }

    ngOnInit() {
        this.loadComics();
    }

    // ngAfterViewInit(): void {

    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }

    loadComics() {
        /* usage: LOAD ON DEMAND */
        // this.subscription = this.comicService.getComicsByOffset(0)
        //                         .subscribe(serverResponse => {
        //                             // this.comics = serverResponse.data.results;
        //                             console.log("getComicsWithImage().length: " + this.comicService.getComicsWithImage().length);

        //                             this.comics = this.comicService.getComicsWithImage();
        //                             // console.log(this.comicService.getCachedComics());
        //                             // console.log(this.comicService.getStatusCode());
        //                             // console.log(this.comicService.getETag()); // used for subsequeantal reqests
        //                             // console.log(this.comicService.getComicContaining("Marvel").length) // for use with the search-bar
        //                         }, err => {
        //                             console.log(err);
        //                         });

        /* usage: Load comics with name */
        this.subscription = this.comicService.getComicsWithTitle("storm")
                                .subscribe(serverResponse => {
                                    // this.comics = serverResponse.data.results;
                                    console.log("getComicsWithImage().length: " + this.comicService.getComicsWithImage().length);

                                    this.comics = this.comicService.getComicsWithImage();
                                    // console.log(this.comicService.getCachedComics());
                                    // console.log(this.comicService.getStatusCode());
                                    // console.log(this.comicService.getETag()); // used for subsequeantal reqests
                                    // console.log(this.comicService.getComicContaining("Marvel").length) // for use with the search-bar
                                }, err => {
                                    console.log(err);
                                });
    }

}
