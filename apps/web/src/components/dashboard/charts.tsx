"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface EarningsChartProps {
  data: { month: string; amount: number }[];
}

export function EarningsAreaChart({ data }: EarningsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#64748b"
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value)
          }
          labelStyle={{ color: "#1e293b" }}
        />
        <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#d1fae5" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface RevenueBarChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#64748b"
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value)
          }
        />
        <Bar dataKey="revenue" fill="#1e293b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface FleetPieChartProps {
  data: { name: string; value: number; color: string }[];
}

export function FleetPieChart({ data }: FleetPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface RevenueLineChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#64748b"
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value)
          }
        />
        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
