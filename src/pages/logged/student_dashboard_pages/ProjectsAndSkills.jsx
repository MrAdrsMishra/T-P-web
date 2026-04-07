import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineGithub, AiOutlineLink } from 'react-icons/ai'
import { MdDateRange, MdPeople } from 'react-icons/md'
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss } from 'react-icons/si'
import useAuthStore from '../../../store/user-auth-store/useAuthStore';
import Reccomondation from '../component/Reccomondation';
import { useProjectsStore, useSkillsStore } from '../../../store/student-profile-store/useProfileStore.js';

const ProjectsAndSkills = () => {
  // Auth & User Profile
  const token = useAuthStore((state) => state.token);
  const studentProfile = useAuthStore((state) => state.studentProfile);

  // Skills Store
  const {
    skills,
    isLoading: skillsLoading,
    error: skillsError,
    success: skillsSuccess,
    fetchSkills,
    addSkill,
    deleteSkill,
    clearError: clearSkillError,
  } = useSkillsStore();

  // Projects Store
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
    success: projectsSuccess,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    clearError: clearProjectError,
  } = useProjectsStore();

  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showSkillForm, setShowSkillForm] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      fetchSkills(token);
      fetchProjects(token);
    }
  }, [token, fetchSkills, fetchProjects]);

  // Handle form submissions
  const handleAddSkill = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skillData = {
      name: formData.get('skillName'),
      level: formData.get('skillLevel'),
    };
    await addSkill(skillData, token);
    setShowSkillForm(false);
    e.target.reset();
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = {
      name: formData.get('projectName'),
      description: formData.get('projectDesc'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      gitRepo: formData.get('gitRepo'),
      liveLink: formData.get('liveLink'),
      contributors: formData.get('contributors')?.split(',').map(c => c.trim()) || [],
      techStack: formData.get('techStack')?.split(',').map(t => t.trim()) || [],
      additionals: formData.get('additionals'),
    };
    await createProject(projectData, token);
    setShowProjectForm(false);
    e.target.reset();
  }

  const handleDeleteProject = (id) => {
    deleteProject(id, token);
  }

  const handleDeleteSkill = (id) => {
    deleteSkill(id, token);
  }

  const getTechStackIcon = (tech) => {
    const icons = {
      'React': <SiReact className="text-blue-500" />,
      'Node.js': <SiNodedotjs className="text-green-600" />,
      'MongoDB': <SiMongodb className="text-green-500" />,
      'Tailwind CSS': <SiTailwindcss className="text-sky-400" />
    }
    return icons[tech] || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Skills Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm sm:text-base text-slate-600">
              {studentProfile.fullName}, manage your technical expertise and skills
            </p> 
            <button
              onClick={() => setShowSkillForm(!showSkillForm)}
              className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <AiOutlinePlus size={14} />
              <span className="hidden sm:inline">Add Skill</span>
            </button>
          </div>
          {/* Add Skill Form */}
          {showSkillForm && (
            <form onSubmit={handleAddSkill} className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-sky-400">
              <h3 className="font-semibold text-slate-900 mb-4">Add New Skill</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="skillName"
                  placeholder="Skill Name" 
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <select name="skillLevel" className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={skillsLoading} className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all disabled:opacity-50">
                  {skillsLoading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowSkillForm(false)} className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-lg transition-all">Cancel</button>
              </div>
              {skillsError && <p className="text-red-500 text-sm mt-2">{skillsError}</p>}
            </form>
          )}

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {skillsLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                </div>
              ))
            ) : skills && skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill._id || skill.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-sky-400 p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{skill.level}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteSkill(skill._id || skill.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-xs text-slate-500">{skill.endorsements || 0} endorsements</span>
                    <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-400 rounded-full"
                        style={{ width: `${((skill.endorsements || 0) / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                <p className="text-slate-600">No skills added yet. Start by adding your first skill!</p>
              </div>
            )}
          </div>

          {/* Skill Recommendations */}
            <Reccomondation/>
        </div>

        {/* Projects Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm sm:text-base text-slate-600">
              {studentProfile.fullName}, manage your projects and showcase your work
            </p>
            <button
              onClick={() => setShowProjectForm(!showProjectForm)}
              className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <AiOutlinePlus size={20} />
              <span className="hidden sm:inline">Add Project</span>
            </button>
          </div>

          {/* Add Project Form */}
          {showProjectForm && (
            <form onSubmit={handleAddProject} className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-sky-400">
              <h3 className="font-semibold text-slate-900 mb-4">Add New Project</h3>
              <div className="space-y-4">
                <div>
                  <input 
                    type="text"
                    name="projectName"
                    placeholder="Project Name" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <textarea 
                    name="projectDesc"
                    placeholder="Project Description" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 h-20 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="date"
                    name="startDate"
                    required
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <input 
                    type="date"
                    name="endDate"
                    required
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="url"
                    name="gitRepo"
                    placeholder="GitHub Repository Link" 
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <input 
                    type="url"
                    name="liveLink"
                    placeholder="Live Project Link" 
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    name="contributors"
                    placeholder="Contributors (comma-separated)" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    name="techStack"
                    placeholder="Tech Stack (comma-separated)" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <textarea 
                    name="additionals"
                    placeholder="Additional Details & Achievements" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 h-20 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={projectsLoading} className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all disabled:opacity-50">
                  {projectsLoading ? 'Saving...' : 'Save Project'}
                </button>
                <button type="button" onClick={() => setShowProjectForm(false)} className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-lg transition-all">Cancel</button>
              </div>
              {projectsError && <p className="text-red-500 text-sm mt-2">{projectsError}</p>}
            </form>
          )}

          {/* Projects Grid */}
          <div className="space-y-6">
            {projectsLoading ? (
              // Loading skeleton
              [...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse border-l-4 border-sky-400">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))
            ) : projects && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id || project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-sky-400 overflow-hidden group"
                >
                  {/* Project Header */}
                  <div className="bg-white p-6 border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {project.name}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 hover:bg-slate-100 rounded-lg text-slate-600">
                          <AiOutlineEdit size={20} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project._id || project.id)}
                          className="p-3 hover:bg-red-50 rounded-lg text-red-500"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 space-y-6">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-slate-700">
                      <MdDateRange size={20} className="text-slate-600" />
                      <span className="text-sm sm:text-base">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.gitRepo && (
                        <a
                          href={project.gitRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm rounded-lg transition-all"
                        >
                          <AiOutlineGithub size={18} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white text-sm rounded-lg transition-all"
                        >
                          <AiOutlineLink size={18} />
                          <span>View Live</span>
                        </a>
                      )}
                    </div>

                    <div className="border-t border-slate-200 pt-6 space-y-6">
                      {/* Tech Stack */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack && project.techStack.map((tech, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-300 hover:border-slate-400 transition-all"
                            >
                              <span className="text-lg">{getTechStackIcon(tech)}</span>
                            <span className="text-sm font-medium text-slate-700">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contributors */}
                      {project.contributors && project.contributors.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <MdPeople size={20} className="text-slate-600" />
                            Contributors
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.contributors.map((contributor, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-300"
                              >
                                {contributor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional Details */}
                      {project.additionals && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Key Achievements</h4>
                          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                            {project.additionals}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                <p className="text-slate-600 mb-4">No projects yet. Showcase your best work!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAndSkills;