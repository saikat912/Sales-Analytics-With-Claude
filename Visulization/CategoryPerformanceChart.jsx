import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { category: 'Basketball Shoes', revenue: 1009.5, profit: 381.8, quantity: 27169.6 },
  { category: 'Running Shoes', revenue: 766.6, profit: 288.8, quantity: 23928.6 },
  { category: 'Athletic Apparel', revenue: 728.9, profit: 254.3, quantity: 26699.3 },
  { category: 'Accessories', revenue: 292.8, profit: 93.5, quantity: 28154.5 },
];

const COLORS = {
  revenue: '#2a78d6',
  profit: '#1baf7a',
  quantity: '#eda100',
};

const LABELS = {
  revenue: 'Revenue ($B)',
  profit: 'Profit ($B)',
  quantity: 'Quantity sold (M units)',
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.5px solid #d3d1c7',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        boxShadow: 'none',
      }}
    >
      <p style={{ margin: '0 0 6px', fontWeight: 500, color: '#0b0b0b' }}>{label}</p>
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '2px 0' }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 2,
              background: entry.color,
              display: 'inline-block',
            }}
          />
          <span style={{ color: '#52514e' }}>{LABELS[entry.dataKey]}:</span>
          <span style={{ fontWeight: 500, color: '#0b0b0b' }}>
            {entry.dataKey === 'quantity'
              ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'M'
              : '$' + entry.value.toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'B'}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 8,
        fontSize: 13,
        color: '#52514e',
        flexWrap: 'wrap',
      }}
    >
      {payload.map((entry) => (
        <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: entry.color,
              display: 'inline-block',
            }}
          />
          <span>{LABELS[entry.dataKey]}</span>
        </div>
      ))}
    </div>
  );
}

export default function CategoryPerformanceChart() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 820,
        margin: '0 auto',
        padding: '1.5rem',
        background: '#fcfcfb',
        borderRadius: 12,
        border: '0.5px solid #e1e0d9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 500,
          margin: '0 0 2px',
          color: '#0b0b0b',
        }}
      >
        Revenue, profit &amp; quantity sold by category
      </h2>
      <p style={{ fontSize: 13, color: '#898781', margin: '0 0 1rem' }}>
        Dollar metrics on the left axis, unit volume on the right axis
      </p>

      <ResponsiveContainer width="100%" height={420}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
          onMouseMove={(state) => {
            if (state && state.activeLabel) setHovered(state.activeLabel);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />

          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: '#52514e' }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            label={{
              value: 'Product category',
              position: 'insideBottom',
              offset: -20,
              fontSize: 13,
              fill: '#52514e',
            }}
          />

          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: '#52514e' }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            tickFormatter={(v) => `$${v}B`}
            label={{
              value: 'Revenue / Profit ($B)',
              angle: -90,
              position: 'insideLeft',
              fontSize: 13,
              fill: '#52514e',
              style: { textAnchor: 'middle' },
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: '#52514e' }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
            label={{
              value: 'Quantity sold (M units)',
              angle: 90,
              position: 'insideRight',
              fontSize: 13,
              fill: '#52514e',
              style: { textAnchor: 'middle' },
            }}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(11,11,11,0.04)' }} />
          <Legend content={<CustomLegend />} verticalAlign="top" />

          <Bar yAxisId="left" dataKey="revenue" name="revenue" radius={[4, 4, 0, 0]} maxBarSize={34}>
            {data.map((entry, i) => (
              <Cell
                key={`rev-${i}`}
                fill={COLORS.revenue}
                opacity={hovered && hovered !== entry.category ? 0.4 : 1}
              />
            ))}
          </Bar>
          <Bar yAxisId="left" dataKey="profit" name="profit" radius={[4, 4, 0, 0]} maxBarSize={34}>
            {data.map((entry, i) => (
              <Cell
                key={`prof-${i}`}
                fill={COLORS.profit}
                opacity={hovered && hovered !== entry.category ? 0.4 : 1}
              />
            ))}
          </Bar>
          <Bar yAxisId="right" dataKey="quantity" name="quantity" radius={[4, 4, 0, 0]} maxBarSize={34}>
            {data.map((entry, i) => (
              <Cell
                key={`qty-${i}`}
                fill={COLORS.quantity}
                opacity={hovered && hovered !== entry.category ? 0.4 : 1}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
