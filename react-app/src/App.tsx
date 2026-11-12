import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<User[]>("/users", { signal: controller.signal })
      .then((response) => {
        console.log("Fetched users:", response.data[0].name);
        setUsers(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError("Error fetching users: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
    };

    setLoading(true);
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => {
        console.log("User added:", savedUser.name);
        setUsers([...users, savedUser]);
      })
      .catch((error) => {
        setError("Error adding user: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteUser = (user: User) => {
    setLoading(true);
    apiClient
      .delete(`/users/${user.id}`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== user.id));
      })
      .catch((error) => {
        setError("Error deleting user: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateCurrentUser = (user: User) => {
    const updatedUser: User = { ...user, name: user.name + " (Updated)" };

    setLoading(true);
    apiClient
      .patch(`/users/${user.id}`, updatedUser)
      .then(({ data: savedUser }) => {
        setUsers(users.map((u) => (u.id === user.id ? savedUser : u)));
      })
      .catch((error) => {
        setError("Error updating user: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}

      {isLoading && <div className="spinner-border"></div>}

      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => {
                  updateCurrentUser(user);
                }}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteUser(user);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
