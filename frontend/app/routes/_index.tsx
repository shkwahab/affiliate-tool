import type { MetaFunction } from "@remix-run/node";
import React from "react";
import ForcastGraph from "~/components/ForcastGraph";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      <ForcastGraph />
    </React.Fragment>
  );
}
