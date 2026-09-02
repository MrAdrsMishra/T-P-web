import React, { useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineLink } from 'react-icons/ai'
import { MdLocationOn, MdDateRange } from 'react-icons/md'
import useAuthStore from '../../../store/user-auth-store/useAuthStore';
import { useCertificationsStore, useExperienceStore } from '../../../store/student-profile-store/useProfileStore';
 
const CertificationsAndExperience = () => {
  // Auth
  const token = useAuthStore((state) => state.token);

  // Certifications Store
  const {
    certs,
    isLoading: certsLoading,
    error: certsError,
    success: certsSuccess,
    fetchCertifications,
    addCertification,
    deleteCertification,
    clearError: clearCertError,
  } = useCertificationsStore();

  // Experience Store
  const {
    experiences,
    isLoading: expLoading,
    error: expError,
    success: expSuccess,
    fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    clearError: clearExpError,
  } = useExperienceStore();

  const [showCertForm, setShowCertForm] = useState(false)
  const [showExpForm, setShowExpForm] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      fetchCertifications(token);
      fetchExperiences(token);
    }
  }, [token, fetchCertifications, fetchExperiences]);

  // Handle add certification
  const handleAddCertification = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const certData = {
      name: formData.get('certName'),
      issuedBy: formData.get('issuedBy'),
      date: formData.get('date'),
      score: formData.get('score'),
      link: formData.get('link'),
    };
    await addCertification(certData, token);
    setShowCertForm(false);
    e.target.reset();
  };

  // Handle add experience
  const handleAddExperience = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expData = {
      company: formData.get('company'),
      position: formData.get('position'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      location: formData.get('location'),
      description: formData.get('description'),
    };
    await addExperience(expData, token);
    setShowExpForm(false);
    e.target.reset();
  };

  const handleDeleteCert = (id) => {
    deleteCertification(id, token);
  }

  const handleDeleteExp = (id) => {
    deleteExperience(id, token);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Certifications Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm sm:text-base text-slate-600">
              Manage your certifications and credentials
            </p>
            <button
              onClick={() => setShowCertForm(!showCertForm)}
              className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <AiOutlinePlus size={20} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Add Certification Form */}
          {showCertForm && (
            <form onSubmit={handleAddCertification} className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-sky-400">
              <h3 className="font-semibold text-slate-900 mb-4">Add New Certification</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text"
                  name="certName"
                  placeholder="Certification Name"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input 
                  type="text"
                  name="issuedBy"
                  placeholder="Issued By" 
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input 
                  type="date"
                  name="date"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input 
                  type="text"
                  name="score"
                  placeholder="Score (e.g., 95%)" 
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input 
                  type="url"
                  name="link"
                  placeholder="Drive Link"
                  className="col-span-1 sm:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={certsLoading} className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all disabled:opacity-50">
                  {certsLoading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowCertForm(false)} className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-lg transition-all">Cancel</button>
              </div>
              {certsError && <p className="text-red-500 text-sm mt-2">{certsError}</p>}
            </form>
          )}

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {certsLoading ? (
              // Loading skeleton
              [...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse border-t-4 border-sky-400">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))
            ) : certs && certs.length > 0 ? (
              certs.map((cert) => (
                <div
                  key={cert._id || cert.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-sky-400 p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-slate-600">{cert.issuedBy}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                        <AiOutlineEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCert(cert._id || cert.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </div>
                  </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MdDateRange size={16} className="text-slate-600" />
                    <span className="text-sm">{new Date(cert.date).toLocaleDateString()}</span>
                  </div>

                  {cert.score && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-600">Score:</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">
                        {cert.score}
                      </span>
                    </div>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mt-4 pt-4 border-t border-slate-200"
                    >
                      <AiOutlineLink size={16} />
                      <span className="text-sm">View Certificate</span>
                    </a>
                  )}
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                <p className="text-slate-600 mb-4">No certifications yet. Add your first one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm sm:text-base text-slate-600">
              Manage your professional experience and internships
            </p>
            <button
              onClick={() => setShowExpForm(!showExpForm)}
              className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <AiOutlinePlus size={20} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Add Experience Form */}
          {showExpForm && (
            <form onSubmit={handleAddExperience} className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-sky-400">
              <h3 className="font-semibold text-slate-900 mb-4">Add New Experience</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input 
                  type="text"
                  name="position"
                  placeholder="Position/Role"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
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
                <input 
                  type="text"
                  name="location"
                  placeholder="Location"
                  required
                  className="col-span-1 sm:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <textarea 
                  name="description"
                  placeholder="Description of works & projects..." 
                  className="col-span-1 sm:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 h-24 resize-none"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={expLoading} className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all disabled:opacity-50">
                  {expLoading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowExpForm(false)} className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-lg transition-all">Cancel</button>
              </div>
              {expError && <p className="text-red-500 text-sm mt-2">{expError}</p>}
            </form>
          )}

          {/* Experience Timeline */}
          <div className="space-y-6 mt-6">
            {expLoading ? (
              // Loading skeleton
              [...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse border-l-4 border-sky-400">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))
            ) : experiences && experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={exp._id || exp.id} className="relative">
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-slate-400 to-slate-200"></div>
                  )}

                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-sky-400 p-6 group">
                    {/* Timeline dot */}
                    <div className="absolute -left-[18px] top-8 w-6 h-6 bg-slate-600 border-4 border-white rounded-full shadow-md"></div>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                          {exp.position}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base">{exp.company}</p>
                      </div>
                      <div className="flex gap-2 mt-3 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                          <AiOutlineEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteExp(exp._id || exp.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-600">
                        <div className="flex items-center gap-2">
                          <MdDateRange size={16} className="text-slate-600" />
                          <span className="text-sm">
                            {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <MdLocationOn size={16} className="text-slate-600" />
                        <span className="text-sm">{exp.location}</span>
                      </div>

                      {exp.description && (
                        <p className="text-slate-600 text-sm leading-relaxed pt-3 border-t border-slate-200">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                <p className="text-slate-600 mb-4">No experience yet. Start building your profile!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationsAndExperience