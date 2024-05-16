import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { List } from '../shared/list';
import { ListEvernoteService } from '../shared/list-evernote.service';

@Component({
  selector: 'en-search',
  standalone: true,
  imports: [NgClass],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter <string>();
  foundLists: List[] = []; 
  isLoading:boolean = false;
  @Output() listSelected:EventEmitter<List> = new EventEmitter<List>();

  constructor(private en: ListEvernoteService){

  }

  /**
   * pipe(): Verwendet den Output eines Operators als Input für den nächsten, um Daten schrittweise zu verarbeiten.
   * subscribe(): Startet die Ausführung des Observables, sodass Daten empfangen und verarbeitet werden können.
 */
  ngOnInit(): void {
    this.keyup
      .pipe(debounceTime(500)) //Verzögert Verarbeitung -> verhindert zu viele Anfragen bei schneller Eingabe 
      .pipe(distinctUntilChanged()) //Ignoriert aufeinanderfolgende, identische Eingaben, um unnötige API-Anrufe zu vermeiden
      .pipe(tap(() => this.isLoading = true)) 
      .pipe(switchMap(searchTerm => this.en.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe((lists) => {
        this.foundLists = lists;
        console.log(lists);
      });
  }
}
