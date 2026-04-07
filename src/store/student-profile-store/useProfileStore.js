import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { skillsService, projectsService, certificationsService, experienceService, handleApiError }  from '../../services/api.service.js'
/**
 * Skills Management Store
 */
export const useSkillsStore = create(
  persist(
    (set, get) => ({
      skills: [],
      selectedSkill: null,
      skillRecommendations: [],
      isLoading: false,
      error: null,
      success: null,

      // Fetch all skills
      fetchSkills: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await skillsService.getAllSkills(token);
          set({ skills: response.data.data || [], isLoading: false });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Add new skill
      addSkill: async (skillData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await skillsService.addSkill(skillData, token);
          const skills = get().skills;
          set({
            skills: [...skills, response.data.data],
            isLoading: false,
            success: 'Skill added successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Update skill
      updateSkill: async (skillId, skillData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await skillsService.updateSkill(skillId, skillData, token);
          const skills = get().skills.map(s => s._id === skillId ? response.data.data : s);
          set({
            skills,
            isLoading: false,
            success: 'Skill updated successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Delete skill
      deleteSkill: async (skillId, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          await skillsService.deleteSkill(skillId, token);
          set({
            skills: get().skills.filter(s => s._id !== skillId),
            isLoading: false,
            success: 'Skill deleted successfully',
          });
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
        }
      },

      // Get recommendations
      fetchRecommendations: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await skillsService.getSkillRecommendations(token);
          set({ skillRecommendations: response.data.data || [], isLoading: false });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      setSelectedSkill: (skill) => set({ selectedSkill: skill }),
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    { name: 'skills-store' }
  )
);

/**
 * Projects Management Store
 */
export const useProjectsStore = create(
  persist(
    (set, get) => ({
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,
      success: null,

      // Fetch all projects
      fetchProjects: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await projectsService.getAllProjects(token);
          set({ projects: response.data.data || [], isLoading: false });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Create project
      createProject: async (projectData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await projectsService.createProject(projectData, token);
          const projects = get().projects;
          set({
            projects: [...projects, response.data.data],
            isLoading: false,
            success: 'Project created successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Update project
      updateProject: async (projectId, projectData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await projectsService.updateProject(projectId, projectData, token);
          const projects = get().projects.map(p => p._id === projectId ? response.data.data : p);
          set({
            projects,
            isLoading: false,
            success: 'Project updated successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Delete project
      deleteProject: async (projectId, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          await projectsService.deleteProject(projectId, token);
          set({
            projects: get().projects.filter(p => p._id !== projectId),
            isLoading: false,
            success: 'Project deleted successfully',
          });
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
        }
      },

      setSelectedProject: (project) => set({ selectedProject: project }),
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    { name: 'projects-store' }
  )
);

/**
 * Certifications Management Store
 */
export const useCertificationsStore = create(
  persist(
    (set, get) => ({
      certifications: [],
      selectedCertification: null,
      isLoading: false,
      error: null,
      success: null,

      // Fetch all certifications
      fetchCertifications: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await certificationsService.getAllCertifications(token);
          set({ certifications: response.data.data || [], isLoading: false });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Add certification
      addCertification: async (certData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await certificationsService.addCertification(certData, token);
          const certifications = get().certifications;
          set({
            certifications: [...certifications, response.data.data],
            isLoading: false,
            success: 'Certification added successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Delete certification
      deleteCertification: async (certId, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          await certificationsService.deleteCertification(certId, token);
          set({
            certifications: get().certifications.filter(c => c._id !== certId),
            isLoading: false,
            success: 'Certification deleted successfully',
          });
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
        }
      },

      setSelectedCertification: (cert) => set({ selectedCertification: cert }),
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    { name: 'certifications-store' }
  )
);

/**
 * Experience Management Store
 */
export const useExperienceStore = create(
  persist(
    (set, get) => ({
      experiences: [],
      selectedExperience: null,
      isLoading: false,
      error: null,
      success: null,

      // Fetch all experiences
      fetchExperiences: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await experienceService.getAllExperience(token);
          set({ experiences: response.data.data || [], isLoading: false });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Add experience
      addExperience: async (expData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await experienceService.addExperience(expData, token);
          const experiences = get().experiences;
          set({
            experiences: [...experiences, response.data.data],
            isLoading: false,
            success: 'Experience added successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Update experience
      updateExperience: async (expId, expData, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          const response = await experienceService.updateExperience(expId, expData, token);
          const experiences = get().experiences.map(e => e._id === expId ? response.data.data : e);
          set({
            experiences,
            isLoading: false,
            success: 'Experience updated successfully',
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Delete experience
      deleteExperience: async (expId, token) => {
        set({ isLoading: true, error: null, success: null });
        try {
          await experienceService.deleteExperience(expId, token);
          set({
            experiences: get().experiences.filter(e => e._id !== expId),
            isLoading: false,
            success: 'Experience deleted successfully',
          });
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
        }
      },

      setSelectedExperience: (exp) => set({ selectedExperience: exp }),
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    { name: 'experience-store' }
  )
);