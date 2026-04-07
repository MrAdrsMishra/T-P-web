# API Integration Guide

## Overview

This guide documents how to integrate the centralized API service layer and Zustand stores into all dashboard pages. The architecture follows a clean separation of concerns: **api.service.js** handles all backend communication, while **Zustand stores** manage frontend state.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           React Components (Pages)                │
├─────────────────────────────────────────────────┤
│              Zustand Stores Layer                │
│  (useAuthStore, useSkillsStore, useAnalytics)   │
├─────────────────────────────────────────────────┤
│         api.service.js (Service Layer)           │
│   (authService, testService, analyticsService)  │
├─────────────────────────────────────────────────┤
│  Axios Instances (authAPI, testAPI, practiceAPI)│
├─────────────────────────────────────────────────┤
│           Backend Express Servers                │
└─────────────────────────────────────────────────┘
```

---

## 1. ProfileRelated Pages Integration

### 1.1 CertificationsAndExperience.jsx

**Current State:** Mock data with local state management
**Target State:** Store-backed with API calls

**Integration Steps:**

```jsx
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useCertificationsStore } from '@/store/user-profile-store/useProfileStore';
import { useExperienceStore } from '@/store/user-profile-store/useProfileStore';

function CertificationsAndExperience() {
  const token = useAuthStore((state) => state.token);
  
  // Certifications
  const {
    certs,
    isLoading: certsLoading,
    error: certsError,
    fetchCertifications,
    addCertification,
    deleteCertification,
    clearError: clearCertError,
  } = useCertificationsStore();

  // Experience
  const {
    experiences,
    isLoading: expLoading,
    error: expError,
    fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    clearError: clearExpError,
  } = useExperienceStore();

  // Fetch on mount
  useEffect(() => {
    if (token) {
      fetchCertifications(token);
      fetchExperiences(token);
    }
  }, [token, fetchCertifications, fetchExperiences]);

  // Replace existing handleDeleteCert
  const handleDeleteCert = (certId) => {
    deleteCertification(certId, token).then(() => {
      // Toast success notification
    });
  };

  // Replace existing handleDeleteExp
  const handleDeleteExp = (expId) => {
    deleteExperience(expId, token).then(() => {
      // Toast success notification
    });
  };

  // Replace mockCertifications with store data
  {certsLoading ? (
    <CertificationSkeleton />
  ) : (
    certs.map((cert) => <CertCard key={cert._id} cert={cert} />)
  )}

  // Replace mockExperience with store data
  {expLoading ? (
    <ExperienceSkeleton />
  ) : (
    experiences.map((exp) => <ExpCard key={exp._id} exp={exp} />)
  )}
}
```

**Store Methods to Use:**
- `fetchCertifications(token)` - Load all certifications on mount
- `addCertification(data, token)` - Add new certification
- `deleteCertification(id, token)` - Delete certification
- `fetchExperiences(token)` - Load all experiences on mount
- `addExperience(data, token)` - Add new experience
- `updateExperience(id, data, token)` - Update experience
- `deleteExperience(id, token)` - Delete experience

**Error Handling:**
```jsx
useEffect(() => {
  if (certsError) {
    toast.error(certsError);
    clearCertError();
  }
}, [certsError, clearCertError]);
```

---

### 1.2 ProjectsAndSkills.jsx

**Current State:** Mock data in component state
**Target State:** Integrated with useSkillsStore and useProjectsStore

**Integration Steps:**

```jsx
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import {
  useSkillsStore,
  useProjectsStore,
} from '@/store/user-profile-store/useProfileStore';

