import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function WeeklyTaskCompletion({ data }) {
  if (!Array.isArray(data) || data.length === 0) return <div className="text-neutral-400">No weekly tasks to display.</div>;
  const chartData = data.map(goal => {
    const completed = Number(goal.completed || 0);
    const total = Number(goal.total || 0);
    return {
      name: goal.name,
      completed,
      total
    };
  });
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const { name, completed, total } = payload[0].payload;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
      <div
        style={{
          backgroundColor: "#111",
          border: "none",
          borderRadius: 8,
          padding: 12,
          color: "#fff",
          fontSize: 13
        }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{name}</strong>
        Progress: {completed}/{total} ({percent}%)
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2b2b2b" />
        <XAxis
          interval={0}
          label={false}
        />
        <YAxis tick={{ fill: "#ccc" }} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{ color: "#fff", fontSize: 13 }}
        />
        <Bar
          dataKey="completed"
          fill="#333843"
          name="Completed Milestones"
          barSize={40}
          activeBar={{ fill: "#a1a1aa" }}
        />
        <Bar
          dataKey="total"
          fill="#c9cbcf"
          name="Total Milestones"
          barSize={40}
          activeBar={{ fill: "#f3f4f6" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
