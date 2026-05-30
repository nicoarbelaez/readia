import { Page, View, Text, StyleSheet, Svg, Rect, Line } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS } from "@/report/types";
import { SectionHeader } from "@/report/components/shared/SectionHeader";
import { PageFooter } from "@/report/components/shared/PageFooter";
import { parseTimelineMonths } from "@/report/utils/build-phases";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 45,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  labelCell: {
    width: 120,
    paddingRight: 6,
  },
  labelText: {
    fontSize: 8,
    color: COLORS.TEXT_PRIMARY,
  },
  labelTextBold: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
  },
  headerRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  headerSpacer: {
    width: 120,
  },
  monthCell: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
  },
  legendRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
  },
});

const CHART_WIDTH = 385;
const ROW_HEIGHT = 10;

const PHASE_COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

function computeMaxMonth(phases: ReportData["roadmapPhases"]): number {
  if (!phases) return 12;
  let max = 12;
  for (const phase of phases) {
    for (const initiative of phase.initiatives) {
      const parsed = parseTimelineMonths(initiative.timeline);
      if (parsed && parsed.end > max) max = parsed.end;
    }
    const phParsed = parseTimelineMonths(phase.timeline);
    if (phParsed && phParsed.end > max) max = phParsed.end;
  }
  return Math.max(max, 6);
}

interface GanttSectionProps {
  data: ReportData;
}

type GanttRow = {
  label: string;
  start: number;
  end: number;
  color: string;
  isPhase: boolean;
};

export function GanttSection({ data }: GanttSectionProps) {
  const { business, roadmapPhases } = data;
  if (!roadmapPhases || roadmapPhases.length === 0) return null;

  const maxMonth = computeMaxMonth(roadmapPhases);
  const monthWidth = CHART_WIDTH / maxMonth;

  const rows: GanttRow[] = [];

  roadmapPhases.forEach((phase, pi) => {
    const color = PHASE_COLORS[pi % PHASE_COLORS.length];
    const phaseParsed = parseTimelineMonths(phase.timeline);
    if (phaseParsed) {
      rows.push({
        label: `F${pi + 1}: ${phase.label}`,
        ...phaseParsed,
        color,
        isPhase: true,
      });
    }
    phase.initiatives.forEach((init) => {
      const parsed = parseTimelineMonths(init.timeline);
      if (parsed) {
        rows.push({
          label: init.label,
          ...parsed,
          color: color + "BB",
          isPhase: false,
        });
      }
    });
  });

  const monthLabels = Array.from({ length: maxMonth }, (_, i) => i + 1);

  return (
    <Page size="A4" style={styles.page}>
      <SectionHeader title="Timeline Ejecutivo" label="Gantt de Implementación" />

      {/* Month header row */}
      <View style={styles.headerRow}>
        <View style={styles.headerSpacer} />
        {monthLabels.map((m) => (
          <View key={m} style={[styles.monthCell, { width: monthWidth }]}>
            <Text style={styles.monthText}>{m}</Text>
          </View>
        ))}
      </View>

      {/* Gantt rows */}
      {rows.map((row, i) => {
        const barX = (row.start - 1) * monthWidth;
        const barW = Math.max((row.end - row.start + 1) * monthWidth, 4);

        return (
          <View key={i} style={styles.row}>
            <View style={styles.labelCell}>
              <Text
                style={row.isPhase ? styles.labelTextBold : styles.labelText}
              >
                {row.label}
              </Text>
            </View>
            <Svg width={CHART_WIDTH} height={ROW_HEIGHT}>
              {/* Track background */}
              <Rect
                x={0}
                y={0}
                width={CHART_WIDTH}
                height={ROW_HEIGHT}
                fill={COLORS.BG_SECTION}
              />
              {/* Grid lines */}
              {monthLabels.map((m) => (
                <Line
                  key={m}
                  x1={m * monthWidth}
                  y1={0}
                  x2={m * monthWidth}
                  y2={ROW_HEIGHT}
                  stroke={COLORS.BORDER}
                  strokeWidth={0.5}
                />
              ))}
              {/* Bar */}
              <Rect
                x={barX}
                y={1}
                width={barW}
                height={ROW_HEIGHT - 2}
                rx={3}
                fill={row.color}
              />
            </Svg>
          </View>
        );
      })}

      {/* Axis bottom line */}
      <View style={{ marginBottom: 8 }}>
        <Svg width={505} height={2}>
          <Line x1={120} y1={1} x2={505} y2={1} stroke={COLORS.BORDER} strokeWidth={1} />
        </Svg>
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        {roadmapPhases.map((phase, pi) => (
          <View key={pi} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: PHASE_COLORS[pi % PHASE_COLORS.length] },
              ]}
            />
            <Text style={styles.legendText}>
              Fase {pi + 1}: {phase.label}
            </Text>
          </View>
        ))}
      </View>

      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
