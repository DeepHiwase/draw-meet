// Node Modules
import { type WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import config from "@repo/configs/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

// global veriable
type User = {
  userId: string;
  rooms: string[];
  ws: WebSocket;
};

// const users: User[] = [
//   {
//     userId: "samd",
//     rooms: ["room1", "room2"],
//     ws: socket,
//   },
//   {
//     userId: "msmd",
//     rooms: ["room1", "room2", "room3"],
//     ws: socket,
//   },
//   {
//     userId: "skdmak",
//     rooms: [],
//     ws: socket,
//   },
// ];

// TODO: Make this single ton or use statement library redux
// TODO: Make thsi optimal not to iterate to find . Use datastructuew if known

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (err) {
    return null;
  }
}

wss.on("connection", async function connection(ws, req) {
  // ws.on("error", console.error);

  // ws.on("message", function message(data) {
  //   console.log("received: %s", data);
  // });

  // ws.send("something");

  const url = req.url;
  if (!url) {
    return; // no futrher connection
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  // const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };

  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    // const parsedData = JSON.parse(data as unknown as string);
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      // TODO:first check if this room exists or not
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message; //TODO: check validation for massage length type and many

      // dumbest approach before sending it to room, put it in database -> Why dumb -> as it takes time to put in db
      // TODO:Better optimal faster approach is // `Queue` asynchronour Data structure
      await prismaClient.chat.create({
        data: {
          message,
          roomId,
          userId: userId,
        },
      });

      users.forEach((user) => {
        if (user?.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});

/* 
- add persistant data storage
- add auth so only allow authenticated or permission got users to send message or connect to room */
