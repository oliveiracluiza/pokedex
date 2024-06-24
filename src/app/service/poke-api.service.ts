import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Pokemon {
  name: string;
  status: any; 
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}
  private urlSpecies: string = 'https://pokeapi.co/api/v2/pokemon-species';

  get apiListAllPokemons(): Observable<any[]> {
    return this.http.get<any>(this.url).pipe(
      tap(res => {
        res.results.forEach((pokemon: any) => {
          this.apiGetPokemonDetails(pokemon.url).subscribe(
            details => pokemon.status = details
          );
        });
      }),
      map(res => res.results)
    );
  }

  getPokemonSpecies(id: number): Observable<any> {
    const url = `${this.urlSpecies}/${id}`;
    return this.http.get<any>(url);
  }

  getPokemonDetails(id: number): Observable<any> {
    const url = `${this.urlPokemon}/${id}`;
    return this.http.get<any>(url);
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }

  private apiGetPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}


