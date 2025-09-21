import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function GoalNestedDonut({ data }) {
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const COLORS = ["#36a2eb", "#ff6384", "#ffcd56", "#4bc0c0", "#9966ff", "#e67e22", "#1abc9c", "#c9cbcf"];
  if (!Array.isArray(data) || data.length === 0) return <div className="text-neutral-400">No goals to display.</div>;
  const baseInner = 40;
  const ringThickness = 14;
  const gap = 3;
  const totalRings = data.length;

  return (
    <ResponsiveContainer>
      <PieChart>
        <Tooltip
          content={({ active }) => {
            if (!active || !hoveredGoal) return null;
            const percent = hoveredGoal.total > 0
              ? Math.round((hoveredGoal.completed / hoveredGoal.total) * 100)
              : 0;
            return (
              <div style={{
                background: "#111",
                color: "#fff",
                padding: 12,
                borderRadius: 8,
                fontSize: 13,
                maxWidth: 260
              }}>
                <strong style={{ display: "block", marginBottom: 6 }}>{hoveredGoal.name}</strong>
                <div style={{ marginBottom: 8 }}>
                  Progress: {hoveredGoal.completed}/{hoveredGoal.total} ({percent}%)
                </div>
                {Array.isArray(hoveredGoal.milestones) && hoveredGoal.milestones.length > 0 && (
                  <>
                    <hr style={{ borderColor: "#2b2b2b", margin: "6px 0" }} />
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {hoveredGoal.milestones.map((m, i) => (
                        <li key={i} style={{ fontSize: 12, color: m.completed ? "#9ee6c1" : "#ddd", marginBottom: 4 }}>
                          {m.text} <span style={{ opacity: 0.85 }}>{m.completed ? "✅" : "⏳"}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            );
          }}
        />
        {data.map((goal, idx) => {
          const orderIndex = idx;
          const innerRadius = baseInner + (totalRings - 1 - orderIndex) * (ringThickness + gap);
          const outerRadius = innerRadius + ringThickness;
          const completedVal = Number(goal.completed || 0);
          const remainingVal = Math.max(0, Number((goal.total || 0) - completedVal));
          const pieData = [
            { name: goal.name, value: completedVal, completed: completedVal, total: goal.total || 0, milestones: goal.milestones || [] },
            { name: "", value: remainingVal }
          ];
          return (
            <Pie
              key={goal.name + "-" + idx}
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              onMouseEnter={(_, sectorIndex, e) => {
                if (sectorIndex === 0) {
                  setHoveredGoal({
                    name: goal.name,
                    completed: completedVal,
                    total: goal.total || 0,
                    milestones: goal.milestones || []
                  });
                } else setHoveredGoal(null);
              }}
              onMouseLeave={() => setHoveredGoal(null)}>
              <Cell fill={COLORS[idx % COLORS.length]} />
              <Cell fill="transparent" />
            </Pie>
          );
        })}
      </PieChart>
    </ResponsiveContainer>
  );
}
