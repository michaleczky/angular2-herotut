import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit  { 
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor (
    private heroService: HeroService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(heroName: string): void {
    this.heroService.create(heroName).then(() => { this.getHeroes() });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero == hero) { this.selectedHero = null };
    })
  }

}

