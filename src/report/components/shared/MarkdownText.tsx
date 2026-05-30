import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "@/report/types";

const styles = StyleSheet.create({
  h1: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    marginTop: 10,
    marginBottom: 4,
  },
  h2: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.PRIMARY_DARK,
    marginTop: 8,
    marginBottom: 3,
  },
  h3: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.TEXT_PRIMARY,
    marginTop: 6,
    marginBottom: 2,
  },
  paragraph: {
    fontSize: 9,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 9,
    color: COLORS.ACCENT,
    marginRight: 5,
    width: 8,
  },
  bulletText: {
    fontSize: 9,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 1.5,
    flex: 1,
  },
});

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "bullet"; text: string };

function parseMarkdown(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.split("\n");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("# ")) {
      blocks.push({ type: "h1", text: line.slice(2) });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      blocks.push({ type: "bullet", text: stripInline(line.slice(2)) });
    } else {
      blocks.push({ type: "p", text: stripInline(line) });
    }
  }

  return blocks;
}

function stripInline(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
}

interface MarkdownTextProps {
  children: string;
}

export function MarkdownText({ children }: MarkdownTextProps) {
  const blocks = parseMarkdown(children);

  return (
    <View>
      {blocks.map((block, i) => {
        if (block.type === "h1") return <Text key={i} style={styles.h1}>{block.text}</Text>;
        if (block.type === "h2") return <Text key={i} style={styles.h2}>{block.text}</Text>;
        if (block.type === "h3") return <Text key={i} style={styles.h3}>{block.text}</Text>;
        if (block.type === "bullet") {
          return (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{block.text}</Text>
            </View>
          );
        }
        return <Text key={i} style={styles.paragraph}>{block.text}</Text>;
      })}
    </View>
  );
}
