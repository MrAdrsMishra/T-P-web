import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import useAuthStore from "../../../store/user-auth-store/useAuthStore";
const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} // close when clicking outside
      ></div>

      {/* Popup Box */}
      <div className="relative bg-white p-6 rounded-xl shadow-lg z-[101] max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-green-700">
          ✅ Registration Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Students have been registered successfully.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [addStudentsOpen, setAddStudentsOpen] = useState(false);
  const [newStudents, setNewStudents] = useState([
    { fullName: "", email: "", enrollment: "" },
  ]);

  const students = [
    {
      id: 1,
      fullName: "Sarah Smith",
      email: "sarah.smith@email.com",
      phone: "+1 234-567-8901",
      location: "New York, NY",
      joinDate: "2024-01-15",
      testsCompleted: 12,
      avgScore: 95,
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      fullName: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 234-567-8902",
      location: "Los Angeles, CA",
      joinDate: "2024-01-12",
      testsCompleted: 10,
      avgScore: 92,
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      fullName: "Emily Brown",
      email: "emily.brown@email.com",
      phone: "+1 234-567-8903",
      location: "Chicago, IL",
      joinDate: "2024-01-10",
      testsCompleted: 8,
      avgScore: 89,
      status: "inactive",
      lastActive: "1 week ago",
    },
    {
      id: 4,
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234-567-8904",
      location: "Houston, TX",
      joinDate: "2024-01-08",
      testsCompleted: 15,
      avgScore: 85,
      status: "active",
      lastActive: "30 minutes ago",
    },
    {
      id: 5,
      fullName: "Alex Wilson",
      email: "alex.wilson@email.com",
      phone: "+1 234-567-8905",
      location: "Phoenix, AZ",
      joinDate: "2024-01-05",
      testsCompleted: 9,
      avgScore: 83,
      status: "pending",
      lastActive: "3 days ago",
    },
  ];

  const registerStudents = useAuthStore((state) => state.registerStudents);
  const { isLoading, error } = useAuthStore();
  const [registered, setRegistered] = useState(false);
  const handleChange = (index, field, value) => {
    const updated = [...newStudents];
    updated[index][field] = value;
    setNewStudents(updated);
  };

  // ➕ Add another student input
  const handleAddStudent = () => {
    setNewStudents([
      ...newStudents,
      { fullName: "", email: "", enrollment: "" },
    ]);
  };

  // ❌ Remove a student input
  const handleRemoveStudent = (index) => {
    if(newStudents.length <2 ) return
    setNewStudents(newStudents.filter((_, i) =>i !== index));
  };

  // ✅ Submit students
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newStudents)
    const result = await registerStudents(newStudents);
    if (result?.status == 200) {
      setRegistered(true);
      setNewStudents([{ fullName: "", email: "", enrollment: "" }]);
    }
  };
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollment.includes(searchTerm);
    const matchesFilter =
      selectedFilter === "all" || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return statusClasses[status] || "bg-gray-100 text-gray-700";
  };

  const getPerformanceBadge = (score) => {
    if (score >= 90) return "bg-green-100 text-green-700";
    if (score >= 80) return "bg-blue-100 text-blue-700";
    if (score >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow max-w-auto mx-auto space-y-4 z-20">
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-lg font-normal text-primary-700">
            Register New Students
          </h2>

          {newStudents.map((student, index) => (
            <div key={index} className="flex items-center gap-2 max-h-[20px]">
              <input
                type="text"
                placeholder="Name"
                value={student.fullName}
                onChange={(e) =>
                  handleChange(index, "fullName", e.target.value)
                }
                className="input border-2 w-1/2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={student.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                className="input border-2 rounded w-1/2"
                required
              />
              <input
                type="text"
                placeholder="Enrollment"
                value={student.enrollment}
                onChange={(e) =>
                  handleChange(index, "enrollment", e.target.value)
                }
                className="input border-2 rounded w-1/2"
                required
              />
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(index)}
                    className="btn btn-error btn-sm"
                  >
                    ✕
                  </button>
                  <button
                    type="button"
                    onClick={handleAddStudent}
                    className="btn btn-error btn-sm"
                  >
                    +
                  </button>
                </div>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <button type="submit" className="btn btn-primary">
              Register Students
            </button>
            <button type="submit" className="btn btn-primary">
              Export excel
            </button>
            <button
              type="button"
              onClick={() => {
                setAddStudentsOpen(false);
                setNewStudents([{ fullName: "", email: "", enrollment: "" }]);
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {registered && <SuccessPopup onClose={() => setRegistered(true)} />}
    </div>
  );
};

export default Students;
