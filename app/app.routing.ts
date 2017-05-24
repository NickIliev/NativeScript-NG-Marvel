import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ComicsComponent } from "./comics/comics.component";
import { ComicDetailComponent } from "./comics/comic-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/comics", pathMatch: "full" },
    { path: "comics", component: ComicsComponent },
    { path: "comic/:id", component: ComicDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }