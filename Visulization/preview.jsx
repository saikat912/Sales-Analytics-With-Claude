import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    category: "Accessories",
    revenue: 154835300,
    profit: 25481820,
    units: 4856544,
    profitMargin: 16.46,
  },
  {
    category: "Activewear",
    revenue: 381891000,
    profit: 49555430,
    units: 12153604,
    profitMargin: 12.98,
  },
  {
    category: "Intimates",
    revenue: 542039700,
    profit: 92082840,
    units: 16830797,
    profitMargin: 16.99,
  },
  {
    category: "Mens Apparel",
    revenue: 3972629000,
    profit: 483377300,
    units: 102132217,
    profitMargin: 12.17,
  },
  {
    category: "Swim",
    revenue: 233459100,
    profit: 32763450,
    units: 7521466,
    profitMargin: 14.03,
  },
  {
    category: "Tops",
    revenue: 227077800,
    profit: 22385340,
    units: 7193288,
    profitMargin: 9.86,
  },
  {
    category: "Womens Apparel",
    revenue: 3999403000,
    profit: 493448000,
    units: 102475684,
    profitMargin: 12.34,
  },
];

const currency = (value) =>
  "$" +
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const number = (value) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        padding: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,.15)",
        fontSize: 14,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 8,
          color: "#222",
        }}
      >
        {label}
      </div>

      <div style={{ color: "#2563eb", marginBottom: 4 }}>
        Revenue: <strong>{currency(d.revenue)}</strong>
      </div>

      <div style={{ color: "#16a34a", marginBottom: 4 }}>
        Operating Profit: <strong>{currency(d.profit)}</strong>
      </div>

      <div style={{ color: "#f59e0b", marginBottom: 4 }}>
        Units Sold: <strong>{number(d.units)}</strong>
      </div>

      <div
        style={{
          marginTop: 8,
          borderTop: "1px solid #eee",
          paddingTop: 8,
          color: "#111827",
        }}
      >
        <strong>Profit Margin:</strong>{" "}
        <span style={{ color: "#16a34a" }}>
          {d.profitMargin.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default function CategoryPerformanceChart() {
  return (
    <div
      style={{
        width: "100%",
        height: 650,
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: "#222",
        }}
      >
        Revenue, Operating Profit & Units Sold by Product Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 60,
            left: 70,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="category"
            interval={0}
            angle={-20}
            textAnchor="end"
            tick={{
              fontSize: 13,
              fill: "#222",
              fontWeight: 600,
            }}
            height={70}
          />

          <YAxis
            yAxisId="left"
            tickFormatter={currency}
            tick={{
              fill: "#222",
              fontSize: 12,
            }}
            label={{
              value: "Revenue / Profit ($)",
              angle: -90,
              position: "insideLeft",
              fill: "#222",
              fontSize: 13,
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={number}
            tick={{
              fill: "#222",
              fontSize: 12,
            }}
            label={{
              value: "Units Sold",
              angle: 90,
              position: "insideRight",
              fill: "#222",
              fontSize: 13,
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: 20,
              fontWeight: 600,
            }}
          />

          <Bar
            yAxisId="left"
            dataKey="revenue"
            name="Revenue"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            yAxisId="left"
            dataKey="profit"
            name="Operating Profit"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
          />

          <Line
            yAxisId="right"
            dataKey="units"
            name="Units Sold"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}