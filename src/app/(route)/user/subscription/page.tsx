"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useFetchListSaveApply from "@/hooks/employee/query/useFetchListSaveApply";
import {
  ApplyJobTab,
  CountBox,
  InterviewJobTab,
  SaveJobTab,
} from "./_components";

const Subscription = () => {
  useFetchListSaveApply();
  return (
    <Card className="p-6 shadow-md">
      <Tabs defaultValue="save" className="w-full">
        <CountBox />
        <TabsContent value="save">
          <SaveJobTab />
        </TabsContent>
        <TabsContent value="apply">
          <ApplyJobTab />
        </TabsContent>
        <TabsContent value="interview">
          <InterviewJobTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Subscription;
