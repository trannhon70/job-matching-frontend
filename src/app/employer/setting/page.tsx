"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { AccountTab } from "./_components/account";
import { ControlTab } from "./_components/control";
import { InformationTab } from "./_components/information";

const SettingPage = () => {
  const { isMaster, hasInitialize, isActive, isFirstMaster } =
    useCheckAuthorization();
  if (!hasInitialize) return <></>;
  if (!isActive) return <></>;
  if (!isMaster) return <>Do not have permission</>;
  return (
    <Tabs
      defaultValue={isFirstMaster ? "account" : "control"}
      className="w-full"
    >
      <TabsList>
        {isFirstMaster && (
          <>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
          </>
        )}

        <TabsTrigger value="control">Control</TabsTrigger>
      </TabsList>
      {isFirstMaster && (
        <>
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          <TabsContent value="information">
            <InformationTab />
          </TabsContent>
        </>
      )}

      <TabsContent value="control">
        <ControlTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingPage;
