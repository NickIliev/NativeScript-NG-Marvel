import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

import { Comic } from "../models/comic";
import { ComicService } from "./comic.service";

import { SearchBar } from "ui/search-bar";
import { ad } from "utils/utils";

import { android as androidApp } from "application";

declare var android: any;

@Component({
    selector: "all-comics",
    moduleId: module.id,
    templateUrl: "./comics.component.html",
})
export class ComicsComponent implements OnInit {

    comics: Comic[];
    subscription: any;
    searchBar: SearchBar;

    constructor(private comicService: ComicService) { }

    ngOnInit() {
        console.log("ngOnInit");
        this.loadComics();

        if (androidApp) {
            androidApp.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        }
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
    }

    onGridLoaded(args) {
        console.log("onGridLoaded: ");
    }

    onSearchLoaded(args) {
        this.searchBar = <SearchBar>args.object;
        console.log("onSearchLoaded: ");

        if (androidApp) {
            this.searchBar.android.clearFocus();
        }
    }

    onSubmit(args) {
        this.searchBar = <SearchBar>args.object;
        console.log("onSubmit: " + this.searchBar.text);
        this.loadComics(this.searchBar.text);
    }

    onClear(args) {
        console.log("onClear: ");
    }

    onTextChanged(args) {
        console.log("SearchBar text changed! New value: " + args);
    }

    loadComics(comic?: string) {
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
        this.subscription = this.comicService.getComicsWithTitle(comic || "storm")
                                .subscribe(serverResponse => {
                                    // this.comics = serverResponse.data.results;
                                    console.log("getComicsWithImage().length: " + this.comicService.getComicsWithImage().length);

                                    this.comics = this.comicService.getComicsWithImage();

                                    if (androidApp && this.searchBar) {
                                        this.searchBar.android.clearFocus();
                                    }

                                    // console.log(this.comicService.getCachedComics());
                                    // console.log(this.comicService.getStatusCode());
                                    // console.log(this.comicService.getETag()); // used for subsequeantal reqests
                                    // console.log(this.comicService.getComicContaining("Marvel").length) // for use with the search-bar
                                }, err => {
                                    console.log(err);
                                });
    }

}
