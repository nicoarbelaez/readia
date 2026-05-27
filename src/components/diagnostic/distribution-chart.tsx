import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { CardBento } from "@/components/diagnostic/card-bento";

export function DistributionChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <CardBento
      title="Distribución"
      infoTooltipContent="Peso relativo de cada pilar en su puntaje final."
      cardContent={
        <div className="flex min-h-full w-full flex-col md:h-[280px]">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart responsive>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={4}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{
                    color: "#1e293b",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend simplificado */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {data.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center text-xs text-slate-500">
                <div
                  className="mr-1.5 h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
