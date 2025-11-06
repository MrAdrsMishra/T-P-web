import React, { useState } from 'react';
import SkillsSection from '../component/SkillsSection';
import Reccomondation from '../component/Reccomondation';
 

const ProjectsAndSkills = () => {
   

  return (
    <div className="space-y-6">
      <Reccomondation/>
      <SkillsSection />
    </div>
  );
};

export default ProjectsAndSkills;