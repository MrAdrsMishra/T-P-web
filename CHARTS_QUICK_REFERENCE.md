# Charts Quick Reference Guide

## 🎯 What's New

A complete charting system with 10+ reusable components has been added to the Placement Engine:

### Components Created
✅ **ChartComponents.jsx** - Reusable chart library with 10+ components
✅ **AdminHome.jsx** - Enhanced admin dashboard with 6 different charts
✅ **PerformanceAnalytics.jsx** - Student analytics page with comprehensive charts
✅ **Leaderboard.jsx** - Leaderboard page with visualization charts

---

## 📊 Available Charts

| Chart | Type | Best For | File |
|-------|------|----------|------|
| PerformanceTrendChart | Line | Track improvements over time | ChartComponents.jsx |
| PercentileTrendChart | Multi-Line | Compare percentiles | ChartComponents.jsx |
| CategoryPerformanceChart | Bar | Category-wise scores | ChartComponents.jsx |
| SubjectPerformanceRadarChart | Radar | Multi-dimensional analysis | ChartComponents.jsx |
| DistributionPieChart | Pie | Show proportions | ChartComponents.jsx |
| TimeSeriesAreaChart | Area | Trends with filled area | ChartComponents.jsx |
| MultiBarChart | Grouped Bar | Compare multiple metrics | ChartComponents.jsx |
| StudentProgressChart | Multi-Series Line | Compare multiple students | ChartComponents.jsx |
| AccuracyDistributionChart | Bar | Accuracy ranges | ChartComponents.jsx |
| ScoreDistributionChart | Area | Score ranges | ChartComponents.jsx |

---

## 🚀 Quick Usage

### Import
```jsx
import {
  PerformanceTrendChart,
  DistributionPieChart,
  // ... other charts
} from '@/components/Charts/ChartComponents';
```

### Basic Example
```jsx
<PerformanceTrendChart
  data={[
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 78 },
  ]}
  height={300}
  title="My Progress"
/>
```

---

## 📁 File Structure

```
src/
├── components/Charts/
│   └── ChartComponents.jsx ..................... Main chart library
├── pages/logged/Admin_dashboard_pages/
│   └── AdminHome.jsx ........................... Admin with 6 charts
└── pages/logged/student_dashboard_pages/
    ├── PerformanceAnalytics.jsx ............... Analytics with 6 charts
    └── Leaderboard.jsx ........................ Leaderboard with 4 charts
```

---

## 🎨 Chart Colors

```javascript
Primary Blue:     #3b82f6
Success Green:    #10b981
Warning Yellow:   #f59e0b
Danger Red:       #ef4444
Purple:           #8b5cf6
Pink:             #ec4899
```

---

## 📊 Data Format Examples

### Line Chart
```javascript
[
  { month: 'Sep', score: 45 },
  { month: 'Oct', score: 65 },
]
```

### Bar Chart
```javascript
[
  { category: 'Tech', avgScore: 85, tests: 2 },
  { category: 'Math', avgScore: 78, tests: 3 },
]
```

### Pie Chart
```javascript
[
  { name: 'CSE', value: 145 },
  { name: 'AIML', value: 98 },
]
```

### Radar Chart
```javascript
[
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
]
```

---

## 🔧 Common Customization

### Change Height
```jsx
<PerformanceTrendChart data={data} height={400} /> {/* taller */}
```

### Change Title
```jsx
<PerformanceTrendChart data={data} title="My Custom Title" />
```

### Change Colors (for MultiBarChart)
```jsx
<MultiBarChart
  data={data}
  bars={[
    { dataKey: 'score', name: 'Score', fill: '#ef4444' }, // red
    { dataKey: 'tests', name: 'Tests', fill: '#10b981' },  // green
  ]}
/>
```

---

## 📍 Where Charts Are Used

### Admin Dashboard
- **URL:** `/admin/admin-home` or similar
- **File:** `AdminHome.jsx`
- **Charts:**
  - Performance Trend (student progress)
  - Subject Radar (subject analysis)
  - Percentile Trend (college/batch/branch comparison)
  - Category Performance (by difficulty)
  - Distribution Pie (branch breakdown)
  - Multi-bar (tests vs scores)

### Student Analytics
- **URL:** `/student/performance` or similar
- **File:** `PerformanceAnalytics.jsx`
- **Charts:**
  - Progress Chart (your improvement)
  - Subject Radar (subject mastery)
  - Difficulty Performance (easy/hard breakdown)
  - Accuracy Distribution (accuracy ranges)
  - Score Distribution (where you stand)
  - Percentile Trend (your ranking)

### Leaderboard
- **URL:** `/student/leaderboard` or similar
- **File:** `Leaderboard.jsx`
- **Charts:**
  - Branch Distribution (students per branch)
  - Score Distribution (overall scores)
  - Top Performers Comparison (leading students)
  - Ranking Trend (batch-wise trends)

---

## 🔗 Integration with Stores

Charts work with Zustand stores for real data:

```jsx
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';

function MyComponent() {
  const { studentStats, isLoading } = useAnalyticsStore();
  
  if (isLoading) return <LoadingSkeleton />;
  
  return (
    <PerformanceTrendChart
      data={studentStats.trends}
      title="Your Progress"
    />
  );
}
```

---

## 📱 Responsive Design

All charts automatically:
- Scale to container width
- Adjust for mobile screens
- Maintain aspect ratio
- Work on tablets and desktops

---

## ⚡ Performance Tips

1. **Limit data points:** Keep < 100 data points per chart
2. **Use useMemo:** Cache data transformations
3. **Lazy load:** Load charts only when needed
4. **Pagination:** Break large datasets into pages

```jsx
const chartData = useMemo(() => {
  return data.slice(0, 50); // Limit to 50 points
}, [data]);
```

---

## 🎯 Common Use Cases

### Track Student Progress
```jsx
<PerformanceTrendChart 
  data={monthlyScores} 
  title="Your Score Progression"
/>
```

### Compare Difficulty Levels
```jsx
<CategoryPerformanceChart
  data={difficultyScores}
  title="Performance by Difficulty"
/>
```

### Show Distributions
```jsx
<DistributionPieChart
  data={branchCounts}
  title="Students by Branch"
/>
```

### Analyze Percentiles
```jsx
<PercentileTrendChart
  data={percentileData}
  title="Your Ranking Trend"
/>
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Chart not showing | Check data format matches requirements |
| Blurry on mobile | Add viewport meta tag |
| Tooltips cut off | Add padding to wrapper div |
| Legend overlaps | Use `endAngle` prop to rotate |
| Colors not applied | Check Tailwind CSS is configured |

---

## 📚 Documentation Files

- **CHARTS_DOCUMENTATION.md** - Comprehensive documentation (2000+ words)
- **ChartComponents.jsx** - Source code with inline comments
- **AdminHome.jsx** - Example implementation (admin)
- **PerformanceAnalytics.jsx** - Example implementation (student)
- **Leaderboard.jsx** - Example implementation (leaderboard)

---

## ✅ Next Steps

1. **Navigate to pages** to see charts in action
2. **Customize colors** to match your brand
3. **Connect real data** from API stores
4. **Add more charts** using the library
5. **Export charts** (future feature)

---

## 🎓 Learning Resources

- **Recharts Docs:** https://recharts.org/
- **Chart Examples:** Check implemented pages
- **Best Practices:** See CHARTS_DOCUMENTATION.md

---

**Happy Charting! 📊✨**
