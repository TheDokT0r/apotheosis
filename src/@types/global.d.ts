declare global {
  type BlurEvent = FocusEventHandler<HTMLInputElement> | null | undefined;

  type ThemePlate = "Rust" | "Silver" | "Gold" | "Bronze";
  type Hex = `#${string}`;

  interface UserDetails {
    username: string;
    hashPassword: string;
    email: string;
    creationDate: Date;
    isGM: boolean;
    _id: ObjectId;
  }

  interface SkillData {
    pro: boolean;
    skill_level: number;
  }

  interface CharacterSheet {
    owner: string;
    basic_info: { [key: string]: string };

    attributes: { [attribute: string]: number | string | null };
    characteristics: { [characteristic: string]: number | string | null };

    skills: {
      [category: string]: {
        [skill: string]: SkillData;
      };
    };

    status: {
      [key: string]: {
        total: number | string | null;
        current: number | string | null;
      };
    };

    wounds: {
      x: number;
      y: number;
      name: string;
      description: string;
      id: string;
    }[];

    quirks: {
      name: string;
      description: string;
      id: string;
    }[];

    notes: string;

    creationDate: Date;
    _id: ObjectId;

    abilities: string[];
  }
}

export {};
