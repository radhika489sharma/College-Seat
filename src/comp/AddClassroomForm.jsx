import { useState } from "react";
import { api } from "../api";

export default function AddClassroomForm({ onAdded }) {
  const [roomId, setRoomId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [nearWashroom, setNearWashroom] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      await api.post("/api/classrooms", {
        roomId,
        capacity: Number(capacity),
        floorNo: Number(floorNo),
        nearWashroom,
      });

      setMsg({ type: "success", text: "Classroom added successfully" });

      setRoomId("");
      setCapacity("");
      setFloorNo("");
      setNearWashroom(false);

      onAdded?.();
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.error || "Failed to add classroom",
      });
    }
  };

  return (
    <div className="card">
      <h2>Add Classroom</h2>

      <form className="form" onSubmit={submit}>
        <div>
          <div className="label">Room ID (optional)</div>
          <input
            className="input"
            placeholder="A-101"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="row">
          <div>
            <div className="label">Capacity</div>
            <input
              className="input"
              type="number"
              placeholder="30"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="label">Floor No</div>
            <input
              className="input"
              type="number"
              placeholder="1"
              value={floorNo}
              onChange={(e) => setFloorNo(e.target.value)}
              required
            />
          </div>
        </div>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={nearWashroom}
            onChange={(e) => setNearWashroom(e.target.checked)}
          />
          Near Washroom
        </label>

        <button className="btn" type="submit">
          Add
        </button>
      </form>

      {msg && (
        <div className={`msg ${msg.type === "success" ? "success" : "error"}`}>
          {msg.type === "success" ? "✅ " : "❌ "}
          {msg.text}
        </div>
      )}
    </div>
  );
}
