import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, forkJoin, interval, Subject } from 'rxjs';
import { from, fromEvent, Observable, of, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  mergeMap,
  pluck,
  share,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ApiService } from './api.service';


  /* https://www.learnrxjs.io/learn-rxjs */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  source1$ = from(['Mardi', 'Mercredi', 'Jeudi', 'Venderdi']);

  source2$ = from([
    { name: 'L\'incontournable', id: 1 },
    { name: 'La Caza', id: 2 },
    { name: 'Shushis en folie', id: 3 },
    { name: 'Chez Vincent', id: 4 },
  ]);

  source3$ = fromEvent(document, 'click');

  source4$ = fromEvent(document, 'keydown');

  source5$ = new Subject<{ id: number }>();

  constructor(private apiObs: ApiService) {}


  ngOnInit(): void {

    /* ----------------------------- TRANSFORMATION ----------------------------- */

    // // map permet de manipuler chaque donnée qui arrive dans le flux
    // const mapSource$ = this.source1$.pipe(map((name) => name.toUpperCase()));
    // mapSource$.subscribe((data) => console.log(data));

    // // pluck est une simplification de map destiner à accèder aux nested properties de la valeur.
    // const pluckSource$ = this.source2$.pipe(
    //   pluck('id')
    // );
    // pluckSource$.subscribe(data => console.log(data));

    // // mapTo est une simplifaction de map destiné à renvoyer une valeur constante
    // const mapToSource$ = this.source3$.pipe(mapTo('You clicked!'));
    // mapToSource$.subscribe(data => console.log(data));

    // // switchMap, a chaque emission l'observable interne (le résultat de la fonction) est annulé et un nouveau est souscrit
    // this.source3$.subscribe(() => interval(500).subscribe((data) => console.log(data)));
    // this.source3$.pipe(switchMap(event =>  {return interval(500)})).subscribe(data => console.log(data));



    /* ------------------------------- COMBINATION ------------------------------ */

    // // concat renvoie les données d'un observable jusqu'à ce quil soit "complete" puis celles du second etc.
    // const concatSource$ = concat(this.source1$, this.source2$, this.source4$);
    // concatSource$.subscribe(console.log);

    // // withLatestFrom renvoie un array avec la valeur de l'observable principal la dernière valeur de l'observable secondaire
    // const withLatestFrom$ = this.source3$.pipe(withLatestFrom(this.source4$.pipe(pluck('key'))));
    // withLatestFrom$.subscribe(console.log);



    /* --------------------------------- UTILITY -------------------------------- */

    // // tap permet de provoquer des effets de bords sans modifier la donnée orginale
    // const tapSource$ = this.source1$.pipe(
    //   tap(name => console.warn(name.toUpperCase()))
    // );
    // tapSource$.subscribe(data => console.log(data));



    /* -------------------------------- FILTERING ------------------------------- */

    // // filter émet les valeurs qui passent une condition définie
    // this.source2$.pipe(filter(data => data.id === 1)).subscribe(console.log);

    // // distinctUntilChanged permet d'emettre uniquement quand la valeur courante est différente de la dernière valeur
    // this.source4$.pipe(pluck('key'), distinctUntilChanged()).subscribe(console.log);

    // // debounceTime permet d'ignorer les valeurs émises si le temps spécifié n'est pas respecté
    // this.source4$.pipe(debounceTime(500)).subscribe(console.log);

    // // take() prend seulement le nombre de valeurs spécifiés avant de complete l'observable
    // this.source4$.pipe(take(8)).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   },
    // });

    // // takeWhile permet de déterminer une condition d'arrêt
    // let counter1 = 0;
    // this.source4$.pipe(tap(() => counter1++), pluck('key'), takeWhile(() => counter1 < 10)).subscribe({
    //   next: (data) => { console.log(`counter: ${counter1} key: ${data}`); },
    //   complete: () => { console.log('complete'); }
    // });

    // // TakeUntil permet d'utiliser l'emission d'un observable comme condition d'arrêt
    // let counter2 = 0;
    // this.source4$.pipe(tap(() => counter2++), pluck('key'), takeUntil(this.source3$)).subscribe({
    //   next: (data) => { console.log(`counter: ${counter2} key: ${data}`); },
    //   complete: () => { console.log('complete'); }
    // });



    /* ------------------------------ MULTICASTING ------------------------------ */

    // // permet de mutualiser les effets de bord
    // const shareSource$ = this.source3$.pipe(tap((data) => console.log(data)));
    // shareSource$.pipe(mapTo('You clicked :')).subscribe(data => console.log(data));
    // shareSource$.pipe(pluck('x')).subscribe(data => console.log(data));
    // shareSource$.pipe(pluck('y')).subscribe(data => console.log(data));

    // // Permet de récupérer un nb de valeurs déjà passées dans le flux
    // const shareReplaySource$ = this.source5$.pipe(shareReplay(1));
    // const fisrtShareSubscriber = shareReplaySource$.subscribe(data => console.log('first: ', data));
    // this.source5$.next({ id: 1 });
    // this.source5$.next({ id: 2 });
    // const secondShareSubscriber = shareReplaySource$.subscribe(data => console.log('Second: ', data));

  }
}
