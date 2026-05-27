
import { CardBento } from "@/components/diagnostic/card-bento";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export interface PillarData {
  subject: string;
  A: number;
  fullMark: number;
}

export function RadarCard({
  title,
  description,
  data,
  wide = false,
}: {
  title: string;
  description: string;
  data: PillarData[];
  wide?: boolean;
}) {
  return (
    <CardBento
      title={title}
      infoTooltipContent={description}
      description={description}
      cardContent={
        <div className="min-h-[180px] w-full flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius={wide ? "75%" : "65%"}
              data={data}
            >
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name={title}
                dataKey="A"
                stroke="#2563eb"
                strokeWidth={3}
                fill="#3b82f6"
                fillOpacity={0.15}
                isAnimationActive={true}
              />
              <RechartsTooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      }
    />
  );
}
