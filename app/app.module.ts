import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ComicService } from "./comics/comic.service";
import { ComicsComponent } from "./comics/comics.component";
import { ComicDetailComponent } from "./comics/comic-detail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ComicsComponent,
        ComicDetailComponent
    ],
    providers: [
        ComicService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
