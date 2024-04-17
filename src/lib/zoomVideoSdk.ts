"use client";

import ZoomVideo, { Participant, Stream, VideoClient } from "@zoom/videosdk";

export type ZoomClient = typeof VideoClient;
export type MediaStream = typeof Stream;
export type ParticipantType = Participant;

export const client = ZoomVideo.createClient();
