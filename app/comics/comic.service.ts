import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ComicsServerResponse, Data, Comic } from "./comic";
import { Observable as RxObservable } from 'rxjs/Rx';
import { API_KEY, COMICS_URL, LIMIT } from "../files/credentials";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComicService {
    private _comics = new Array<Comic>();
    private _etag: string;
    private _code: number;

    private _comicsUrl: string = COMICS_URL;
    private _key: string = API_KEY;
    private _limit: string = LIMIT;
    private _offset: number = 0; // use offset for loadOnDemand

    constructor(private http: Http) { }

    createTitleUrl(title): string {
        let url: string;
        if (title && title !== "") {
            url = this._comicsUrl + this._key + this._limit + "&title=" + title;
        } else {
            url = this._comicsUrl + this._key + this._limit;
        }

        return url;
    }

    getComicsWithTitle(title?: string): RxObservable<ComicsServerResponse> {
        return this.http.get(this.createTitleUrl(title))
            // ...and calling .json() on the response to return data
            .map((res: Response) => {
                let serverResponse = res.json();

                this._code = serverResponse.code;
                this._etag = serverResponse.etag;
                this._comics = serverResponse.data.results;

                return serverResponse;
            })
            .catch((error: any) => RxObservable.throw(error.json().error || 'Server error'));
    }

    createOffsetUrl(offset): string {
        let url: string;
        if (offset && offset > 0) {
            url = this._comicsUrl + this._key + this._limit + "&offset=" + offset;
        } else {
            url = this._comicsUrl + this._key + this._limit;
        }

        return url;
    }

    getComicsByOffset(offset?: number): RxObservable<ComicsServerResponse> {
        return this.http.get(this.createOffsetUrl(offset))
            // ...and calling .json() on the response to return data
            .map((res: Response) => {
                let serverResponse = res.json();

                this._code = serverResponse.code;
                this._etag = serverResponse.etag;
                this._comics = serverResponse.data.results;

                return serverResponse;
            })
            .catch((error: any) => RxObservable.throw(error.json().error || 'Server error'));
    }

    getCachedComics(): Comic[] {
        return this._comics;
    }

    getStatusCode(): number {
        return this._code;
    }

    getETag(): string {
        return this._etag;
    }

    getComicWithId(id: number): Comic {
        return this._comics.filter(item => item.id === id)[0];
    }

    getComicContaining(match: string): Comic[] {
        return this._comics.filter(comic => comic.title.indexOf(match) !== -1);
    }

    getComicsWithImage(): Comic[] {
        return this._comics.filter(comic => comic.thumbnail.path.indexOf("image_not_available") === -1);
    }
}
