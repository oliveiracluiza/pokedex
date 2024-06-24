import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { FavoriteService } from '../../service/favorites.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  public apiError: boolean = false;
  public getAllPokemons: any[] = [];
  public pokemons: any[] = [];

  constructor(
    private pokeApiService: PokeApiService,
    public favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      (res: any[]) => {
        this.getAllPokemons = res;
        this.pokemons = this.getAllPokemons;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this.getAllPokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    this.pokemons = filter;
  }

  toggleFavorite(event: Event, pokemonId: number): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.favoriteService.isFavorite(pokemonId)) {
      this.favoriteService.removeFavorite(pokemonId);
    } else {
      this.favoriteService.addFavorite(pokemonId);
    }
  }
}
