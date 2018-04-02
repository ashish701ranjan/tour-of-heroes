import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {catchError, map,tap} from 'rxjs/operators'
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroService {

  constructor(private _http: HttpClient, private _messsageService: MessageService) { }

  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    this._messsageService.add("Hero sevice: fetched heroes");
    return this._http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHero(id: Number): Observable<Hero> {
    this._messsageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this._messsageService.add('Hero Service: ' + message);
  }

}
