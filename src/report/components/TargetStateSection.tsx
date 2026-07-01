import { Page, View, Text, StyleSheet, Svg, Rect } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS, getScoreColor, getScoreLevel } from "@/report/types";
import { SectionHeader } from "@/report/components/shared/SectionHeader";
import { PageFooter } from "@/report/components/shared/PageFooter";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 45,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  statesRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 28,
  },
  stateCard: {
    flex: 1,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  stateLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  stateScore: {
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  stateLevel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  stateDesc: {
    fontSize: 8,
    textAlign: "center",
    lineHeight: 1.5,
  },
  arrowWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.ACCENT,
  },
  capabilitiesSection: {
    marginBottom: 24,
  },
  capTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
  },
  capGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  capItem: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 6,
    padding: 10,
    width: "47%",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.ACCENT,
  },
  capText: {
    fontSize: 9,
    color: COLORS.PRIMARY_MID,
    lineHeight: 1.5,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 9,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 6,
  },
});

const BAR_WIDTH = 505;
const BAR_H = 14;

function deriveExpectedCapabilities(data: ReportData): string[] {
  const caps: string[] = [];
  if (data.roadmapPhases) {
    for (const phase of data.roadmapPhases) {
      for (const init of phase.initiatives) {
        for (const kpi of init.kpis.slice(0, 2)) {
          if (kpi && !caps.includes(kpi)) caps.push(kpi);
        }
      }
    }
  }
  if (caps.length < 4) {
    const defaults = [
      "Equipo de IA interno consolidado",
      "Gobernanza de datos establecida",
      "Modelos de IA en producción",
      "KPIs de IA medidos y optimizados",
      "Políticas éticas de IA implementadas",
      "Cultura data-driven en toda la organización",
    ];
    for (const d of defaults) {
      if (!caps.includes(d)) caps.push(d);
      if (caps.length >= 6) break;
    }
  }
  return caps.slice(0, 6);
}

interface TargetStateSectionProps {
  data: ReportData;
}

export function TargetStateSection({ data }: TargetStateSectionProps) {
  const { business, diagnostic } = data;
  const currentScore = diagnostic.overall_score;
  const targetScore = Math.min(currentScore + 35, 100);
  const currentColor = getScoreColor(currentScore);
  const targetColor = getScoreColor(targetScore);
  const capabilities = deriveExpectedCapabilities(data);

  const currentFill = Math.round((currentScore / 100) * BAR_WIDTH);
  const targetFill = Math.round((targetScore / 100) * BAR_WIDTH);

  return (
    <Page size="A4" style={styles.page}>
      <SectionHeader title="Estado Objetivo" label="Transformación Esperada" />

      <View style={styles.statesRow}>
        <View
          style={[
            styles.stateCard,
            { backgroundColor: "#FFF7F7", borderColor: currentColor + "44" },
          ]}
        >
          <Text style={[styles.stateLabel, { color: currentColor }]}>Estado Actual</Text>
          <Text style={[styles.stateScore, { color: currentColor }]}>
            {currentScore}
          </Text>
          <Text style={[styles.stateLevel, { color: COLORS.PRIMARY_DARK }]}>
            {getScoreLevel(currentScore)}
          </Text>
          <Text style={[styles.stateDesc, { color: COLORS.TEXT_SECONDARY }]}>
            {diagnostic.score_label}
          </Text>
        </View>

        <View style={styles.arrowWrapper}>
          <Text style={styles.arrow}>→</Text>
        </View>

        <View
          style={[
            styles.stateCard,
            { backgroundColor: "#F0FDF4", borderColor: targetColor + "44" },
          ]}
        >
          <Text style={[styles.stateLabel, { color: targetColor }]}>Estado Objetivo</Text>
          <Text style={[styles.stateScore, { color: targetColor }]}>
            {targetScore}
          </Text>
          <Text style={[styles.stateLevel, { color: COLORS.PRIMARY_DARK }]}>
            {getScoreLevel(targetScore)}
          </Text>
          <Text style={[styles.stateDesc, { color: COLORS.TEXT_SECONDARY }]}>
            Proyección al finalizar el roadmap
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>
          Progreso actual: {currentScore}/100
        </Text>
        <Svg width={BAR_WIDTH} height={BAR_H}>
          <Rect x={0} y={0} width={BAR_WIDTH} height={BAR_H} rx={6} fill={COLORS.SCORE_TRACK} />
          <Rect x={0} y={0} width={currentFill} height={BAR_H} rx={6} fill={currentColor} />
        </Svg>
        <Text style={[styles.progressLabel, { marginTop: 10 }]}>
          Objetivo proyectado: {targetScore}/100
        </Text>
        <Svg width={BAR_WIDTH} height={BAR_H}>
          <Rect x={0} y={0} width={BAR_WIDTH} height={BAR_H} rx={6} fill={COLORS.SCORE_TRACK} />
          <Rect x={0} y={0} width={targetFill} height={BAR_H} rx={6} fill={targetColor} />
        </Svg>
      </View>

      <View style={styles.capabilitiesSection}>
        <Text style={styles.capTitle}>Capacidades Esperadas al Finalizar</Text>
        <View style={styles.capGrid}>
          {capabilities.map((cap, i) => (
            <View key={i} style={styles.capItem}>
              <Text style={styles.capText}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
