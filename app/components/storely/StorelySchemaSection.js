"use client";

import dynamic from "next/dynamic";
import { STORELY_DBML } from "../../data/storelySchema";

/* Dynamically import SchemaViewer since it uses canvas / window APIs */
const SchemaViewer = dynamic(() => import("../SchemaViewer"), {
  ssr: false,
  loading: () => (
    <div className="schema-loading">
      <div className="schema-loading-spinner" />
      <span>Loading schema diagram…</span>
    </div>
  ),
});

export default function StorelySchemaSection() {
  return (
    <div className="project-section" id="schema-design">
      <h2 className="project-section-title">Database Schema</h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.9375rem",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}
      >
        The basic system design for Storely app. This can be scalable and
        modifiable as per the client requirement.
      </p>
      <SchemaViewer dbml={STORELY_DBML} />
    </div>
  );
}
