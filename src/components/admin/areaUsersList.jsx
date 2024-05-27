const AreaUsersList = ({ users }) => {
    return (
      <table className="table table-striped table-nowrap">
        <thead>
          <tr>
            <th className="border-bottom">
              <div className="form-check font-weight-bold">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                />
                <label className="form-check-label" htmlFor="selectAll">
                  ID
                </label>
              </div>
            </th>
            <th className="border-bottom">Avatar</th>
            <th className="border-bottom">Username</th>
            <th className="border-bottom">Email</th>
            <th className="border-bottom">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={user.id}
                    />
                    <label className="form-check-label" htmlFor={user.id}>
                      {user.id}
                    </label>
                  </div>
                </td>
                <td>
                  <img
                    src={user.avatar}
                    width="40"
                    height="40"
                    style={{ borderRadius: '50%' }}
                    alt={`Avatar of ${user.username}`}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-sm btn-light">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };
  
  export default AreaUsersList;
  