import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  Legend,
} from "recharts";

const data = [
  {week:1,revenue:156.0,event:""},
  {week:2,revenue:154.6,event:""},
  {week:3,revenue:154.2,event:""},
  {week:4,revenue:194.6,event:""},
  {week:5,revenue:137.9,event:""},
  {week:6,revenue:154.8,event:""},
  {week:7,revenue:140.7,event:""},
  {week:8,revenue:149.3,event:""},
  {week:9,revenue:152.8,event:""},
  {week:10,revenue:168.2,event:""},
  {week:11,revenue:164.5,event:""},
  {week:12,revenue:171.4,event:""},
  {week:13,revenue:175.0,event:""},
  {week:14,revenue:178.2,event:""},
  {week:15,revenue:173.4,event:""},
  {week:16,revenue:165.1,event:""},
  {week:17,revenue:160.4,event:""},
  {week:18,revenue:149.9,event:""},
  {week:19,revenue:129.3,event:"Lowest Sales"},
  {week:20,revenue:152.8,event:""},
  {week:21,revenue:165.7,event:""},
  {week:22,revenue:174.3,event:""},
  {week:23,revenue:180.5,event:""},
  {week:24,revenue:183.9,event:""},
  {week:25,revenue:186.1,event:""},
  {week:26,revenue:190.2,event:""},
  {week:27,revenue:188.5,event:""},
  {week:28,revenue:182.4,event:"Back-to-School"},
  {week:29,revenue:186.3,event:""},
  {week:30,revenue:191.8,event:""},
  {week:31,revenue:196.2,event:""},
  {week:32,revenue:199.4,event:""},
  {week:33,revenue:163.5,event:""},
  {week:34,revenue:145.9,event:""},
  {week:35,revenue:173.8,event:""},
  {week:36,revenue:182.2,event:""},
  {week:37,revenue:191.7,event:""},
  {week:38,revenue:198.4,event:""},
  {week:39,revenue:205.8,event:""},
  {week:40,revenue:212.6,event:""},
  {week:41,revenue:221.5,event:"Holiday Build-up"},
  {week:42,revenue:229.8,event:""},
  {week:43,revenue:236.4,event:"Black Friday Period"},
  {week:44,revenue:243.7,event:""},
  {week:45,revenue:264.3,event:"Peak Sales"},
  {week:46,revenue:247.9,event:"Holiday Shopping"},
  {week:47,revenue:250.9,event:"Christmas"},
  {week:48,revenue:246.3,event:"Christmas Week"},
  {week:49,revenue:259.4,event:"New Year"},
  {week:50,revenue:252.4,event:""},
  {week:51,revenue:247.8,event:""},
  {week:52,revenue:246.7,event:""}
];

const TooltipBox = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,.15)"
      }}
    >
      <div><b>Week {d.week}</b></div>
      <div>Revenue: <b>${d.revenue.toFixed(1)}M</b></div>
      {d.event && (
        <div style={{color:"#d97706",marginTop:6}}>
          <b>{d.event}</b>
        </div>
      )}
    </div>
  );
};

export default function SalesTrend() {
  return (
    <div style={{width:"100%",height:600,padding:20,background:"#fff"}}>
      <h2 style={{textAlign:"center"}}>
        Weekly Revenue Trend (52 Weeks)
      </h2>

      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{top:20,right:40,left:60,bottom:40}}
        >
          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis
            dataKey="week"
            label={{
              value:"Week",
              position:"insideBottom",
              offset:-5
            }}
            tick={{fontSize:12}}
          />

          <YAxis
            label={{
              value:"Revenue ($ Millions)",
              angle:-90,
              position:"insideLeft"
            }}
            tickFormatter={(v)=>`$${v}M`}
          />

          <Tooltip content={<TooltipBox/>}/>
          <Legend/>

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{r:3}}
            activeDot={{r:7}}
            name="Weekly Revenue"
          />

          <ReferenceDot
            x={45}
            y={264.3}
            r={7}
            fill="#dc2626"
            label="Peak"
          />

          <ReferenceDot
            x={19}
            y={129.3}
            r={7}
            fill="#16a34a"
            label="Low"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}