"use client";

import avatar from "@/assets/images/default-avatar-company.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCompanyInformation from "@/hooks/employee/useCompanyInformation";
import { ReviewType } from "@/types/employee/company";
import Image from "next/image";
import { useEffect } from "react";
import { ReviewForm } from ".";

interface Props {
  id: number;
  reviewList: ReviewType[];
}
export const Review: React.FC<Props> = ({ id, reviewList }) => {
  const { setReviewsList, reviewsList } = useCompanyInformation();
  useEffect(() => {
    setReviewsList(reviewList);
  }, [reviewList, setReviewsList]);
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <div className="w-full bg-gradient-to-r from-indigo-900 to-indigo-500 px-6 py-3 text-lg font-semibold text-white">
        Review
      </div>
      <div className="w-full px-6 py-4">
        <ScrollArea className="mb-4 max-h-[20rem] overflow-y-auto">
          {reviewsList?.map((i) => (
            <div key={i.id} className="py-3 text-sm">
              <div className="flex items-center gap-2">
                <Avatar>
                  <Image
                    src={i?.user?.avatarUrl ?? avatar}
                    alt="ava"
                    fill
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-medium">
                  {i.user.firstName} {i.user.lastName}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{i.content}</p>
            </div>
          ))}
        </ScrollArea>
        <ReviewForm companyId={id} />
      </div>
    </div>
  );
};
