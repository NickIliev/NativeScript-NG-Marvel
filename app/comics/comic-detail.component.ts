import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Comic } from "./comic";
import { ComicService } from "./comic.service";

@Component({
    selector: "comic-details",
    moduleId: module.id,
    templateUrl: "./comic-detail.component.html",
})
export class ComicDetailComponent implements OnInit {
    comic: Comic;

    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.comic = this.comicService.getComicWithId(id);
    }
}
