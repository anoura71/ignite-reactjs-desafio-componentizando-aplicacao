import { useState, useEffect } from 'react';

import { GenreResponseProps, MovieProps } from '../App';
import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';


interface SideBarProps {
  genres: GenreResponseProps[];
  setGenres(genres: GenreResponseProps[]): void;
  setMovies(movies: MovieProps[]): void;
  setSelectedGenre(genre: GenreResponseProps): void;
}


export function SideBar({
  genres,
  setGenres,
  setMovies,
  setSelectedGenre,
}: SideBarProps) {


  const [selectedGenreId, setSelectedGenreId] = useState(1);


  // Carga inicial dos gêneros
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  // Atualização dos filmes exibidos, quando o gênero selecionado mudar
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  /** Seleção de um gênero pelo usuário. */
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }


  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );


}
