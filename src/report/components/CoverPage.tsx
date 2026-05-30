import { Page, View, Text, StyleSheet, Svg, Rect } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS, getScoreColor } from "@/report/types";
import { PageFooter } from "@/report/components/shared/PageFooter";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 60,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  topBar: {
    height: 6,
    backgroundColor: COLORS.ACCENT,
    marginBottom: 40,
    borderRadius: 3,
  },
  label: {
    fontSize: 8,
    letterSpacing: 2,
    color: COLORS.ACCENT,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  companyName: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    lineHeight: 1.1,
    marginBottom: 32,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginBottom: 28,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 28,
  },
  metricBox: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  metricLabel: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  metricSub: {
    fontSize: 8,
    color: COLORS.TEXT_SECONDARY,
  },
  summaryBox: {
    backgroundColor: COLORS.BG_SECTION,
    borderRadius: 8,
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.ACCENT,
    marginBottom: 28,
  },
  summaryLabel: {
    fontSize: 7,
    letterSpacing: 1.5,
    color: COLORS.ACCENT,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 10,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 1.7,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    fontSize: 8,
    color: COLORS.TEXT_SECONDARY,
  },
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SCORE_BAR_H = 8;
// Inner card width: (505 - 2*24 gaps) / 3 cols - 2*16 padding ≈ 120pt
const CARD_BAR_W = 110;

interface CoverPageProps {
  data: ReportData;
}

export function CoverPage({ data }: CoverPageProps) {
  const { business, diagnostic } = data;
  const scoreColor = getScoreColor(diagnostic.overall_score);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topBar} />

      <Text style={styles.label}>Diagnóstico de Madurez IA</Text>
      <Text style={styles.title}>Informe Ejecutivo</Text>
      <Text style={styles.companyName}>{business.companyName}</Text>

      <View style={styles.divider} />

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Puntaje Global</Text>
          <Text style={[styles.metricValue, { color: scoreColor }]}>
            {diagnostic.overall_score}
            <Text style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY }}>/100</Text>
          </Text>
          <Svg width={CARD_BAR_W} height={SCORE_BAR_H} style={{ marginTop: 4 }}>
            <Rect x={0} y={0} width={CARD_BAR_W} height={SCORE_BAR_H} rx={4} fill={COLORS.SCORE_TRACK} />
            <Rect
              x={0}
              y={0}
              width={Math.round((diagnostic.overall_score / 100) * CARD_BAR_W)}
              height={SCORE_BAR_H}
              rx={4}
              fill={scoreColor}
            />
          </Svg>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Nivel de Madurez</Text>
          <Text style={styles.metricValue}>{diagnostic.score_label}</Text>
          <Text style={styles.metricSub}>Nivel actual</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Sector</Text>
          <Text style={styles.metricValue}>{business.sector}</Text>
          <Text style={styles.metricSub}>{business.employeeCount} empleados</Text>
        </View>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Estado Actual</Text>
        <Text style={styles.summaryText}>{diagnostic.score_description}</Text>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          Generado el {formatDate(diagnostic.created_at)}
        </Text>
        <Text style={styles.dateText}>Confidencial · ReadIA</Text>
      </View>

      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
