import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Fragment, useMemo } from "react";

export const WorkPreference = () => {
  const workPreferenceTemplate = useMemo(
    () => [
      { title: "Country", content: "Lorem ipsum dolor sit amet." },
      { title: "Position", content: "Lorem ipsum dolor sit amet." },
      { title: "Job type", content: "Full time" },
      { title: "Min salary", content: "1000$" },
      { title: "Immigrate", content: "" },
      { title: "Description", content: "" },
    ],
    [],
  );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Work Preference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8 grid grid-cols-3 gap-1 overflow-hidden rounded-md">
          {workPreferenceTemplate.map((i) => (
            <Fragment key={i.title}>
              <div className="bg-indigo-50/60 p-2 text-center font-normal">
                {i.title}
              </div>
              <div className="col-span-2 bg-indigo-50/60 p-2 font-light">
                {i.content}
              </div>
            </Fragment>
          ))}
        </div>
        <Button className="flex items-center gap-3">
          <span>Edit</span> <Pencil size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};