function ProjectsAndSkills() {
  const token = useAuthStore((state) => state.token);

  // Skills Store
  const {
    skills,
    isLoading: skillsLoading,
    error: skillsError,
    fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    getSkillRecommendations,
  } = useSkillsStore();

  // Projects Store
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    selectProject,
  } = useProjectsStore();

  // Fetch on mount
  useEffect(() => {
    if (token) {
      fetchSkills(token);
      fetchProjects(token);
    }
  }, [token, fetchSkills, fetchProjects]);

  // Replace mockSkills
  {skillsLoading ? (
    <SkillsSkeleton />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <SkillCard key={skill._id} skill={skill} />
      ))}
    </div>
  )}

  // Replace mockProjects
  {projectsLoading ? (
    <ProjectsSkeleton />
  ) : (
    projects.map((project) => <ProjectCard key={project._id} project={project} />)
  )}
}
```

**Store Methods to Use:**
- `fetchSkills(token)` - Load all skills
- `addSkill(skillData, token)` - Add new skill
- `updateSkill(id, skillData, token)` - Update skill
- `deleteSkill(id, token)` - Delete skill
- `getSkillRecommendations(token)` - Get AI recommendations
- `fetchProjects(token)` - Load all projects
- `createProject(projectData, token)` - Create new project
- `updateProject(id, projectData, token)` - Update project
- `deleteProject(id, token)` - Delete project

---

## 2. Analytics & Performance Pages Integration

### 2.1 Performance.jsx / Analysis.jsx

**Target:** Integrate useAnalyticsStore for performance tracking

**Integration Template:**

```jsx
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';

function Performance() {
  const token = useAuthStore((state) => state.token);

  const {
    studentStats,
    subjectPerformance,
    performanceTrends,
    accuracyMatrix,
    consistencyMetrics,
    isLoading,
    error,
    fetchStudentStats,
    fetchSubjectPerformance,
    fetchPerformanceTrends,
    fetchAllAnalytics,
  } = useAnalyticsStore();

  // Option 1: Fetch all at once
  useEffect(() => {
    if (token) {
      fetchAllAnalytics(token);
    }
  }, [token, fetchAllAnalytics]);

  // Option 2: Fetch specific metrics
  // useEffect(() => {
  //   if (token) {
  //     fetchStudentStats(token);
  //     fetchSubjectPerformance(token);
  //     fetchPerformanceTrends(token);
  //   }
  // }, [token]);

  return (
    <div>
      {isLoading ? (
        <AnalyticsSkeleton />
      ) : (
        <>
          {/* Student Stats Summary */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              label="Total Tests"
              value={studentStats.totalTests}
            />
            <StatCard
              label="Avg Score"
              value={`${studentStats.avgScore}%`}
            />
            <StatCard
              label="Best Rank"
              value={`#${studentStats.bestRank}`}
            />
            <StatCard
              label="Accuracy"
              value={`${studentStats.accuracy}%`}
            />
          </div>

          {/* Subject-wise Performance */}
          <PerformanceChart data={subjectPerformance} />

          {/* Trends */}
          <TrendsChart data={performanceTrends} />

          {/* Accuracy Matrix */}
          <AccuracyMatrix data={accuracyMatrix} />
        </>
      )}
    </div>
  );
}
```

**Analytics Store Methods:**
- `fetchStudentStats(token)` - Get test stats, scores, rankings
- `fetchSubjectPerformance(token)` - Performance by subject
- `fetchPerformanceTrends(token)` - Performance over time
- `fetchAccuracyMatrix(token)` - Accuracy by difficulty level
- `fetchConsistencyMetrics(token)` - Practice frequency, engagement
- `fetchLeaderboard(token)` - Global rankings
- `fetchPersonalRanking(token)` - User's global & subject rankings
- `fetchAllAnalytics(token)` - Fetch all at once

---

### 2.2 Leaderboard.jsx

**Integration Template:**

```jsx
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';

function Leaderboard() {
  const token = useAuthStore((state) => state.token);
  const {
    leaderboard,
    personalRanking,
    isLoading,
    fetchLeaderboard,
    fetchPersonalRanking,
  } = useAnalyticsStore();

  useEffect(() => {
    if (token) {
      fetchLeaderboard(token);
      fetchPersonalRanking(token);
    }
  }, [token, fetchLeaderboard, fetchPersonalRanking]);

  return (
    <div>
      {/* Personal Ranking Card */}
      <PersonalRankingCard ranking={personalRanking} />

      {/* Leaderboard Table */}
      <LeaderboardTable data={leaderboard} />
    </div>
  );
}
```

---

## 3. Code Editor & Practice Pages Integration

### 3.1 CodeEditor.jsx / PracticeProblems.jsx

**Integration Template:**

```jsx
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { usePracticeStore, useCodeTemplateStore } from '@/store/coding-problems-management-store/usePracticeStore';

function CodeEditor() {
  const token = useAuthStore((state) => state.token);

  const {
    code,
    language,
    input,
    output,
    executionTime,
    isExecuting,
    executionError,
    executionHistory,
    setCode,
    setLanguage,
    setInput,
    clearCode,
    executeCode,
    clearExecutionHistory,
  } = usePracticeStore();

  const { getTemplate } = useCodeTemplateStore();

  // Initialize with template
  useEffect(() => {
    const template = getTemplate(language);
    setCode(template);
  }, [language, getTemplate, setCode]);

  // Handle code execution
  const handleRun = async () => {
    const result = await executeCode(token, {
      code,
      language,
      input,
      problemId: selectedProblem._id,
    });
    // Result contains: output, time, memory, status
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Editor */}
      <div>
        <LanguageSelector
          language={language}
          onChange={(lang) => setLanguage(lang)}
        />
        <Editor
          code={code}
          onChange={(value) => setCode(value)}
          language={language}
        />
        <Input
          value={input}
          onChange={(val) => setInput(val)}
          placeholder="Enter input (optional)"
        />
      </div>

      {/* Output */}
      <div>
        {isExecuting ? (
          <LoadingSpinner />
        ) : executionError ? (
          <ErrorDisplay error={executionError} />
        ) : (
          <>
            <OutputDisplay output={output} />
            <ExecutionStats
              time={executionTime}
              memory={memory}
            />
          </>
        )}
      </div>

      {/* Buttons */}
      <Button onClick={handleRun}>Run Code</Button>
      <Button onClick={() => clearCode()}>Clear</Button>
      <Button onClick={() => clearExecutionHistory()}>History</Button>
    </div>
  );
}
```

**Practice Store Methods:**
- `executeCode(token, codeData)` - Run code with input
- `setCode(code)` - Update code
- `setLanguage(language)` - Change language
- `setInput(input)` - Update input
- `clearCode()` - Clear editor
- `submit(token, submissionData)` - Submit solution
- `getExecutionHistory()` - Access execution history
- `getSubmissions()` - Access submissions

---

## 4. TestManagement Pages Integration

### 4.1 StudentDashboard.jsx / ActiveTests.jsx

**Integration with useStudentTestStore:**

```jsx
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useStudentTestStore } from '@/store/test-management/student_test_store';

