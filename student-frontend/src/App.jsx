import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editMode, setEditMode] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // 🔎 Search states
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Load all students
  const load = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Handle input change
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add new student
  const add = async () => {
    if (!form.name || !form.email || !form.course) return alert("All fields required!");
    await axios.post(API, form);
    setForm({ name: "", email: "", course: "" });
    load();
  };

  // Delete student
  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  // Open edit form
  const startEdit = (student) => {
    setEditMode(true);
    setEditingStudent(student.id);
    setForm({ name: student.name, email: student.email, course: student.course });
  };

  // Update student
  const update = async () => {
    if (!form.name || !form.email || !form.course) return alert("All fields required!");
    await axios.put(`${API}/${editingStudent}`, form);
    setForm({ name: "", email: "", course: "" });
    setEditMode(false);
    setEditingStudent(null);
    load();
  };
  // Update student
  const cancel = async () => {
   
    setForm({ name: "", email: "", course: "" });
     setEditMode(false);
    setEditingStudent(null);
    load();
  };

  // 🔎 Search by ID
  const searchStudent = async () => {
    if (!searchId) return alert("Enter a student ID!");
    try {
      const res = await axios.get(`${API}/${searchId}`);
      if (res.data === null) return alert("Student not found!");
      setSearchResult(res.data);
       
    } catch (err) {
      setSearchResult(null);
      alert("Student not found!");
     
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 16 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🎓 Student Management</h1>

      {/* Add / Update Form */}
      <div
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "1fr 1fr 1fr auto",
          marginBottom: 20,
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={change}
          style={{ padding: 8 }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          style={{ padding: 8 }}
        />
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={change}
          style={{ padding: 8 }}
        />

        {!editMode ? (
          <button onClick={add} style={{ background: "green", color: "white", padding: "8px 12px" }}>
            Add
          </button>
        ) : (
          <div>
          <button
            onClick={update}
            style={{ background: "orange", color: "white", padding: "8px 12px" }}
          >
            Update
          </button>
           <button
            onClick={cancel}
            style={{ background: "red", color: "white", padding: "8px 12px" , margin:"4px" }}
          >
            Cancel
          </button>
          </div>
          
        )}
      </div>

      {/* 🔎 Search Section */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="number"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={searchStudent}
          style={{ background: "blue", color: "white", padding: "8px 16px" }}
        >
          Search
        </button>
      </div>

      {/* Show Search Result */}
      {searchResult && (
        <div style={{ marginBottom: 20, padding: 12, border: "1px solid #ddd", borderRadius: 4 }}>
          <h3>🔎 Search Result:</h3>
          <p>
            <b>Name:</b> {searchResult.name}
          </p>
          <p>
            <b>Email:</b> {searchResult.email}
          </p>
          <p>
            <b>Course:</b> {searchResult.course}
          </p>
        </div>
      )}

      {/* Students Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ background: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: 10, border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 10, border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 10, border: "1px solid #ddd" }}>Course</th>
            <th style={{ padding: 10, border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td style={{ padding: 10, border: "1px solid #ddd" }}>{s.name}</td>
              <td style={{ padding: 10, border: "1px solid #ddd" }}>{s.email}</td>
              <td style={{ padding: 10, border: "1px solid #ddd" }}>{s.course}</td>
              <td style={{ padding: 10, border: "1px solid #ddd" }}>
                <button
                  onClick={() => startEdit(s)}
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "6px 10px",
                    marginRight: 8,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(s.id)}
                  style={{ background: "red", color: "white", padding: "6px 10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
