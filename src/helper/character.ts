import axios from "axios";
import { BACKEND_URL } from "./consts";
import errorHandler from "./errorHandler";
import socketStore from "@/stores/socketStore";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export const getUserChars = async (): Promise<string[] | null> => {
  try {
    const characterIds = await axios.get(
      BACKEND_URL + "/char/usr-chars",
      config
    );

    if (characterIds.status !== 200) {
      errorHandler(characterIds);
      return null;
    }

    return characterIds.data;
  } catch (e) {
    errorHandler(e);
    return null;
  }
};

export const getCharacterData = async <T extends keyof CharacterSheet>(
  dataType: T
): Promise<CharacterSheet[T] | undefined> => {
  try {
    const characterIds = await getUserChars();
    if (!characterIds) return;

    const charUid: string = characterIds[0];

    const characterData = await axios.get<CharacterSheet[]>(
      `${BACKEND_URL}/char/${charUid}/${dataType}/data/`,
      config
    );

    if (characterData.status !== 200) {
      errorHandler(characterData);
      return;
    }

    return characterData.data as unknown as CharacterSheet[T];
  } catch (e) {
    errorHandler(e);
  }
};

export const getAllCharacterData = async () => {
  try {
    const characterIds = await getUserChars();
    if (!characterIds) return;

    const charUid: string = characterIds[0];

    const characterData = await axios.get<CharacterSheet[]>(
      `${BACKEND_URL}/char/${charUid}/all/data/`,
      config
    );

    if (characterData.status !== 200) {
      errorHandler(characterData);
      return;
    }

    return characterData.data as unknown as CharacterSheet;
  } catch (e) {
    errorHandler(e);
  }
};

export const updateCharacterData = <T extends keyof CharacterSheet>(
  data: CharacterSheet[T],
  key: T
) => {
  const { socket } = socketStore.getState();
  socket.emit("updateData", { data, key });
};
