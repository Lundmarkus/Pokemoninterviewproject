import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Pokemon } from '../types/pokemontypes';

interface PokemonDetailsProps {
    pokemon: Pokemon | null;
    open: boolean;
    onClose: () => void;
}

export default function PokemonDetails({ pokemon, open, onClose }: PokemonDetailsProps) {
    if (!pokemon) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Details for {pokemon.Name}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div style={{ textAlign: 'center' }}>
                    <img src={pokemon.Picture} alt={pokemon.Name} style={{ width: '100px' }} />
                    <p><strong>ID:</strong> {pokemon.Id}</p>
                    <p><strong>Weight:</strong> {pokemon.Weight}</p>
                    <p><strong>Height:</strong> {pokemon.Height}</p>
                    <p><strong>Types:</strong> {pokemon.Types.join(', ')}</p>
                    <h3>Stats</h3>
                    <ul>
                        {pokemon.Stats.map((stat) => (
                            <li key={stat.name}>
                                <strong>{stat.name}:</strong> {stat.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
}
