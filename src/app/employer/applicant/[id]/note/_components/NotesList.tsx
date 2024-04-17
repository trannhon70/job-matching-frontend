"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { ApplicantNoteType } from "@/types/employer/applicant";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { ApplicantStatusForm, NewNoteForm } from ".";

interface Props {
  applicantId: string;
}

export const NotesList: React.FC<Props> = ({ applicantId }) => {
  const { getListNoteByApplicant } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { isLoading, data, isIdle } = useQuery({
    queryKey: [
      `${EmployerQueryKeys.APPLICANT_NOTE}_${applicantId}`,
      isAuthenticated,
    ],
    queryFn: () => {
      return getListNoteByApplicant(applicantId);
    },
    onSuccess: (res) => {},
    enabled: !!isAuthenticated,
  });

  const res = useMemo(
    () => (data?.data.data as ApplicantNoteType) ?? {},
    [data],
  );

  if (isIdle) return <></>;

  return (
    <>
      {isLoading ? (
        <div className="mt-2">
          <ThreeCircles
            visible={true}
            height="30"
            width="30"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <>
          <ApplicantStatusForm
            applicantId={applicantId}
            statusValue={res.status}
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {res?.note?.map((i) => (
              <NewNoteForm applicantId={applicantId} data={i} key={i.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
