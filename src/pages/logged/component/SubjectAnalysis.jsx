import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// ...existing code...
const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 45, fullMark: 150 },
];
// ...existing code...

const SubjectAnalysis = () => {
  return (
    <div style={{ width: '100%', maxWidth: 300, height: 300 }}>
      <h3 className='text-center text-lg font-sans font-normal text-black '>Percentage destribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#0066ff" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectAnalysis;
// ...existing code...