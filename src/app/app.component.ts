import { Component, OnInit } from '@angular/core';
import { concat, forkJoin, interval, Subject } from 'rxjs';
import { from, fromEvent, Observable, of, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mapTo, mergeMap, pluck, share, shareReplay, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  source1$ = from(['Mardi', 'Mercredi', 'Jeudi', 'Venderdi']);
  source2$ = from([{ name: 'L\'incontournable', id: 1 }, { name: 'La Caza', id: 2 }, { name: 'Shushis en folie', id: 3 }, { name: 'Chez Vincent', id: 4 }])
  source3$ = fromEvent(document, 'click');
  source4$ = new Subject<{ id: number }>();
  source5$ = fromEvent(document, 'keydown');

  constructor(private apiObs: ApiService) {
  }

  ngOnInit(): void {

    /* ----------------------------- Transformation ----------------------------- */

    // // map permet de manipuler chaque donnée qui arrive dans le flux
    // const mapSource$ = this.source1$.pipe(
    //   map(name => name.toUpperCase())
    // );
    // mapSource$.subscribe(data => console.log(data));

    // // pluck est une simplification de map destiner à accèder aux nested properties de la valeur.
    // const pluckSource$ = this.source2$.pipe(
    //   pluck('id')
    // )
    // pluckSource$.subscribe(data => console.log(data));

    // // mapTo est une simplifaction de map destiné à renvoyer une valeur constante
    // const mapToSource$ = this.source3$.pipe(mapTo('You clicked!'));
    // mapToSource$.subscribe(data => console.log(data));

    // // switchMap, a chaque emission l'observable interne (le résultat de la fonction) est annulé et un nouveau est souscrit
    // this.source3$.subscribe(() => interval(500).subscribe(data => console.log(data)))
    // this.source3$.pipe(switchMap(event => { return interval(500) })).subscribe(data => console.log(data));

    // // MergeMap à préciser
    // const mergeMapSource$ = this.source1$.pipe(mergeMap(data1 => { return this.source4$.pipe(map(data2 => { return { what: data1, ...data2 } })) }))
    // mergeMapSource$.subscribe(console.log);
    // this.source4$.next({ id: 1 })




    /* -------------------------------- Filtering ------------------------------- */

    // filter emet les valeurs qui passe une condition
    // this.source2$.pipe(filter(data => data.id === 1)).subscribe(console.log);

    // // distinctUntilChanged permet d'emettre uniquement quand la valeur courante est différente de la dernière valeur
    // this.source5$.pipe(pluck('key'), distinctUntilChanged()).subscribe(console.log);

    // // debounceTime permet d'ignorer les valeurs émises si le temps spécifié n'est pas respecté
    // this.source5$.pipe(debounceTime(500)).subscribe(console.log);


    // // take() prend seulement le nombre de valeurs spécifiés avant de complete l'observable
    // this.source5$.pipe(take(2)).subscribe({
    //   next(data) { console.log(data); },
    //   complete() { console.log('complete') }
    // });

    // takeWhile permet de déterminer une condition d'arrêt
    // let counter1 = 0
    // this.source5$.pipe(tap(() => counter1++), takeWhile(() => counter1 < 5)).subscribe({
    //   next(data) { console.log(`counter: ${counter1} key: ${data}`) },
    //   complete() { console.log('complete') }
    // });

    // // TakeUntil permet d'utiliser l'emission d'un observable comme condition d'arrêt
    // let counter2 = 0
    // this.source5$.pipe(tap(() => counter2++), takeUntil(this.source3$)).subscribe({
    //   next(data) { console.log(`counter: ${counter2} key: ${data}`) },
    //   complete() { console.log('complete') }
    // });


    /* --------------------------------- Utility -------------------------------- */

    // // tap permet de provoquer des effets de bords sans modifier la donnée orginale
    // const tapSource$ = this.source1$.pipe(
    //   tap(name => console.warn(name.toUpperCase()))
    // )
    // tapSource$.subscribe(data => console.log(data));


    /* ------------------------------- Combination ------------------------------ */

    // // concat à préciser
    // const concatSource$ = concat(this.source1$, this.source2$);
    // concatSource$.subscribe(console.log);

    // // forkjoin à préciser
    // const forkJoinSource$ = forkJoin(this.source1$, this.source2$);
    // forkJoinSource$.subscribe(console.log);



    /* ------------------------------ Multicasting ------------------------------ */

    // // permet de mutualiser les effets de bord
    // const shareSource$ = this.source3$.pipe(tap((data) => console.log(data)), mapTo('You clicked !'), share());
    // shareSource$.subscribe(data => console.log(data));
    // shareSource$.subscribe(data => console.log(data));

    // // Permet de récupérer un nb de
    // const shareReplaySource$ = this.source4$.pipe(shareReplay(1));
    // const fisrtShareSubscriber = shareReplaySource$.subscribe(data => console.log('first: ', data));
    // this.source4$.next({ id: 1 });
    // this.source4$.next({ id: 2 });
    // const secondShareSubscriber = shareReplaySource$.subscribe(data => console.log('Second: ', data));












    // this.apiObs.getPosts().subscribe(data => console.log(data));
    // this.apiObs.getPosts().subscribe(data => console.log(data));
    // this.apiObs.getComments().subscribe(data => console.log(data));
    // this.apiObs.getUsers().subscribe(data => console.log(data))
  }

}

