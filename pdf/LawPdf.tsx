import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import type { Law } from "@/types/law";

const styles = StyleSheet.create({
  page: {
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 36,
    fontSize: 11,
    lineHeight: 1.35,
  },
  header: {
    position: "absolute",
    top: 16,
    left: 36,
    right: 36,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  logo: { width: 28, height: 28, marginRight: 10 },
  brandName: { fontSize: 12, fontWeight: 700, color: "#0f172a" },
  brandSub: { fontSize: 9, color: "#374151" },
  lawTitle: { fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#0f172a" },
  meta: { fontSize: 10, color: "#4b5563", marginBottom: 10 },
  h2: { fontSize: 13, fontWeight: 700, marginTop: 10, marginBottom: 2 },
  article: { marginBottom: 10 },
  footer: {
    position: "absolute",
    bottom: 16,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 6,
    fontSize: 9,
    color: "#4b5563",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export function LawPdf({ law, brand }: { law: Law; brand: { name: string; logo?: string; color?: string } }) {
  return (
    <Document title={law.title}>
      <Page size="A4" style={styles.page}>
        {/* Header (fixed) */}
        <View style={styles.header} fixed>
          {brand.logo ? <Image src={brand.logo} style={styles.logo} /> : null}
          <View>
            <Text style={[styles.brandName, brand.color ? { color: brand.color } : {}]}>{brand.name}</Text>
            <Text style={styles.brandSub}>Pregled zakona (PDF export)</Text>
          </View>
        </View>

        {/* Content */}
        <Text style={[styles.lawTitle, brand.color ? { color: brand.color } : {}]}>{law.title}</Text>
        {typeof law.officialGazette === "string" ? (
          <Text style={styles.meta}>Objava: {law.officialGazette}</Text>
        ) : Array.isArray(law.officialGazette) ? (
          <Text style={styles.meta}>
            Objave: {law.officialGazette.map((g: any) => `${g.no}${g.date ? ` (${g.date})` : ""}`).join(", ")}
          </Text>
        ) : null}

        {law.articles.map((a) => (
          <View key={a.number} style={styles.article}>
            <Text style={styles.h2}>Član {a.number}{a.title ? ` — ${a.title}` : ""}</Text>
            <Text>{a.text}</Text>

            {a.history?.length ? (
              <>
                <Text style={{ fontSize: 11, marginTop: 6, fontWeight: 700 }}>Istorija izmjena:</Text>
                {a.history.map((h, i) => (
                  <Text key={i} style={{ fontSize: 10 }}>
                    {h.date ? `(${h.date}) ` : ""}{h.text}
                  </Text>
                ))}
              </>
            ) : null}

            {a.amendments?.length ? (
              <>
                <Text style={{ fontSize: 11, marginTop: 6, fontWeight: 700 }}>Amandmani / izmjene:</Text>
                {a.amendments.map((am, i) => (
                  <Text key={i} style={{ fontSize: 10 }}>
                    {am.date ? `(${am.date}) ` : ""}{am.text || am.note || am.amendmentId}
                  </Text>
                ))}
              </>
            ) : null}

            {a.caseLaw?.length ? (
              <>
                <Text style={{ fontSize: 11, marginTop: 6, fontWeight: 700 }}>Sudska praksa:</Text>
                {a.caseLaw.map((cl, i) => (
                  <Text key={i} style={{ fontSize: 10 }}>
                    {cl.caseId}{cl.court ? ` — ${cl.court}` : ""}: {cl.description ?? ""}{cl.url ? ` (${cl.url})` : ""}
                  </Text>
                ))}
              </>
            ) : null}
          </View>
        ))}

        {/* Footer (fixed) */}
        <View style={styles.footer} fixed>
          <Text>© {new Date().getFullYear()} {brand.name}</Text>
          <Text render={({ pageNumber, totalPages }) => `Strana ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
