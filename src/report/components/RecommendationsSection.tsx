import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { COLORS } from "@/report/types";
import { SectionHeader } from "@/report/components/shared/SectionHeader";
import { PageFooter } from "@/report/components/shared/PageFooter";
import type { DiagnosticRecommendation } from "@/types/diagnostic";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 45,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  priorityGroup: {
    marginBottom: 20,
  },
  priorityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  priorityTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
  },
  recommendationCard: {
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  recNumber: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recText: {
    fontSize: 9,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 1.6,
    marginBottom: 4,
  },
  recCategory: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

type Priority = "Alta" | "Media" | "Baja";

const PRIORITY_COLORS: Record<Priority, string> = {
  Alta: COLORS.PRIORITY_HIGH,
  Media: COLORS.PRIORITY_MID,
  Baja: COLORS.PRIORITY_LOW,
};

const PRIORITY_ORDER: Priority[] = ["Alta", "Media", "Baja"];

interface RecommendationGroupProps {
  priority: Priority;
  items: DiagnosticRecommendation[];
  startIndex: number;
}

function RecommendationGroup({ priority, items, startIndex }: RecommendationGroupProps) {
  const color = PRIORITY_COLORS[priority];
  return (
    <View style={styles.priorityGroup}>
      <View style={styles.priorityHeader}>
        <View style={[styles.priorityDot, { backgroundColor: color }]} />
        <Text style={styles.priorityTitle}>Prioridad {priority}</Text>
        <Text style={{ fontSize: 8, color: COLORS.TEXT_SECONDARY }}>
          ({items.length} recomendacion{items.length !== 1 ? "es" : ""})
        </Text>
      </View>
      {items.map((rec, i) => (
        <View
          key={i}
          style={[styles.recommendationCard, { borderLeftColor: color }]}
        >
          <Text style={styles.recNumber}>Recomendación {startIndex + i + 1}</Text>
          <Text style={styles.recText}>{rec.text}</Text>
          {rec.category && (
            <Text style={styles.recCategory}>Área: {rec.category}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

interface RecommendationsSectionProps {
  data: ReportData;
}

export function RecommendationsSection({ data }: RecommendationsSectionProps) {
  const { business, diagnostic } = data;
  const all = diagnostic.diagnostic_recommendations;

  const grouped = PRIORITY_ORDER.reduce<Record<Priority, DiagnosticRecommendation[]>>(
    (acc, p) => {
      acc[p] = all.filter((r) => r.priority === p);
      return acc;
    },
    { Alta: [], Media: [], Baja: [] }
  );

  let runningIndex = 0;

  return (
    <Page size="A4" style={styles.page}>
      <SectionHeader
        title="Recomendaciones Estratégicas"
        label={`${all.length} recomendaciones identificadas`}
      />
      {PRIORITY_ORDER.map((priority) => {
        const items = grouped[priority];
        if (items.length === 0) return null;
        const startIndex = runningIndex;
        runningIndex += items.length;
        return (
          <RecommendationGroup
            key={priority}
            priority={priority}
            items={items}
            startIndex={startIndex}
          />
        );
      })}
      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
