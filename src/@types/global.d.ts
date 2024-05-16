declare global {
  type BlurEvent = FocusEventHandler<HTMLInputElement> | null | undefined;

  type ThemePlate = "Rust" | "Silver" | "Gold" | "Bronze";
  type Hex = `#${string}`;

  interface SkillData {
    pro: boolean;
    skill_level: number;
  }

  interface CharacterSheet {
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

    extras: {
      wounds: {
        position: { x: number; y: number };
        description: string;
      }[];

      notes: string;
    };
  }

  interface CharacterMetaData {
    creationDate: Date;
    lastUpdate: Date;
    isGM: boolean;
  }
}

export {};
