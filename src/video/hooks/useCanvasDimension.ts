/* eslint-disable */
import { useMount, useSizeCallback } from "@/hooks/common";
import { MediaStream } from "@/lib/zoomVideoSdk";
import _ from "lodash";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
export function useCanvasDimension(
  mediaStream: MediaStream | null,
  videoRef: MutableRefObject<HTMLCanvasElement | null>,
) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const debounceRef = useRef(_.debounce(setDimension, 300));
  const onCanvasResize = useCallback(
    ({ width, height }: any) => {
      if (videoRef) {
        // eslint-disable-next-line no-useless-call
        debounceRef.current({ width, height });
      }
    },
    [videoRef],
  );
  useSizeCallback(videoRef.current, onCanvasResize);
  useMount(() => {
    if (videoRef.current) {
      const { width, height } = videoRef.current.getBoundingClientRect();
      setDimension({ width, height });
    }
  });
  useEffect(() => {
    const { width, height } = dimension;
    try {
      if (videoRef.current) {
        videoRef.current.width = width;
        videoRef.current.height = height;
      }
    } catch (e) {
      mediaStream?.updateVideoCanvasDimension(
        videoRef.current as HTMLCanvasElement,
        width,
        height,
      );
    }
  }, [mediaStream, dimension, videoRef]);
  return dimension;
}
