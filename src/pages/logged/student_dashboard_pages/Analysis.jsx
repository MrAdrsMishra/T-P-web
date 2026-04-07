import RankingTrendGraph from "../component/Ranking.jsx";
import UserBLock from "../component/UserBLock.jsx";
import ProgressOverTimeGraph from "../component/ProgressOverTimeGraph.jsx";
import SubjectAnalysis from "../component/SubjectAnalysis.jsx";
const Analysis = () => {
  return (
    <div className="flex flex-col space-y-4">
      <UserBLock />
      
      <div id="row2" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SubjectAnalysis />
        <RankingTrendGraph />
      </div>
      <div id="row3" className="grid grid-cols-1 gap-4">
        <ProgressOverTimeGraph />
      </div>
    </div>
  );
};

export default Analysis;
