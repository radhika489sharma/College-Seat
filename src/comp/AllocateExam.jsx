import { useState } from "react";
import { api } from "../api";

export default function AllocateExam() {
  const [totalStudents, setTotalStudents] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState(null);

  const allocate = async () => {
    setMsg(null);
    setResult(null);

    try {
      const res = await api.post("/api/allocate", {
        totalStudents: Number(totalStudents),
      });

      setResult(res.data);
      setMsg({ type: "success", text: "Seats allocated successfully" });
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.error || "Allocation failed",
      });
    }
  };

  return (
    <div className="card">
      <h2>Allocate Seats</h2>

      <div className="form">
        <div>
          <div className="label">Total Students</div>
          <input
            className="input"
            type="number"
            placeholder="120"
            value={totalStudents}
            onChange={(e) => setTotalStudents(e.target.value)}
          />
        </div>

        <button className="btn" onClick={allocate}>
          Allocate
        </button>
      </div>

      {msg && (
        <div className={`msg ${msg.type === "success" ? "success" : "error"}`}>
          {msg.type === "success" ? "✅ " : "❌ "}
          {msg.text}
        </div>
      )}

      {result && (
        <div className="tableWrap" style={{ marginTop: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Floor</th>
                <th>Capacity</th>
                <th>Allocated</th>
                <th>Empty</th>
              </tr>
            </thead>
            <tbody>
              {result.allocated.map((r) => (
                <tr key={r.roomId}>
                  <td>{r.roomId}</td>
                  <td>{r.floorNo}</td>
                  <td>{r.capacity}</td>
                  <td>{r.seatsAllocated}</td>
                  <td>{r.seatsEmpty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
