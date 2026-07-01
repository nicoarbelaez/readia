import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "@/report/types";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 7,
    letterSpacing: 1.5,
    color: COLORS.ACCENT,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 6,
  },
  rule: {
    height: 2,
    backgroundColor: COLORS.ACCENT,
    width: 40,
  },
});

interface SectionHeaderProps {
  title: string;
  label?: string;
}

export function SectionHeader({ title, label }: SectionHeaderProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rule} />
    </View>
  );
}
