# Charts System Documentation

## Overview

A comprehensive, reusable charting system has been implemented using **Recharts** library. This includes 10+ pre-built chart components optimized for the Placement Engine dashboard.

---

## Chart Components Library

### Location
`src/components/Charts/ChartComponents.jsx`

### Available Components

#### 1. **PerformanceTrendChart**
- **Type:** Line Chart
- **Use Case:** Track performance over time
- **Props:**
  ```javascript
  data = [{ month: 'Sep', score: 20 }, ...]
  title = 'Performance Trend'
  height = 300
  ```
- **Example:** Student progress tracking, score trajectory

#### 2. **PercentileTrendChart**
- **Type:** Multi-line Chart
- **Use Case:** Compare percentiles across college/batch/branch
- **Props:**
  ```javascript
  data = [{ month: 'jan', college: 10, batch: 20, branch: 32 }, ...]
  title = 'Percentile Trend'
  height = 300
  ```
- **Example:** Ranking comparisons, competitive analysis

#### 3. **CategoryPerformanceChart**
- **Type:** Bar Chart
- **Use Case:** Performance by category/difficulty
- **Props:**
  ```javascript
  data = [{ category: 'Technical', avgScore: 85, testsCount: 2 }, ...]
  title = 'Performance by Category'
  height = 300
  ```
- **Example:** Category-wise scoring, difficulty-based performance

#### 4. **SubjectPerformanceRadarChart**
- **Type:** Radar Chart
- **Use Case:** Multi-dimensional performance analysis
- **Props:**
  ```javascript
  data = [{ subject: 'Math', A: 120, B: 110, fullMark: 150 }, ...]
  title = 'Subject Performance'
  height = 300
  ```
- **Example:** Subject mastery analysis, comparative subject performance

#### 5. **DistributionPieChart**
- **Type:** Pie Chart
- **Use Case:** Show distributions and percentages
- **Props:**
  ```javascript
  data = [{ name: 'CSE', value: 45 }, ...]
  title = 'Distribution'
  dataKey = 'value'
  nameKey = 'name'
  height = 300
  ```
- **Example:** Branch distribution, category breakdown

#### 6. **TimeSeriesAreaChart**
- **Type:** Area Chart
- **Use Case:** Visualize trends over time with filled area
- **Props:**
  ```javascript
  data = [{ date: '2024-01-01', value: 100 }, ...]
  title = 'Time Series'
  dataKey = 'value'
  color = '#3b82f6'
  height = 300
  ```
- **Example:** Engagement tracking, cumulative scores

#### 7. **MultiBarChart**
- **Type:** Grouped Bar Chart
- **Use Case:** Compare multiple metrics side-by-side
- **Props:**
  ```javascript
  data = [{ name: 'Tech', avgScore: 85, testsCount: 2 }, ...]
  title = 'Comparison'
  bars = [
    { dataKey: 'avgScore', name: 'Avg Score', fill: '#3b82f6' },
    { dataKey: 'testsCount', name: 'Tests Count', fill: '#10b981' }
  ]
  xAxisKey = 'name'
  height = 300
  ```
- **Example:** Comparing scores vs attempts, multiple metrics

#### 8. **StudentProgressChart**
- **Type:** Multi-series Line Chart
- **Use Case:** Compare multiple student progression lines
- **Props:**
  ```javascript
  data = [
    { date: '2024-01-01', student1: 45, student2: 50, student3: 48 },
    ...
  ]
  title = 'Student Progress'
  height = 300
  ```
- **Example:** Class performance comparison

#### 9. **AccuracyDistributionChart**
- **Type:** Bar Chart
- **Use Case:** Show accuracy range distributions
- **Props:**
  ```javascript
  data = [{ range: '0-25%', count: 5 }, ...]
  title = 'Accuracy Distribution'
  height = 300
  ```
- **Example:** Class accuracy distribution, skill assessment

