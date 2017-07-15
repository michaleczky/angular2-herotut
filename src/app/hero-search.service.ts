
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

    constructor (private http: Http) {}

    search(term: string): Observable<Hero[]> {
        const url = `api/heroes/?name=${term}`
        return this.http.get(url)
            .map(resp => resp.json().data as Hero[]);            
    }

}