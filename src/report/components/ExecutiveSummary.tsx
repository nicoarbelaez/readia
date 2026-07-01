import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS, getScoreColor, getScoreLevel, getPillarScore } from "@/report/types";
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
  scoreRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    flex: 1,
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.TEXT_SECONDARY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  table: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.PRIMARY_DARK,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 8,
    color: COLORS.WHITE,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    alignItems: "center",
  },
  tableRowAlt: {
    backgroundColor: COLORS.BG_LIGHT,
  },
  colPillar: { flex: 3 },
  colScore: { flex: 1, textAlign: "center" as const },
  colLevel: { flex: 2, textAlign: "center" as const },
  cellText: {
    fontSize: 9,
    color: COLORS.TEXT_PRIMARY,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: "center" as const,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.WHITE,
  },
  noteBox: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 6,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.PRIMARY_MID,
  },
  noteText: {
    fontSize: 9,
    color: COLORS.PRIMARY_MID,
    lineHeight: 1.6,
  },
});

function getLevelBadgeColor(score: number): string {
  return getScoreColor(score);
}

interface ExecutiveSummaryProps {
  data: ReportData;
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { business, diagnostic } = data;
  const scoreColor = getScoreColor(diagnostic.overall_score);

  return (
    <Page size="A4" style={styles.page}>
      <SectionHeader title="Resumen Ejecutivo" label="Informe de Madurez IA" />

      <View style={styles.scoreRow}>
        <View style={styles.scoreCard}>
          <Text style={[styles.scoreNumber, { color: scoreColor }]}>
            {diagnostic.overall_score}
          </Text>
          <Text style={styles.scoreLabel}>Puntaje Global / 100</Text>
        </View>
        <View style={styles.scoreCard}>
          <Text style={[styles.scoreNumber, { fontSize: 18, color: COLORS.PRIMARY_DARK }]}>
            {diagnostic.score_label}
          </Text>
          <Text style={styles.scoreLabel}>Nivel de Madurez</Text>
        </View>
        <View style={styles.scoreCard}>
          <Text style={[styles.scoreNumber, { fontSize: 18, color: COLORS.PRIMARY_DARK }]}>
            {diagnostic.diagnostic_pillars.length}
          </Text>
          <Text style={styles.scoreLabel}>Pilares Analizados</Text>
        </View>
        <View style={styles.scoreCard}>
          <Text style={[styles.scoreNumber, { fontSize: 18, color: COLORS.PRIORITY_HIGH }]}>
            {diagnostic.diagnostic_recommendations.filter((r) => r.priority === "Alta").length}
          </Text>
          <Text style={styles.scoreLabel}>Prioridad Alta</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colPillar]}>Pilar</Text>
          <Text style={[styles.tableHeaderText, styles.colScore]}>Puntaje</Text>
          <Text style={[styles.tableHeaderText, styles.colLevel]}>Nivel</Text>
        </View>
        {diagnostic.diagnostic_pillars.map((pillar, i) => {
          const score = getPillarScore(pillar.diagnostic_pillar_data);
          const level = getScoreLevel(score);
          const badgeColor = getLevelBadgeColor(score);
          return (
            <View
              key={i}
              style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <View style={styles.colPillar}>
                <Text style={styles.cellText}>{pillar.title}</Text>
              </View>
              <View style={styles.colScore}>
                <Text style={[styles.cellText, { fontFamily: "Helvetica-Bold" }]}>
                  {score}/100
                </Text>
              </View>
              <View style={styles.colLevel}>
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                  <Text style={styles.badgeText}>{level}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {diagnostic.diagnostic_recommendations.length > 0 && (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Se identificaron {diagnostic.diagnostic_recommendations.length} recomendaciones estratégicas,
            de las cuales {diagnostic.diagnostic_recommendations.filter((r) => r.priority === "Alta").length} son
            de prioridad alta. Consulte la sección de Recomendaciones para el detalle completo.
          </Text>
        </View>
      )}

      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
