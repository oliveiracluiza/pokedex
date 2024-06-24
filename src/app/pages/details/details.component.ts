import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../service/poke-api.service';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    forkJoin({
      pokemon: this.pokeApiService.getPokemonDetails(id),
      name: this.pokeApiService.getPokemonSpecies(id)
    }).pipe(
      map((res: any) => {
        this.pokemon = {
          details: res.pokemon,
          name: res.name
        };
        this.isLoading = true;
      }),
      catchError(() => {
        this.apiError = true;
        this.isLoading = false;
        return [];
      })
    ).subscribe();
  }
}

