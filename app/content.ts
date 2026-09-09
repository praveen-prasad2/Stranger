/**
 * All copy lives in brief.json. This module gives it a typed shape and named
 * accessors so components never reach into the raw JSON. Scene order in the
 * brief is stable, so the page can map over `scenes` directly.
 */
import brief from "./brief.json";

type CTA = { text: string };

export type HeroScene = {
  id: "hero";
  goal: string;
  type_sequence: { text: string }[];
  cta: CTA;
};

export type IntroductionScene = {
  id: "introduction";
  eyebrow: string;
  headline: string;
  body: string;
};

export type TeasingScene = {
  id: "teasing";
  eyebrow: string;
  headline: string;
  body: string;
  interaction: { button_text: string; on_click: string };
};

export type BirthdayScene = {
  id: "birthday-celebration";
  eyebrow: string;
  headline: string;
  body: string;
  completion_effect: string;
};

export type NewChapterScene = {
  id: "new_chapter";
  eyebrow: string;
  headline: string;
  body: string[];
  highlight: string;
};

export type MotivationScene = {
  id: "motivation";
  eyebrow: string;
  headline: string;
  lines: string[];
  quote: string;
};

export type PersonalMessageScene = {
  id: "personal_message";
  eyebrow: string;
  headline: string;
  body: string[];
  highlight: string;
  signature: string;
};

export type SecretMessageScene = {
  id: "secret_message";
  trigger: { text: string };
  modal: { title: string; body: string; close_button: string };
};

export type FinaleScene = {
  id: "finale";
  eyebrow: string;
  content: {
    primary: string;
    secondary: string;
    supporting: string;
    closing: string;
  };
  actions: CTA[];
  final_note: string;
};

type Scene =
  | HeroScene
  | IntroductionScene
  | TeasingScene
  | BirthdayScene
  | NewChapterScene
  | MotivationScene
  | PersonalMessageScene
  | SecretMessageScene
  | FinaleScene;

export const project = brief.project;
export const concept = brief.creative_concept;
export const nav = brief.navigation;
export const loader = brief.opening_loader;
export const scenes = brief.scenes as unknown as Scene[];

function scene<T extends Scene>(id: T["id"]): T {
  const found = scenes.find((s) => s.id === id);
  if (!found) throw new Error(`Missing scene in brief.json: ${id}`);
  return found as T;
}

export const hero = () => scene<HeroScene>("hero");
export const introduction = () => scene<IntroductionScene>("introduction");
export const teasing = () => scene<TeasingScene>("teasing");
export const birthday = () => scene<BirthdayScene>("birthday-celebration");
export const newChapter = () => scene<NewChapterScene>("new_chapter");
export const motivation = () => scene<MotivationScene>("motivation");
export const personalMessage = () =>
  scene<PersonalMessageScene>("personal_message");
export const secretMessage = () => scene<SecretMessageScene>("secret_message");
export const finale = () => scene<FinaleScene>("finale");

export const birthdayPerson = project.birthday_person;
export const author = project.created_by;
