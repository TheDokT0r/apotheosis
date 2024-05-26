import { updateCharacterData } from "@/helper/character";
import { create } from "zustand";

interface CharacterStoreInterface {
  characterData: CharacterSheet | null;
  setSpecificCharacterData: <T extends keyof CharacterSheet>(
    key: T,
    data: CharacterSheet[T]
  ) => void;
  setAllCharacterData: (data: CharacterSheet) => void;
}

const characterStore = create<CharacterStoreInterface>((set, get) => ({
  characterData: null,
  setSpecificCharacterData: (key, data) => {
    const characterData = get().characterData;
    if (!characterData) return;

    const copy = { ...characterData };

    copy[key] = data;
    updateCharacterData(data, key);
    set({ characterData: copy });
  },

  setAllCharacterData: (data) => set({ characterData: data }),
}));

export const useCharacter = () => {
  const characterData = characterStore((state) => state.characterData);
  const setCharacterData = characterStore(
    (state) => state.setAllCharacterData
  );
  const setSpecificCharacterData = characterStore(
    (state) => state.setSpecificCharacterData
  );

  return { characterData, setCharacterData, setSpecificCharacterData };
};

export default characterStore;
