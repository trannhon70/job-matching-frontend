import { QNATable, TableHeader } from "./_components/table";

const QNAPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container py-4">
        <TableHeader />
        <QNATable />
      </div>
    </div>
  );
};

export default QNAPage;
