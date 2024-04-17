import { DetailJobPosting } from "./_components";

const DetailJobPostingPage = ({ params }: { params: { id: string } }) => {
  return <DetailJobPosting slug={params.id} />;
};

export default DetailJobPostingPage;
