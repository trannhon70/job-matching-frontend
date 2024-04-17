import { CreateNoteModal, NotesList } from "./_components";

const NotePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <CreateNoteModal applicantId={params.id} />
      <NotesList applicantId={params.id} />
    </>
  );
};

export default NotePage;
