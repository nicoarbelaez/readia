import { View, Text, Svg, Rect, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "@/report/types";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 9,
    color: COLORS.TEXT_PRIMARY,
    width: 130,
  },
  pct: {
    fontSize: 9,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 6,
    width: 32,
  },
});

const BAR_WIDTH = 180;
const BAR_HEIGHT = 10;

interface HorizontalBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export function HorizontalBar({
  label,
  value,
  maxValue = 100,
  color = COLORS.SCORE_BAR,
}: HorizontalBarProps) {
  const pct = Math.min(Math.max(value / maxValue, 0), 1);
  const fillWidth = Math.round(BAR_WIDTH * pct);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Svg width={BAR_WIDTH} height={BAR_HEIGHT}>
        <Rect
          x={0}
          y={0}
          width={BAR_WIDTH}
          height={BAR_HEIGHT}
          rx={4}
          fill={COLORS.SCORE_TRACK}
        />
        {fillWidth > 0 && (
          <Rect
            x={0}
            y={0}
            width={fillWidth}
            height={BAR_HEIGHT}
            rx={4}
            fill={color}
          />
        )}
      </Svg>
      <Text style={styles.pct}>{Math.round(pct * 100)}%</Text>
    </View>
  );
}