#### 10. **ScoreDistributionChart**
- **Type:** Area Chart
- **Use Case:** Visualize score range distributions
- **Props:**
  ```javascript
  data = [{ scoreRange: '30-40', count: 8 }, ...]
  title = 'Score Distribution'
  height = 300
  ```
- **Example:** Leaderboard score breakdown

---

## Implemented Pages

### 1. **AdminHome.jsx** (Admin Dashboard)
**Location:** `src/pages/logged/Admin_dashboard_pages/AdminHome.jsx`

**Charts:**
- Performance Trend Chart (student progress)
- Subject Performance Radar Chart
- Percentile Trend Chart (college vs batch vs branch)
- Category Performance Chart
- Student Distribution Pie Chart
- Multi-bar Comparison Chart

**Features:**
- Filter by batch and branch
- Interactive charts with responsive design
- Statistics cards (total students, avg score, pass rate, active tests)
- Grid layout with mobile responsiveness

### 2. **PerformanceAnalytics.jsx** (Student Analytics)
**Location:** `src/pages/logged/student_dashboard_pages/PerformanceAnalytics.jsx`

**Charts:**
- Performance Trend Chart (student's progress)
- Subject Performance Radar Chart
- Category Performance Chart (by difficulty)
- Accuracy Distribution Chart
- Score Distribution Chart (college comparison)
- Percentile Trend Chart (ranking comparison)

**Features:**
- Integration with useAnalyticsStore
- Real-time stats display (tests, avg score, best rank, accuracy)
- Quick insights section
- Recommendations section
- Comparative analysis with peers

### 3. **Leaderboard.jsx** (Student Leaderboard)
**Location:** `src/pages/logged/student_dashboard_pages/Leaderboard.jsx`

**Charts:**
- Student Distribution Pie Chart (by branch)
- Score Distribution Chart
- Top Performers Comparison Bar Chart
- Rankings by Batch Trend Chart

**Features:**
- Top 10 leaderboard table
- View modes (Overall, By Branch, By Batch)
- Personal ranking stats
- Comparative analysis
- Performance metrics

---

## Usage Examples

### Example 1: Using PerformanceTrendChart
```jsx
import { PerformanceTrendChart } from '@/components/Charts/ChartComponents';

function MyPage() {
  const data = [
    { month: 'Sep', score: 20 },
    { month: 'Oct', score: 45 },
    { month: 'Nov', score: 78 },
  ];

  return (
    <PerformanceTrendChart
      data={data}
      height={350}
      title="My Progress"
    />
  );
}
```

### Example 2: Using MultiBarChart
```jsx
import { MultiBarChart } from '@/components/Charts/ChartComponents';

function MyPage() {
  const data = [
    { name: 'Easy', avgScore: 92, testsCount: 15 },
    { name: 'Medium', avgScore: 78, testsCount: 12 },
    { name: 'Hard', avgScore: 65, testsCount: 8 },
  ];

  return (
    <MultiBarChart
      data={data}
      height={350}
      title="Performance by Difficulty"
      bars={[
        { dataKey: 'avgScore', name: 'Avg Score', fill: '#3b82f6' },
        { dataKey: 'testsCount', name: 'Tests Count', fill: '#10b981' },
      ]}
      xAxisKey="name"
    />
  );
}
```

### Example 3: Using DistributionPieChart
```jsx
import { DistributionPieChart } from '@/components/Charts/ChartComponents';

function MyPage() {
  const data = [
    { name: 'CSE', value: 145 },
    { name: 'AIML', value: 98 },
    { name: 'ECE', value: 87 },
  ];

  return (
    <DistributionPieChart
      data={data}
      height={350}
      title="Branch Distribution"
      dataKey="value"
      nameKey="name"
    />
  );
}
```

---

## Styling & Customization

### Color Scheme
- **Primary:** `#3b82f6` (Blue)
- **Success:** `#10b981` (Green)
- **Warning:** `#f59e0b` (Amber)
- **Danger:** `#ef4444` (Red)
- **Purple:** `#8b5cf6`
- **Pink:** `#ec4899`

### Responsive Design
All charts are wrapped with `ResponsiveContainer` from Recharts for automatic responsive sizing.

```jsx
<ResponsiveContainer width="100%" height={height}>
  <YourChart data={data} />
</ResponsiveContainer>
```

### Customizing Chart Appearance
Charts use Tailwind CSS for wrapper styling:
```jsx
// Card container
className="bg-white p-6 rounded-lg shadow-md border border-slate-200"

// Title styling
className="text-lg font-semibold text-slate-900"
```

---

## Data Format Requirements

### Line Chart Data
```javascript
[
  { month: 'Jan', value: 100, score: 85 },
  { month: 'Feb', value: 120, score: 90 },
]
```

### Bar Chart Data
```javascript
[
  { category: 'Technical', avgScore: 85, testsCount: 2 },
  { category: 'Reasoning', avgScore: 88, testsCount: 1 },
]
```

### Pie Chart Data
```javascript
[
  { name: 'CSE', value: 145 },
  { name: 'AIML', value: 98 },
]
```

### Radar Chart Data
```javascript
[
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
]
```

---

## Integration with Zustand Stores

The charts are designed to work seamlessly with the Zustand stores:

```jsx
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';
import { PerformanceTrendChart } from '@/components/Charts/ChartComponents';

function MyPage() {
  const {
    studentStats,
    subjectPerformance,
    isLoading,
    fetchAllAnalytics,
  } = useAnalyticsStore();

  useEffect(() => {
    fetchAllAnalytics(token);
  }, [token]);

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <PerformanceTrendChart data={studentStats.trends} />
      )}
    </>
  );
}
```

---

## Performance Considerations

1. **Data Limitations:** Charts perform optimally with up to 100 data points
2. **Re-renders:** Consider using `useMemo` for expensive data transformations
3. **Accessibility:** All charts include tooltips for data accessibility

Example with useMemo:
```jsx
const chartData = useMemo(() => {
  return rawData.map(item => ({
    ...item,
    percentage: (item.score / 100) * 100,
  }));
}, [rawData]);
```

---

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Dependencies

- **recharts:** `^2.15.3`
- **react:** `^19.0.0`
- **tailwindcss:** `^3.4.17`

---

## File Locations

```
src/
├── components/
│   └── Charts/
│       └── ChartComponents.jsx .............. All chart components
├── pages/logged/
│   ├── Admin_dashboard_pages/
│   │   └── AdminHome.jsx ................... Admin dashboard with charts
│   └── student_dashboard_pages/
│       ├── PerformanceAnalytics.jsx ........ Student analytics with charts
│       └── Leaderboard.jsx ................. Leaderboard with charts
```

---

## Future Enhancements

1. **Interactive Charts:** Click-to-drill-down functionality
2. **Export Functionality:** Export charts as PNG/PDF
3. **Custom Themes:** Dark mode support
4. **Real-time Updates:** WebSocket integration for live data
5. **Advanced Filters:** More granular filtering options
6. **Comparison Tools:** Side-by-side chart comparisons
7. **Predictive Analytics:** Trend predictions with ML

---

## Troubleshooting

### Chart Not Displaying
- Ensure data format matches requirements
- Check that ResponsiveContainer has parent with height
- Verify Recharts is installed: `npm list recharts`

### Performance Issues
- Reduce data points to < 100
- Use `useMemo` for data transformations
- Consider data virtualization for large datasets

### Styling Issues
- Verify Tailwind CSS is properly configured
- Check z-index for tooltips/legends
- Ensure viewport meta tag is present

---

## Support & Resources

- Recharts Documentation: https://recharts.org/
- Chart Examples: Check implemented pages
- Data Format Guide: See "Data Format Requirements" section

