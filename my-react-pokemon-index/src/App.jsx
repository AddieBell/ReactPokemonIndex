import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [weaknessFilter, setWeaknessFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      );
      const data = await response.json();
      setPokemonList(data.pokemon);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Pokémon Search and Filter</h1>

      {/* Search Value */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter by Type */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">Filter by Type...</option>
        <option value="Grass">Grass</option>
        <option value="Fire">Fire</option>
        <option value="Ice">Ice</option>
        <option value="Water">Water</option>
        <option value="Ground">Ground</option>
        <option value="Psychic">Psychic</option>
        <option value="Electric">Electric</option>
        <option value="Flying">Flying</option>
        <option value="Rock">Rock</option>
        <option value="Fighting">Fighting</option>
      </select>

      {/* Filter by Weakness */}
      <select
        value={weaknessFilter}
        onChange={(e) => setWeaknessFilter(e.target.value)}
      >
        <option value="">Filter by Weakness...</option>
        <option value="Grass">Grass</option>
        <option value="Fire">Fire</option>
        <option value="Ice">Ice</option>
        <option value="Water">Water</option>
        <option value="Ground">Ground</option>
        <option value="Psychic">Psychic</option>
        <option value="Electric">Electric</option>
        <option value="Flying">Flying</option>
        <option value="Rock">Rock</option>
        <option value="Fighting">Fighting</option>
      </select>

      {/* Pokemon that Displays*/}
      <div className="pokemon-list">
        {pokemonList
          .filter((pokemon) =>
            typeFilter ? pokemon.type.includes(typeFilter) : true
          )
          .filter((pokemon) =>
            weaknessFilter ? pokemon.weaknesses.includes(weaknessFilter) : true
          )
          .filter((pokemon) =>
            searchTerm
              ? pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
              : true
          )
          .map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <h2>{pokemon.name}</h2>
              <p>Number: {pokemon.num}</p>
              <p>Type: {pokemon.type.join(", ")}</p>
              <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
