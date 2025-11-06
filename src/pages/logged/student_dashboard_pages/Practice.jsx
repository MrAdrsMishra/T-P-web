import React, { useState } from 'react';
import { Play, BookOpen, Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { mockQuestions } from '../data/mockData';

const Practice = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [practiceMode, setPracticeMode] = useState('category');

  const categories = {
    technical: {
      name: 'Technical',
      description: 'Programming, algorithms, data structures, and software engineering concepts',
      topics: ['JavaScript', 'Python', 'Data Structures', 'Algorithms', 'System Design', 'Databases'],
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    aptitude: {
      name: 'Aptitude',
      description: 'Mathematical reasoning, quantitative analysis, and logical problem solving',
      topics: ['Mathematics', 'Statistics', 'Probability', 'Number Systems', 'Geometry', 'Algebra'],
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    reasoning: {
      name: 'Reasoning',
      description: 'Logical thinking, pattern recognition, and analytical reasoning',
      topics: ['Logical Reasoning', 'Pattern Recognition', 'Analytical Reasoning', 'Critical Thinking'],
      color: 'bg-green-50 border-green-200 text-green-800'
    }
  };

  const startPractice = (category) => {
    setSelectedCategory(category);
    const categoryQuestions = mockQuestions.filter(q => q.type === category);
    if (categoryQuestions.length > 0) {
      setCurrentQuestion(categoryQuestions[0]);
      setPracticeMode('question');
      setShowResult(false);
      setSelectedAnswer('');
    }
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion || !selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer('');
    // For demo, we'll just reset to show the same question
  };

  const backToCategories = () => {
    setPracticeMode('category');
    setCurrentQuestion(null);
    setShowResult(false);
    setSelectedAnswer('');
  };

  if (practiceMode === 'question' && currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={backToCategories}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
          <div className="text-sm text-gray-600">
            Score: {score.correct}/{score.total}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categories[selectedCategory].color}`}>
                {categories[selectedCategory].name}
              </span>
              <span className="text-sm text-gray-500">
                {currentQuestion.difficulty} • {currentQuestion.category}
              </span>
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-gray-800 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  showResult
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : option === selectedAnswer && option !== currentQuestion.correctAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={showResult}
                  className="mr-3"
                />
                <span className="text-gray-800">{option}</span>
                {showResult && option === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                )}
              </label>
            ))}
          </div>

          {showResult && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Explanation:</h4>
              <p className="text-gray-600">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {!showResult ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Practice Arena</h1>
        <div className="text-sm text-gray-600">
          Choose a category to start practicing
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <div
            key={key}
            className={`p-6 rounded-lg border-2 ${category.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white rounded-lg mr-3">
                {key === 'technical' && <BookOpen className="w-6 h-6 text-blue-600" />}
                {key === 'aptitude' && <Target className="w-6 h-6 text-purple-600" />}
                {key === 'reasoning' && <CheckCircle className="w-6 h-6 text-green-600" />}
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
            
            <p className="text-sm mb-4 opacity-80">{category.description}</p>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Topics covered:</h4>
              <div className="flex flex-wrap gap-2">
                {category.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white bg-opacity-60 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => startPractice(key)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Play className="w-4 h-4" />
              <span>Start Practice</span>
            </button>
          </div>
        ))}
      </div>

      {/* Practice Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Your Practice Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Questions Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Practice Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">45m</div>
            <div className="text-sm text-gray-600">Avg Session Time</div>
          </div>
        </div>
      </div>

      {/* Recent Practice Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Practice Activity</h3>
        <div className="space-y-3">
          {[
            { category: 'Technical', topic: 'JavaScript', score: '8/10', time: '15m ago' },
            { category: 'Aptitude', topic: 'Mathematics', score: '7/10', time: '1h ago' },
            { category: 'Reasoning', topic: 'Logical Reasoning', score: '9/10', time: '2h ago' },
            { category: 'Technical', topic: 'Data Structures', score: '6/10', time: '1d ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                <div>
                  <span className="font-medium text-gray-800">{activity.category}</span>
                  <span className="text-gray-600 mx-2">•</span>
                  <span className="text-gray-600">{activity.topic}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{activity.score}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;