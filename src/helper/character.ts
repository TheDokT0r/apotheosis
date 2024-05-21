import axios from "axios";
import { BACKEND_URL } from "./consts";
import errorHandler from "./errorHandler";

export const getCharacterData = async <T extends keyof CharacterSheet>(
  dataType: T
): Promise<CharacterSheet[T] | undefined> => {
  const characterIds = await axios.get(BACKEND_URL + "/char/usr-chars");
  if (characterIds.status !== 200) {
    errorHandler(characterIds);
    return;
  }

  const charUid: string = characterIds.data[0];

  const characterData = await axios.get<CharacterSheet[]>(
    `${BACKEND_URL}/char/${charUid}/${dataType}/data/`
  );

  if (characterData.status !== 200) {
    errorHandler(characterData);
    return;
  }

  console.log(characterData.data);

  return characterData as unknown as CharacterSheet[T];
};
