import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase";

export default async function initUser(username: string) {
  const user = getAuth(firebaseApp).currentUser;

  if (!user) return;
  const db = getFirestore(firebaseApp);

  const defaultSkillData: SkillData = {
    pro: false,
    skill_level: 0,
  };

  const defaultStatus: { total: number | null; current: number | null } = {
    total: null,
    current: null,
  };

  const basicUserData: CharacterSheet = {
    basic_info: {
      player_name: username,
      affiliation: "",
      archetype: "",
      character_name: "",
      species: "",
    },
    attributes: {
      physique: null,
      intellect: null,
      intuition: null,
      agility: null,
      psyche: null,
    },

    characteristics: {
      speed: null,
      defense: null,
      dodge: null,
    },

    skills: {
      general: {
        encyclopedia: defaultSkillData,
        nature: defaultSkillData,
        science: defaultSkillData,
        drugs: defaultSkillData,
        scavenge: defaultSkillData,
        splicing: defaultSkillData,
      },
      sensory: {
        visualization: defaultSkillData,
        gut: defaultSkillData,
        cool: defaultSkillData,
        grit: defaultSkillData,
      },
      physical: {
        motorics: defaultSkillData,
        endurance: defaultSkillData,
        muscles: defaultSkillData,
        armaments: defaultSkillData,
        weaponry: defaultSkillData,
        brawl: defaultSkillData,
      },
      tech: {
        pilot: defaultSkillData,
        mechanics: defaultSkillData,
        interacting: defaultSkillData,
        techware: defaultSkillData,
        engineering: defaultSkillData,
        electroacuity: defaultSkillData,
      },
      magic: {
        arcane: defaultSkillData,
        alchemy: defaultSkillData,
        animation: defaultSkillData,
        infusion: defaultSkillData,
        evocation: defaultSkillData,
      },
    },

    status: {
      hp: defaultStatus,
      strain: defaultStatus,
      xp: defaultStatus,
    },

    extras: {
      notes: "",
      wounds: [],
    },
  };

  for (const [key, value] of Object.entries(basicUserData)) {
    await setDoc(doc(db, "sheets", user.uid, "character", key), value, {
      merge: true,
    });
  }
  const metaData: CharacterMetaData = {
    creationDate: new Date(),
    lastUpdate: new Date(),
    isGM: false,
  };

  await setDoc(doc(db, "meta", user.uid), metaData, { merge: true });
}
