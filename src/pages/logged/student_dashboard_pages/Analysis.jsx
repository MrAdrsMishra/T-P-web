import RankingTrendGraph from "../component/Ranking.jsx";
import UserBLock from "../component/UserBLock.jsx";
import ProgressOverTimeGraph from "../component/ProgressOverTimeGraph.jsx";
import SubjectAnalysis from "../component/SubjectAnalysis.jsx";
const Analysis = () => {
  return (
    <div className="flex flex-col space-y-2 ">
      <UserBLock />
      
      <div id="row2" className="flex justify-between space-x-4">
       <SubjectAnalysis />
        <RankingTrendGraph />
      </div>
      <div id="row3" className="flex justify-between space-x-4 ">
        <ProgressOverTimeGraph />
      </div>
    </div>
  );
};

export default Analysis;
