import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../service/favorites.service';
import { PokeApiService } from '../../service/poke-api.service';
import { Pokemon } from '../../service/poke-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favoritePokemons: Pokemon[] = [];
  apiError: boolean = false;

  constructor(
    public favoriteService: FavoriteService,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    const favoriteIds = this.favoriteService.getFavorites();
    this.loadFavoritePokemons(favoriteIds);
  }

  loadFavoritePokemons(ids: number[]): void {
    this.favoritePokemons = [];
    ids.forEach(id => {
      this.pokeApiService.getPokemonDetails(id).subscribe({
        next: (pokemon: any) => {
          this.favoritePokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            status: pokemon
          });
        },
        error: () => this.apiError = true
      });
    });
  }

  toggleFavorite(event: Event, pokemonId: number): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.favoriteService.isFavorite(pokemonId)) {
      this.favoriteService.removeFavorite(pokemonId);
    } else {
      this.favoriteService.addFavorite(pokemonId);
    }
    this.loadFavoritePokemons(this.favoriteService.getFavorites()); 
  }

}
