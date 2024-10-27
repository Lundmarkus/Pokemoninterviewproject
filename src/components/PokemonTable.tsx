import React from 'react';
import { Pokemon } from '../types/pokemontypes';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

interface PokemonTableProps {
    pokemons: Pokemon[];
    selectedPokemon: Pokemon | null;
    onPokemonSelect: (pokemon: Pokemon, index: number) => void;
}

export default function PokemonTable({ pokemons, selectedPokemon, onPokemonSelect }: PokemonTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Picture</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>Types</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemons.map((pokemon, index) => (
                        <TableRow
                            key={pokemon.Id}
                            onClick={() => onPokemonSelect(pokemon, index)}
                            hover
                            selected={selectedPokemon?.Id === pokemon.Id}
                        >
                            <TableCell>{pokemon.Name}</TableCell>
                            <TableCell>
                                <img src={pokemon.Picture} alt={pokemon.Name} style={{ width: '50px' }} />
                            </TableCell>
                            <TableCell>{pokemon.Id}</TableCell>
                            <TableCell>{pokemon.Weight}</TableCell>
                            <TableCell>{pokemon.Height}</TableCell>
                            <TableCell>{pokemon.Types.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
