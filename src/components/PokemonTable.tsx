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
    visibleColumns: { [key: string]: boolean };
    onPokemonSelect: (pokemon: Pokemon, index: number) => void;
}

export default function PokemonTable({ pokemons, selectedPokemon, visibleColumns, onPokemonSelect }: PokemonTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>ID</TableCell>
                        {visibleColumns.Picture && <TableCell>Picture</TableCell>}
                        {visibleColumns.Weight && <TableCell>Weight</TableCell>}
                        {visibleColumns.Height && <TableCell>Height</TableCell>}
                        {visibleColumns.Types && <TableCell>Types</TableCell>}
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
                            <TableCell>{pokemon.Id}</TableCell>
                            {visibleColumns.Picture && (
                                <TableCell>
                                    <img src={pokemon.Picture} alt={pokemon.Name} style={{ width: '50px' }} />
                                </TableCell>
                            )}
                            {visibleColumns.Weight && <TableCell>{pokemon.Weight}</TableCell>}
                            {visibleColumns.Height && <TableCell>{pokemon.Height}</TableCell>}
                            {visibleColumns.Types && <TableCell>{pokemon.Types.join(', ')}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
