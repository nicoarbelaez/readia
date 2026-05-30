import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReportData, RoadmapPhase, RoadmapInitiative } from "@/report/types";
import { COLORS } from "@/report/types";
import { SectionHeader } from "@/report/components/shared/SectionHeader";
import { MarkdownText } from "@/report/components/shared/MarkdownText";
import { PageFooter } from "@/report/components/shared/PageFooter";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 45,
    paddingTop: 45,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  phaseWrapper: {
    marginBottom: 28,
  },
  phaseHeader: {
    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
  },
  phaseTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  phaseNumber: {
    fontSize: 7,
    letterSpacing: 2,
    color: COLORS.ACCENT,
    textTransform: "uppercase",
  },
  phaseTl: {
    fontSize: 8,
    color: COLORS.TEXT_SECONDARY,
  },
  phaseTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  phaseObjective: {
    fontSize: 9,
    color: "#CBD5E1",
    lineHeight: 1.5,
  },
  initiativeCard: {
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: 8,
    overflow: "hidden",
  },
  initiativeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.BG_SECTION,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  initiativeTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  initiativeTl: {
    fontSize: 8,
    color: COLORS.ACCENT,
    fontFamily: "Helvetica-Bold",
    marginLeft: 8,
  },
  initiativeBody: {
    padding: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaLabel: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 8,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "Helvetica-Bold",
  },
  listLabel: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  listBullet: {
    fontSize: 8,
    color: COLORS.ACCENT,
    marginRight: 4,
    width: 8,
  },
  listText: {
    fontSize: 8,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    lineHeight: 1.5,
  },
  depSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F0F9FF",
    borderRadius: 4,
  },
  depLabel: {
    fontSize: 7,
    color: COLORS.PRIMARY_MID,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  depText: {
    fontSize: 8,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 1.6,
  },
});

interface InitiativeCardProps {
  initiative: RoadmapInitiative;
  index: number;
}

function InitiativeCard({ initiative, index }: InitiativeCardProps) {
  return (
    <View style={styles.initiativeCard}>
      <View style={styles.initiativeHeader}>
        <Text style={styles.initiativeTitle}>
          {index + 1}. {initiative.label}
        </Text>
        {initiative.timeline ? (
          <Text style={styles.initiativeTl}>{initiative.timeline}</Text>
        ) : null}
      </View>
      <View style={styles.initiativeBody}>
        {initiative.owner && (
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Responsable: </Text>
              <Text style={styles.metaValue}>{initiative.owner}</Text>
            </View>
          </View>
        )}

        {initiative.description && (
          <MarkdownText>{initiative.description}</MarkdownText>
        )}

        {initiative.objectives.length > 0 && (
          <>
            <Text style={styles.listLabel}>Objetivos</Text>
            {initiative.objectives.map((obj, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text>
                <Text style={styles.listText}>{obj}</Text>
              </View>
            ))}
          </>
        )}

        {initiative.kpis.length > 0 && (
          <>
            <Text style={styles.listLabel}>KPIs de Éxito</Text>
            {initiative.kpis.map((kpi, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>→</Text>
                <Text style={styles.listText}>{kpi}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
}

interface PhaseBlockProps {
  phase: RoadmapPhase;
  phaseNumber: number;
}

function PhaseBlock({ phase, phaseNumber }: PhaseBlockProps) {
  return (
    <View style={styles.phaseWrapper}>
      <View style={styles.phaseHeader}>
        <View style={styles.phaseTop}>
          <Text style={styles.phaseNumber}>Fase {phaseNumber}</Text>
          {phase.timeline ? (
            <Text style={styles.phaseTl}>{phase.timeline}</Text>
          ) : null}
        </View>
        <Text style={styles.phaseTitle}>{phase.label}</Text>
        {phase.objective && (
          <Text style={styles.phaseObjective}>{phase.objective}</Text>
        )}
      </View>

      {phase.initiatives.map((initiative, i) => (
        <InitiativeCard key={initiative.id} initiative={initiative} index={i} />
      ))}

      {phase.dependencies.length > 0 && (
        <View style={styles.depSection}>
          <Text style={styles.depLabel}>Dependencias previas</Text>
          <Text style={styles.depText}>
            {phase.dependencies.join(" → ")} → {phase.label}
          </Text>
        </View>
      )}
    </View>
  );
}

interface RoadmapSectionProps {
  data: ReportData;
}

export function RoadmapSection({ data }: RoadmapSectionProps) {
  const { business, roadmapPhases } = data;
  if (!roadmapPhases || roadmapPhases.length === 0) return null;

  const phaseChunks: RoadmapPhase[][] = [];
  let current: RoadmapPhase[] = [];
  let estimatedHeight = 0;
  const PAGE_BUDGET = 650;

  for (const phase of roadmapPhases) {
    const phaseHeight = 80 + phase.initiatives.length * 90;
    if (estimatedHeight + phaseHeight > PAGE_BUDGET && current.length > 0) {
      phaseChunks.push(current);
      current = [];
      estimatedHeight = 0;
    }
    current.push(phase);
    estimatedHeight += phaseHeight;
  }
  if (current.length > 0) phaseChunks.push(current);

  let phaseCounter = 0;

  return (
    <>
      {phaseChunks.map((chunk, pi) => (
        <Page key={pi} size="A4" style={styles.page}>
          {pi === 0 && (
            <SectionHeader title="Hoja de Ruta" label="Plan de Transformación IA" />
          )}
          {chunk.map((phase) => {
            phaseCounter++;
            return (
              <PhaseBlock key={phase.id} phase={phase} phaseNumber={phaseCounter} />
            );
          })}
          <PageFooter companyName={business.companyName} />
        </Page>
      ))}
    </>
  );
}
