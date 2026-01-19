export default function ClassroomList({ rooms }) {
  return (
    <div className="card">
      <h2>All Classrooms</h2>

      {rooms.length === 0 ? (
        <p style={{ margin: 0, color: "var(--muted)" }}>No classrooms found.</p>
      ) : (
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Capacity</th>
                <th>Floor</th>
                <th>Near Washroom</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.roomId}>
                  <td>{r.roomId}</td>
                  <td>{r.capacity}</td>
                  <td>{r.floorNo}</td>
                  <td>{r.nearWashroom ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
