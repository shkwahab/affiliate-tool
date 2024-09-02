import type { MetaFunction } from "@remix-run/node";
import React from "react";
import ForcastGraph from "~/components/ForcastGraph";
export const meta: MetaFunction = () => {
  return [
    { title: "Affiliate Tool" },
    { name: "description", content: "" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      <ForcastGraph />
    </React.Fragment>
  );
}
