import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { type User } from "./types";
import { UserList } from "./components/UserList.tsx";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [color, setColor] = useState<boolean>(false);
  const [sortByContry, setSortByCountry] = useState<boolean>(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleSortedCountry() {
    setSortByCountry((prevState) => !prevState);
  }

  const filterUser = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase()),
        )
      : users;
  }, [filterCountry, users]);

  // el metodo sort muta el array original esta no es la manera correcta de hacerlo
  //   const sortedCountrys = users.sort((a, b) => {
  //     return a.location.country > b.location.country ? 1 : -1;
  //   });

  // esta es aceptable y funciona mejor usar localCompare para organizar strings
  // const sortedCountrys = [...users].sort((a, b) => {
  //   return a.location.country.localeCompare(b.location.country);
  // });

  // mejor manera de hacerlo, el metodo toSorted hace una copia del array
  const sorted = useMemo(() => {
    console.log("sortinggg");
    return sortByContry
      ? filterUser.toSorted((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : filterUser;
  }, [filterUser, sortByContry]);

  const handleDelete = (id: string) => {
    const filteredUsers = users.filter((user) => user.email !== id);
    setUsers(filteredUsers);
  };

  function handleColors() {
    setColor((color) => !color);
  }

  function handleOriginalUsers() {
    setUsers(originalUsers.current);
  }

  return (
    <>
      <h1>Prueba tecnica react </h1>
      <button onClick={handleColors}>Colorear Filas</button>
      <button onClick={handleSortedCountry}>
        {sortByContry ? "ya esta organizado" : "organizar por pais"}
      </button>
      <button onClick={handleOriginalUsers}>restiar estado</button>
      <input
        placeholder="filtra por pais "
        onChange={(e) => setFilterCountry(e.target.value)}
      />
      <UserList users={sorted} color={color} deleteUser={handleDelete} />
    </>
  );
}

export default App;
