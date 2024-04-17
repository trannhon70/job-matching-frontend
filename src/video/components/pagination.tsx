/* eslint-disable */
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { Button } from "antd";
import classnames from "classnames";
import { useCallback } from "react";
import "./pagination.scss";
interface PaginationProps {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
  inSharing?: boolean;
}
const Pagination = (props: PaginationProps) => {
  const { page, totalPage, setPage, inSharing } = props;
  const pageIndication = `${page + 1}/${totalPage}`;
  const toPreviousPage = useCallback(() => {
    if (page > 0) {
      setPage(page - 1);
    }
  }, [page, setPage]);
  const toNextPage = useCallback(() => {
    if (page < totalPage - 1) {
      setPage(page + 1);
    }
  }, [page, totalPage, setPage]);
  return (
    <div
      className={classnames("pagination", {
        "in-sharing": inSharing,
      })}
    >
      <Button
        key="left"
        className="previous-page-button"
        icon={<CaretLeftFilled />}
        ghost={true}
        onClick={toPreviousPage}
      />
      <span className="text-white mt-1">{pageIndication}</span>
      <Button
        key="right"
        className="next-page-button"
        icon={<CaretRightFilled />}
        ghost={true}
        onClick={toNextPage}
      />
    </div>
  );
};

export default Pagination;
