import { useState } from 'react'
import UserProfile from './../components/UserProfile'
import MovieCard from './../components/MovieCard';

function Home() {
    const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([
    {firstName: "John", lastName: "Doe", country: "France"},
    {firstName: "Marie", lastName: "Blabla", country: "Germany"},
    {firstName: "Jimel", lastName: "Azerty", country: "UK"},
    {firstName: "Yahya", lastName: "Qwerty", country: "Spain"},
  ]);
  const [showUsers, setShowUsers] = useState(true);
 
  const movies = [
    { name: "Movie 1", year: "2020" },
    { name: "Movie 2", year: "2021" },
    { name: "Movie 3", year: "2022" },
    { name: "Movie 4", year: "2023" },
  ];

    return (
        <div>
            <h1>Home Page</h1>
            <p>This is home page</p>

            <div>
      <h1>Test Section</h1>
      <button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
          Add
      </button>
      <button
        onClick={() => {
          setCounter(counter - 1)
        }}
      >
          Substract
      </button>
      <h2>Count: {counter}</h2>

        <button
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
      <h1>Users list</h1>
      {
        showUsers && users.map((user, id) => (
          <UserProfile
            key={id}
            firstName={user.firstName}
            lastName={user.lastName}
            country={user.country} />
        ))
      }

      <h1>Movies list</h1>
      {
        movies.map((movie, id) => (
          <MovieCard
            key={id}
            name={movie.name}
            year={movie.year}
             />
        ))
      }
    </div>
        </div>
    );
}
export default Home;