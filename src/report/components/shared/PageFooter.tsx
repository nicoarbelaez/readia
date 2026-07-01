import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "@/report/types";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 24,
    left: 45,
    right: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    paddingTop: 8,
  },
  brand: {
    fontSize: 8,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: "Helvetica-Bold",
  },
  page: {
    fontSize: 8,
    color: COLORS.TEXT_SECONDARY,
  },
  confidential: {
    fontSize: 7,
    color: COLORS.TEXT_SECONDARY,
  },
});

interface PageFooterProps {
  companyName: string;
}

export function PageFooter({ companyName }: PageFooterProps) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.brand}>ReadIA · Diagnóstico de Madurez IA</Text>
      <Text style={styles.confidential}>{companyName} · Confidencial</Text>
      <Text
        style={styles.page}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}
