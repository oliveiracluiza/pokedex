import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesKey = 'favorites'; // Chave usada para armazenar os favoritos no localStorage

  constructor() { }

  // Método para obter a lista de IDs de pokémons favoritos
  getFavorites(): number[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  // Método para adicionar um pokémon aos favoritos
  addFavorite(pokemonId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(pokemonId)) {
      favorites.push(pokemonId);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  // Método para remover um pokémon dos favoritos
  removeFavorite(pokemonId: number): void {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(pokemonId);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  // Método para verificar se um pokémon é favorito
  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().includes(pokemonId);
  }
}
