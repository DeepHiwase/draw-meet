import React from "react";
import ChatRoom from "../../../components/ChatRoom";

// async function getRoomId(slug: string) {
//   const  {data} = await axios.get(`http://localhost:4004/api/v1/rooms/${slug}`);
//   return data.room.id;
// }

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const parsedData = await params;
  const roomId = await parsedData.roomId;
  // console.log(typeof roomId);

  return <ChatRoom id={roomId} />;
}
