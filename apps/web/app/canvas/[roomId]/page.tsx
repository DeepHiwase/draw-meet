import RoomCanvas from "../../../components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: { roomId: string };
}) {
  const parsedData = await params;
  const roomId = parsedData.roomId;

  console.log(roomId);

  return <RoomCanvas roomId={roomId} />;
}
