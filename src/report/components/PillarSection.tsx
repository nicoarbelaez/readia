import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS, getScoreColor, getPillarScore } from "@/report/types";
import { SectionHeader } from "@/report/components/shared/SectionHeader";
import { HorizontalBar } from "@/report/components/shared/HorizontalBar";
import { PageFooter } from "@/report/components/shared/PageFooter";
import type { DiagnosticPillar } from "@/types/diagnostic";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 45,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  pillarCard: {
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: "hidden",
  },
  pillarHeader: {
    backgroundColor: COLORS.PRIMARY_DARK,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pillarTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.WHITE,
    flex: 1,
  },
  pillarScore: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  pillarBody: {
    padding: 16,
  },
  description: {
    fontSize: 9,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 1.6,
    marginBottom: 14,
  },
  metricsLabel: {
    fontSize: 7,
    letterSpacing: 1.5,
    color: COLORS.ACCENT,
    textTransform: "uppercase",
    marginBottom: 8,
  },
});

interface PillarCardProps {
  pillar: DiagnosticPillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  const score = getPillarScore(pillar.diagnostic_pillar_data);
  const scoreColor = getScoreColor(score);

  return (
    <View style={styles.pillarCard}>
      <View style={styles.pillarHeader}>
        <Text style={styles.pillarTitle}>
          {index + 1}. {pillar.title}
        </Text>
        <Text style={[styles.pillarScore, { color: scoreColor }]}>
          {score}/100
        </Text>
      </View>
      <View style={styles.pillarBody}>
        {pillar.description ? (
          <Text style={styles.description}>{pillar.description}</Text>
        ) : null}
        {pillar.diagnostic_pillar_data.length > 0 && (
          <>
            <Text style={styles.metricsLabel}>Métricas de Evaluación</Text>
            {pillar.diagnostic_pillar_data.map((d, i) => (
              <HorizontalBar
                key={i}
                label={d.subject}
                value={d.a_value}
                maxValue={d.full_mark}
                color={getScoreColor((d.a_value / d.full_mark) * 100)}
              />
            ))}
          </>
        )}
      </View>
    </View>
  );
}

interface PillarSectionProps {
  data: ReportData;
}

export function PillarSection({ data }: PillarSectionProps) {
  const { business, diagnostic } = data;
  const pillars = diagnostic.diagnostic_pillars;
  const half = Math.ceil(pillars.length / 2);

  const pages: DiagnosticPillar[][] = [];
  for (let i = 0; i < pillars.length; i += half) {
    pages.push(pillars.slice(i, i + half));
  }

  return (
    <>
      {pages.map((group, pi) => (
        <Page key={pi} size="A4" style={styles.page}>
          {pi === 0 && (
            <SectionHeader title="Diagnóstico por Pilares" label="Análisis Detallado" />
          )}
          {group.map((pillar, gi) => (
            <PillarCard key={gi} pillar={pillar} index={pi * half + gi} />
          ))}
          <PageFooter companyName={business.companyName} />
        </Page>
      ))}
    </>
  );
}
