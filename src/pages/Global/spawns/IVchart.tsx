import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Pokemon } from "./types";

interface IVChartProps {
  pokemon: Pokemon;
}

const IVChart: React.FC<IVChartProps> = ({ pokemon }) => {
  const data = [
    { name: "Attack", value: pokemon.iv.attack },
    { name: "Defense", value: pokemon.iv.defense },
    { name: "HP", value: pokemon.iv.hp },
    { name: "Special Attack", value: pokemon.iv.special_attack },
    { name: "Special Defense", value: pokemon.iv.special_defense },
    { name: "Speed", value: pokemon.iv.speed },
  ];

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF4444", "#4B0082"];

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">{pokemon.name} IV Chart</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="mt-4">
        <ul className="flex flex-wrap justify-center gap-2 text-sm">
          {data.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-2">
              <span
                className="w-4 h-4 inline-block rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IVChart;