function ActiveTests() {
  const token = useAuthStore((state) => state.token);

  const {
    ongoingTests,
    testData,
    testSubmissionResult,
    isLoading,
    error,
    fetchOngoingTests,
    getTestData,
    submitTest,
  } = useStudentTestStore();

  useEffect(() => {
    if (token) {
      fetchOngoingTests(token);
    }
  }, [token, fetchOngoingTests]);

  const handleStartTest = async (testId) => {
    const data = await getTestData(testId, token);
    // Navigate to test taking interface with testData
  };

  return (
    <div>
      {isLoading ? (
        <TestsSkeleton />
      ) : (
        ongoingTests.map((test) => (
          <TestCard
            key={test._id}
            test={test}
            onStart={() => handleStartTest(test._id)}
          />
        ))
      )}
    </div>
  );
}
```

---

## 5. Admin Dashboard Integration

### 5.1 CreateTestPage.jsx

**Current:** Already using createTest from useAdminTestStore
**Update:** Ensure it uses testService from api.service.js

```jsx
// In useAdminTestStore, update the createTest method:
createTest: async (testData, token) => {
  set({ isLoading: true, error: null });
  try {
    const response = await testService.createTest(testData, token);
    set({
      tests: [...get().tests, response.data.data],
      success: 'Test created successfully!',
      isLoading: false,
    });
    return response;
  } catch (error) {
    const { message } = handleApiError(error);
    set({ error: message, isLoading: false });
  }
},
```

---

## 6. Store Usage Patterns

### Pattern 1: Fetch data on mount

```jsx
useEffect(() => {
  if (token) {
    fetchData(token);
  }
}, [token, fetchData]);
```

### Pattern 2: Handle loading states

```jsx
{isLoading ? (
  <Skeleton />
) : error ? (
  <ErrorDisplay error={error} onRetry={() => fetchData(token)} />
) : (
  <DataDisplay data={data} />
)}
```

### Pattern 3: Handle success notifications

```jsx
useEffect(() => {
  if (success) {
    toast.success(success);
    clearSuccess();
  }
}, [success, clearSuccess]);
```

### Pattern 4: Add new item

```jsx
const handleAdd = async (formData) => {
  const result = await addItem(formData, token);
  if (result) {
    toast.success('Item added successfully!');
    setFormOpen(false);
  }
};
```

---

## 7. API Service Reference

### authService
```javascript
registerAdmin(adminData)
login(credentials)
logout(token)
updateUserProfile(profileData, token)
registerStudent(studentData)
deleteStudent(studentId, token)
```

### testService
```javascript
createTest(testData, token)
createProblemSet(problemData, token)
getAllOngoingTests(token)
getTestData(testId, token)
submitTest(testId, answers, token)
getTestHistory(token)
getAssignments(token)
getProblems(token)
```

### practiceService
```javascript
runCode(codeData, token)
```

### skillsService
```javascript
getAllSkills(token)
addSkill(skillData, token)
updateSkill(skillId, skillData, token)
deleteSkill(skillId, token)
getSkillRecommendations(token)
```

### projectsService
```javascript
getAllProjects(token)
createProject(projectData, token)
updateProject(projectId, projectData, token)
deleteProject(projectId, token)
```

### certificationsService
```javascript
getAllCertifications(token)
addCertification(certData, token)
deleteCertification(certId, token)
```

### experienceService
```javascript
getAllExperience(token)
addExperience(expData, token)
updateExperience(expId, expData, token)
deleteExperience(expId, token)
```

### analyticsService
```javascript
getStudentStats(token)
getSubjectPerformance(token)
getPerformanceTrends(token)
getAccuracyMatrix(token)
getConsistencyMetrics(token)
getLeaderboard(token)
getPersonalRanking(token)
```

---

## 8. Common Pitfalls & Solutions

### ❌ Problem: Token is undefined
**Solution:**
```jsx
const token = useAuthStore((state) => state.token);
if (!token) {
  return <RedirectToLogin />;
}
```

### ❌ Problem: Infinite fetch loop
**Solution:**
```jsx
// Add dependencies correctly
useEffect(() => {
  if (token) {
    fetchData(token);
  }
}, [token]); // NOT [token, fetch, ...]
```

### ❌ Problem: Stale data after update
**Solution:**
```jsx
const handleDelete = async (id) => {
  await deleteItem(id, token);
  // Refetch list
  await fetchItems(token);
};
```

### ❌ Problem: Memory leaks from multiple renders
**Solution:**
```jsx
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const data = await getItems(token);
    if (isMounted) {
      setItems(data);
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false;
  };
}, [token]);
```

---

## 9. Implementation Checklist

- [ ] Import required stores in all pages
- [ ] Extract token from useAuthStore
- [ ] Call fetch methods in useEffect hooks
- [ ] Replace mock data with store data
- [ ] Add loading skeleton components
- [ ] Add error handling with toast notifications
- [ ] Add success notifications for CRUD operations
- [ ] Test all API calls in browser DevTools Network tab
- [ ] Verify error handling for 401 (token refresh)
- [ ] Add token refresh interceptor in axios
- [ ] Test offline functionality (Zustand persist)

---

## 10. Environment Variables

**Required in .env.local:**

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_AUTH_API_URL=http://localhost:5000/api/v1/users
VITE_TEST_API_URL=http://localhost:5000/api/v1/tests
VITE_PRACTICE_API_URL=http://localhost:5000/api/v1/practice
```

---

## 11. Next Steps

1. **Immediate:** Integrate useSkillsStore and useProjectsStore into ProjectsAndSkills.jsx
2. **High Priority:** Create useAnalyticsStore integration in Performance pages
3. **Medium Priority:** Update existing stores (useAuthStore, useAdminTestStore, useStudentTestStore)
4. **Lower Priority:** Add error boundaries and offline detection
5. **Polish:** Add animations, toast notifications, and micro-interactions