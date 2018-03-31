import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private _messsageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this._messsageService.add("Hero sevice: fetched heroes");
    return of(HEROES);
  }

  getHero(id: Number): Observable<Hero> {
    this._messsageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}