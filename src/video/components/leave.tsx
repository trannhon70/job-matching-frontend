import { Button } from "antd";
interface LeaveButtonProps {
  onLeaveClick: () => void;
  onEndClick: () => void;
  isHost: boolean;
}

const LeaveButton = (props: LeaveButtonProps) => {
  const { onLeaveClick, onEndClick, isHost } = props;

  return isHost ? (
    <>
      <Button
        size="large"
        className="ml-4 !bg-red-600 !font-bold !text-white"
        onClick={onEndClick}
      >
        End
      </Button>
    </>
  ) : (
    // <Dropdown
    //   className="!text-white"
    //   menu={getAntdDropdownMenu([getAntdItem("End class", "end")], onEndClick)}
    //   placement="topRight">
    //   <Button
    //     size="large"
    //     className="!bg-red-500 !font-bold !text-white"
    //     onClick={onLeaveClick}>
    //     Leave
    //   </Button>
    // </Dropdown>
    <Button
      className="!rounded-md !bg-red-500 !px-4 !font-bold"
      ghost={true}
      shape="circle"
      size="large"
      onClick={onLeaveClick}
      title="Leave session"
    >
      Leave
    </Button>
  );
};

export { LeaveButton };
