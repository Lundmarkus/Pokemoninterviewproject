import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import { Pokemon } from './types/pokemontypes';
import './App.css';

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = await response.json();

  const pokemons: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        Name: details.name,
        Picture: details.sprites.front_default,
        Id: details.id,
        Weight: details.weight,
        Height: details.height,
        Types: details.types.map((typeInfo: any) => typeInfo.type.name),
        Stats: details.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      };
    })
  );

  return pokemons;
};

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: pokemons = [], isLoading, error } = useQuery<Pokemon[]>({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  });

  const handleOpenModal = (pokemon: Pokemon, index: number) => {
    setSelectedPokemon(pokemon);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => Math.min(prev + 1, pokemons.length - 1));
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pokemons.length]);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < pokemons.length) {
      setSelectedPokemon(pokemons[selectedIndex]);
    }
  }, [selectedIndex, pokemons]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon data</div>;

  return (
    <div className="App">
      <PokemonTable
        pokemons={pokemons}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={(pokemon, index) => handleOpenModal(pokemon, index)}
      />

      <PokemonDetails
        pokemon={selectedPokemon}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
