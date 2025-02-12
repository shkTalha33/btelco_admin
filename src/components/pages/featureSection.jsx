import React from "react";
import CreateFeatureSection from "../dashboard/FeatureSectionCompoenet/CreateFeatureSection";
import ListSection from "../dashboard/FeatureSectionCompoenet/ListSection";

export default function FeatureSection() {
  return (
    <div>
      <main className="poppins_regular add-firm text-sm lg:container  mx-auto">
        <CreateFeatureSection />
        <ListSection />
      </main>
    </div>
  );
}
