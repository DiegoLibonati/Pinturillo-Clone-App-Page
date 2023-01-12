import { Socket } from "socket.io";
import { rooms } from "..";
import { getAllUsers } from "./getAllUsers";
import { randomWords } from "./randomWords";

const listWords = [
  "humano",
  "persona",
  "mujer",
  "bebe",
  "señor",
  "señora",
  "cuerpo",
  "pierna",
  "cabeza",
  "brazo",
  "estomago",
  "muñeca",
  "abdomen",
  "musculo",
  "primo",
  "prima",
  "especie",
  "tigre",
  "raton",
  "ciervo",
  "leon",
  "bebida",
  "planta",
  "edad",
  "calendario",
  "fecha",
  "hora",
  "dia",
  "espacio",
  "tierra",
  "fuego",
  "plata",
  "oro",
  "equipo",
  "capital",
  "libertad",
  "compañia",
  "almacen",
  "hotel",
  "cuenta",
  "boleto",
  "edificio",
  "casa",
  "zapato",
  "abrigo",
  "vehiculo",
  "ruta",
  "aleman",
  "ingles",
  "chino",
  "color",
  "blanco",
  "negro",
  "curso",
  "clase",
  "informacion",
  "dato",
  "estudio",
  "busqueda",
  "duda",
  "profesion",
  "empleo",
  "tres",
  "formalidad",
  "secreto",
  "actividad",
  "programa",
  "proyecto",
  "solucion",
  "resultado",
  "fracaso",
  "causa",
  "etapa",
  "paso",
  "avance",
  "malo",
  "bueno",
  "lateral",
  "arco",
  "patear",
  "futbol",
];

export const startGameRoom = (roomId: string, socket: Socket): void => {
  if (!rooms[roomId]) return;
  getAllUsers(socket);
  let roomParticipants = rooms[roomId].participants;

  if (roomParticipants) {
    roomParticipants = rooms[roomId].participants.map((user) => {
      for (let i = 0; i < rooms[roomId].totalRounds; i++) {
        const randomWord = randomWords(listWords);
        user.words = [...user.words, randomWord];
      }
      return user;
    });

    socket.to(roomId).emit("start-game-room", roomId, roomParticipants);
  }
};
