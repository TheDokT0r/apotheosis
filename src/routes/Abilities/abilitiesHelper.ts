export interface AbilityData {
  rank: number;
  skill: string;
  prerequisite: string[] | null;
  description: string;
  name: string;
}

const abilities: readonly AbilityData[] = [
  {
    name: "Historian",
    rank: 1,
    skill: "Encyclopedia",
    prerequisite: null,
    description:
      "You are well versed in history and the roots of this world, gain an additional die to checks made to recall information about historical events and figures.",
  },
  {
    name: "Linguist",
    rank: 1,
    skill: "Encyclopedia",
    prerequisite: null,
    description:
      "You have an ear for languages, you can recognize a language (written or spoken) without passing a check to do so.",
  },
  {
    name: "Etymologist",
    rank: 1,
    skill: "Encyclopedia",
    prerequisite: null,
    description:
      "Your exposure to diverse tongues, and ability to spot patterns allows you to decipher and understand ciphers, slang, academic terminology and even jargon.",
  },
  {
    name: "Photographic Memory",
    rank: 2,
    skill: "Encyclopedia",
    prerequisite: null,
    description:
      "You have incredible memory, it allows you to recall specific tidbits of information. If you forgot something, prompt your GM, good chance you now remember.",
  },
  {
    name: "Informaniac",
    rank: 2,
    skill: "Encyclopedia",
    prerequisite: null,
    description:
      "Your ever-accumulating pool of knowledge makes it easier to obtain new information, you’ll know where to look for very specific topics and have an easier time doing so.",
  },
];

export default abilities;
