import { Page, View, StyleSheet } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
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
  content: {
    flex: 1,
  },
});

interface ConclusionsSectionProps {
  data: ReportData;
}

export function ConclusionsSection({ data }: ConclusionsSectionProps) {
  const { business, diagnostic } = data;
  if (!diagnostic.conclusions_markdown) return null;

  return (
    <Page size="A4" style={styles.page}>
      <SectionHeader title="Conclusiones" label="Análisis Final" />
      <View style={styles.content}>
        <MarkdownText>{diagnostic.conclusions_markdown}</MarkdownText>
      </View>
      <PageFooter companyName={business.companyName} />
    </Page>
  );
}
