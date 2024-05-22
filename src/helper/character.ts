import axios from "axios";
import { BACKEND_URL } from "./consts";
import errorHandler from "./errorHandler";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export const getCharacterData = async <T extends keyof CharacterSheet>(
  dataType: T
): Promise<CharacterSheet[T] | undefined> => {
  try {
    const characterIds = await axios.get(
      BACKEND_URL + "/char/usr-chars",
      config
    );

    if (characterIds.status !== 200) {
      errorHandler(characterIds);
      return;
    }

    const charUid: string = characterIds.data[0];

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
