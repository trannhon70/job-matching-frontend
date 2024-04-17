// import "./loading-layer.scss";

const LoadingLayer = (props: { content: any }) => {
  const { content } = props;
  return (
    <div className="loading-layer">
      {/* <LoadingOutlined style={{ fontSize: "86px", color: "#fff" }} /> */}
      <p>Loading...</p>
      <p className="loading-text">{content}</p>
    </div>
  );
};

export default LoadingLayer;
