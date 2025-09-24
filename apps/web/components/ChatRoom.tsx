import axios from "axios";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
  const { data } = await axios.get(
    `http://localhost:4004/api/v1/chats/${roomId}`
  );
  // console.log(data);
  // console.log(data.messages);
  return data.messages;
}

export default async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);

  // console.log("inside components", messages);
  return <ChatRoomClient id={id} messages={messages} />;
}
