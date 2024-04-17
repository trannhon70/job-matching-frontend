"use client";

import useUserProfile from "@/hooks/employee/useUserProfile";
import {
  Certificate,
  Education,
  PersonalInformation,
  Resume,
  Skills,
  WorkExp,
} from "./_components";

const User = () => {
  const { data } = useUserProfile();
  if (!data) return <></>;
  return (
    <>
      <Resume data={data} />
      <PersonalInformation data={data} />
      <Education />
      <Skills />
      <Certificate />
      <WorkExp />
      {/* <WorkPreference /> */}
    </>
  );
};

export default User;
