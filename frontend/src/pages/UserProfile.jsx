// import React, { useEffect, useState } from 'react'
// import { Plus, Save } from 'lucide-react'
// import { toast } from 'sonner'

// const ProfilePage = () => {
//     const [userData, setUserData] = useState(null)
//     const [skills, setSkills] = useState([])
//     const [newSkill, setNewSkill] = useState("")
//     const [projects, setProjects] = useState([])
//     const [newProject, setNewProject] = useState({ title: "", description: "" })
//     const [interests, setInterests] = useState([])
//     const [cvNotes, setCvNotes] = useState("")

//     // ✅ Local mock data for testing layout
//     useEffect(() => {
//         const res = {
//             data: {
//                 user: {
//                     fullName: "Mehedi Hasan Tareq",
//                     email: "tareqhasan1201@gmail.com",
//                     avatar: "https://i.ibb.co/8xr03SW/profile.jpg",
//                     education: "B.Sc. in Software Engineering",
//                     experienceLevel: "Fresher",
//                     careerTrack: "Web Development",
//                     skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
//                     projects: [
//                         {
//                             title: "Google Classroom Clone",
//                             description:
//                                 "Built a local-storage based classroom platform with login, assignments, and file uploads.",
//                         },
//                         {
//                             title: "2D Java Game",
//                             description:
//                                 "Developed an interactive Java game using OOP concepts with collision detection and scoring.",
//                         },
//                         {
//                             title: "Portfolio Website",
//                             description:
//                                 "Personal website showcasing projects and blogs using React & TailwindCSS.",
//                         },
//                     ],
//                     interests: [
//                         "Full Stack Development",
//                         "Machine Learning",
//                         "Cloud Computing",
//                     ],
//                     cvNotes:
//                         "Highly motivated software engineering student with strong problem-solving and analytical skills. Enjoys building interactive web apps and exploring backend technologies.",
//                 },
//             },
//         }

//         // Simulate API success
//         setUserData(res.data.user)
//         setSkills(res.data.user.skills)
//         setProjects(res.data.user.projects)
//         setInterests(res.data.user.interests)
//         setCvNotes(res.data.user.cvNotes)
//     }, [])

//     // ✅ Local handlers (frontend only for now)
//     const addSkill = () => {
//         if (!newSkill.trim()) return
//         const updated = [...skills, newSkill.trim()]
//         setSkills(updated)
//         setNewSkill("")
//     }

//     const addProject = () => {
//         if (!newProject.title || !newProject.description) return
//         const updated = [...projects, newProject]
//         setProjects(updated)
//         setNewProject({ title: "", description: "" })
//     }

//     const saveProfile = () => {
//         toast.success("Profile updated locally (mock mode)!")
//         console.log({
//             fullName: userData?.fullName,
//             skills,
//             projects,
//             interests,
//             cvNotes,
//         })
//     }

//     // ✅ Prevent rendering before data is ready
//     if (!userData) {
//         return <div className="text-center mt-10 text-gray-600">Loading profile...</div>
//     }

//     return (
//         <div className="min-h-screen bg-green-50 p-6">
//             <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl flex flex-col md:flex-row p-6">

//                 {/* LEFT SECTION */}
//                 <div className="md:w-1/3 border-r border-gray-200 pr-6 flex flex-col items-center text-center">
//                     <img
//                         src={userData.avatar}
//                         alt="User Avatar"
//                         className="w-40 h-40 rounded-full object-cover mb-4"
//                     />
//                     <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
//                     <p className="text-gray-600">{userData.email}</p>
//                     <hr className="my-3 w-4/5" />
//                     <p><strong>Education:</strong> {userData.education}</p>
//                     <p><strong>Experience:</strong> {userData.experienceLevel}</p>
//                     <p><strong>Career Track:</strong> {userData.careerTrack}</p>
//                 </div>

//                 {/* RIGHT SECTION */}
//                 <div className="md:w-2/3 pl-6 mt-6 md:mt-0 flex flex-col gap-8">

//                     {/* SKILLS SECTION */}
//                     <div>
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-xl font-semibold">Skills</h3>
//                             <div className="flex gap-2">
//                                 <input
//                                     type="text"
//                                     value={newSkill}
//                                     onChange={(e) => setNewSkill(e.target.value)}
//                                     placeholder="Add skill..."
//                                     className="border rounded px-2 py-1 text-sm"
//                                 />
//                                 <button onClick={addSkill} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
//                                     <Plus size={16} /> Add
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {skills.map((s, i) => (
//                                 <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{s}</span>
//                             ))}
//                         </div>
//                     </div>

//                     {/* PROJECTS SECTION */}
//                     <div>
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-xl font-semibold">Projects / Experience</h3>
//                             <div className="flex gap-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Title"
//                                     value={newProject.title}
//                                     onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
//                                     className="border rounded px-2 py-1 text-sm"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Description"
//                                     value={newProject.description}
//                                     onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//                                     className="border rounded px-2 py-1 text-sm"
//                                 />
//                                 <button onClick={addProject} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
//                                     <Plus size={16} /> Add
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-3">
//                             {projects.length === 0 ? <p className="text-gray-500">No projects yet</p> :
//                                 projects.map((p, i) => (
//                                     <div key={i} className="border p-3 rounded-lg">
//                                         <h4 className="font-semibold">{p.title}</h4>
//                                         <p className="text-gray-700 text-sm">{p.description}</p>
//                                     </div>
//                                 ))}
//                         </div>
//                     </div>

//                     {/* INTERESTS SECTION */}
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2">Career Interests</h3>
//                         <textarea
//                             className="border rounded-lg p-2 w-full"
//                             placeholder="E.g., Frontend Development, UI Design, Data Analysis..."
//                             value={interests.join(", ")}
//                             onChange={(e) => setInterests(e.target.value.split(","))}
//                         />
//                     </div>

//                     {/* CV / NOTES */}
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2">CV Notes</h3>
//                         <textarea
//                             className="border rounded-lg p-2 w-full min-h-[100px]"
//                             placeholder="Paste your CV text or notes here..."
//                             value={cvNotes}
//                             onChange={(e) => setCvNotes(e.target.value)}
//                         />
//                     </div>

//                     {/* SAVE BUTTON */}
//                     <button
//                         onClick={saveProfile}
//                         className="bg-green-700 text-white px-5 py-2 rounded-lg self-start flex items-center gap-2"
//                     >
//                         <Save size={18} /> Save Profile
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProfilePage
