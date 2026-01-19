import { useState } from "react";
import { api } from "./api";
import AddClassroomForm from "./comp/AddClassroomForm";
import ClassroomList from "./comp/ClassroomList";
import AllocateExam from "./comp/AllocateExam";

export default function App() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    const res = await api.get("/api/classrooms");
    setRooms(res.data);
  };



  return (
    <div className="container">
      <h1>COLLEGE EXAM PLANNER</h1>

      <AddClassroomForm onAdded={loadRooms} />
      <ClassroomList rooms={rooms} />
      <AllocateExam />
    </div>
  );
}
