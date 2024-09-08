import { User } from "../types";

interface Props {
  users: User[];
  color: boolean;
  deleteUser: (id: string) => void;
}
export function UserList({ users, color, deleteUser }: Props) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index: number) => {
            return (
              <tr
                key={user.email}
                style={
                  color
                    ? index % 2 === 0
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#000" }
                    : { backgroundColor: "transparent" }
                }
              >
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => deleteUser(user.email)}>Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
