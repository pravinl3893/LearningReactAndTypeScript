import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError, setLoading } =
    useUsers();

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
    };

    setLoading(true);
    const { request, cancel } = userService.create<User>(newUser);
    request
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

    return () => {
      cancel();
    };
  };

  const deleteUser = (user: User) => {
    setLoading(true);
    const { request, cancel } = userService.delete(user.id);
    request
      .then(() => {
        setUsers(users.filter((u) => u.id !== user.id));
      })
      .catch((error) => {
        setError("Error deleting user: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel();
    };
  };

  const updateCurrentUser = (user: User) => {
    const updatedUser: User = { ...user, name: user.name + " (Updated)" };

    setLoading(true);
    const { request, cancel } = userService.update(updatedUser);
    request
      .then(({ data: savedUser }) => {
        setUsers(users.map((u) => (u.id === user.id ? savedUser : u)));
      })
      .catch((error) => {
        setError("Error updating user: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel();
    };
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
