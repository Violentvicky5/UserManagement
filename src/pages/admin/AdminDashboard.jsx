import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../../utils/api";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = sessionStorage.getItem("accessToken");
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    apiFetch(`${URL}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setAllUsers(data);
      })
      .catch(console.error);
  }, []);

  // Search by USER ID
  const searchUserById = async () => {
    if (!searchId) return;

    const res = await apiFetch(`${URL}/api/users/${searchId}`);
    if (!res.ok) {
      alert("User not found");
      return;
    }

    const data = await res.json();
    setUsers([data]);
  };
  //cancel update
  const cancelUpdate = () => {
    setShowModal(false);
    setEditUser(null);
  };
  //update user
  const saveUpdate = async () => {
    if (!editUser) return;

    const payload = {
      name: editUser.name,
      email: editUser.email,
      phone: editUser.phone,
      address: editUser.address,
      city: editUser.city,
      state: editUser.state,
      country: editUser.country,
      pincode: editUser.pincode,
      role: editUser.role,
    };

    const res = await apiFetch(`${URL}/api/users/${editUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return alert("Update failed");

    const updatedUser = await res.json();

    setUsers((prev) =>
      prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );

    setShowModal(false);
    setEditUser(null);
  };

  // Delete user
  const deleteUser = async (id) => {
    const res = await apiFetch(`${URL}/api/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");

    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  // Logout admin
  const logoutAdmin = async () => {
    await fetch(`${URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    sessionStorage.removeItem("accessToken");
    navigate("/admin/login");
  };

  // Client-side name,email,city,state filter (simple)
 const filteredUsers = users.filter((u) => {
  const searchText = nameFilter.trim().toLowerCase();

  if (!searchText) return true;

  return [
    u.name,
    u.email,
    u.city,
    u.state,
    u.country
  ]
    .some((field) =>
      field?.toLowerCase().includes(searchText)
    );
});



  return (
    <div className="container mt-4">
      <h4>User Management panel</h4>
      <div className="d-flex justify-content-between align-items-center mb-3 bg-dark text-white p-2">
        <h4 className="fw-bold m-1">Admin Dashboard</h4>
        <button className="btn btn-warning m-1" onClick={logoutAdmin}>
          Logout
        </button>
      </div>

      {/* Search by ID */}
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search by User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={searchUserById}>
          Search
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => {
            setUsers(allUsers);
            setSearchId("");
            setNameFilter("");
          }}
        >
          View All
        </button>
      </div>

      {/* Name filter*/}
      <input
        className="form-control mb-3"
        placeholder="Search by name, email, city or state"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
         <thead className="table-dark">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Country</th>
    <th>Pincode</th>
    <th>Role</th>
    <th>Created</th>
    <th>Updated</th>
    <th>Actions</th>
  </tr>
</thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td
                  style={{
                    maxWidth: "150px",
                    wordBreak: "break-all",
                    fontSize: "8px",
                  }}
                >
                  {u._id}
                </td>

                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>

                <td>{u.address}</td>
<td>{u.city}</td>
<td>{u.state}</td>
<td>{u.country}</td>
<td>{u.pincode}</td>
<td>{u.role}</td>


                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>{new Date(u.updatedAt).toLocaleString()}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm mt-2 w-100"
                    onClick={() => {
                      setEditUser({ ...u }); // fill all fields
                      setShowModal(true);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger btn-sm mt-2 w-100"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {showModal && editUser && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Edit User</h5>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    value={editUser?.name || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    value={editUser?.email || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    value={editUser?.phone || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, phone: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    value={editUser?.address || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, address: e.target.value })
                    }
                  />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cancelUpdate}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveUpdate}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
