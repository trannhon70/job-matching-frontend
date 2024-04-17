import { FetchingJob } from "./_components";

const Job = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="min-h-screen bg-gray-800/10 py-4">
      <div className="container">
        <FetchingJob slug={params.slug} />
      </div>
    </div>
  );
};

export default Job;
