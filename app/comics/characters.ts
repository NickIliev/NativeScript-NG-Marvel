import { Thumbnail } from "./thumbnail";
import { Story } from "./story";
import { Url } from "./url";

export class CharactersServerResponse {
    code: number;
    status: string;
    etag: string;
    data: Data;
}

export class Data {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
}

export class Character {
    id: number;
    name: string;
    description: string;
    resourceURI: string;
    urls: Url[];
    thumbnail: Thumbnail;
    stories: StoryList;
}

export class StoryList {
    available: number;
    collectionURI: string;
    items: Story[];
    returned: number;
}
