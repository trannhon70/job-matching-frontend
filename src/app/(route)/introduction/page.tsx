import { useMemo } from "react";
import { IntroductionCard } from "./_components";

const Introduction = () => {
  const introductionContent = useMemo(
    () => [
      {
        title: "EnglishWing Job world (tentative)",
        description: "A platform operator that helps you get a job abroad",
      },
      {
        title: "Service",
        description:
          "Services delivered by the platformJob information, interview, visa, departure",
      },
      {
        title: "Partners & Associations",
        description:
          "Various partner companies and associations around the world are supporting it",
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen">
      <div className="container py-20">
        <div className="grid grid-cols-3 gap-6">
          {introductionContent.map((i) => (
            <IntroductionCard
              description={i.description}
              title={i.title}
              key={i.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
