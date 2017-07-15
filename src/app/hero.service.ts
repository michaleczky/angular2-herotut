import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise()
            .then(resp => resp.json().data as Hero[])
            .catch(this.handleError)
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getHeroes()), 2000);
        })
    }

    getHero(id: Number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise()
            .then(result => result.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
    create(heroName: string): Promise<Hero> {
        let hero = new Hero();
        hero.name = heroName;
        return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers: this.headers}).toPromise()
            .then(result => {
                result.json().data as Hero;
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url).toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

}