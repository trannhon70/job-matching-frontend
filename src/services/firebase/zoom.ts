import { realtime } from "@/lib/firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";

export const setActiveZoomMeeting = (zoomId: string, hasHost: boolean) => {
  set(ref(realtime, `zoom/${zoomId}`), {
    hasHost,
  });
};

export const isActiveZoomMeeting = async (zoomId: string) => {
  let isHostAvailable = false;
  const dbRef = ref(getDatabase());
  try {
    const res = await get(child(dbRef, `zoom/${zoomId}`));
    if (res.exists()) {
      isHostAvailable = !!res.val().hasHost;
      return isHostAvailable;
    } else {
      console.log("No data available");
    }
  } catch (error) {}
  return isHostAvailable;
};
