"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Ambient } from "@/components/Ambient";
import { Landing } from "@/components/Landing";
import { AmbientAudioToggle } from "@/components/AmbientAudioToggle";
import { Hero } from "@/components/story/Hero";
import { Introduction } from "@/components/story/Introduction";
import { Teasing } from "@/components/story/Teasing";
import { BirthdayCelebration } from "@/components/story/BirthdayCelebration";
import { NewChapter } from "@/components/story/NewChapter";
import { Motivation } from "@/components/story/Motivation";
import { PersonalMessage } from "@/components/story/PersonalMessage";
import { SecretMessage } from "@/components/story/SecretMessage";
import { Finale } from "@/components/story/Finale";

export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <SmoothScroll startLocked>
      <div className="grain" aria-hidden />
      <Ambient />

      <main>
        <Hero opened={opened} />
        <div className="divider" />
        <Introduction />
        <div className="divider" />
        <Teasing />
        <div className="divider" />
        <BirthdayCelebration />
        <div className="divider" />
        <NewChapter />
        <div className="divider" />
        <Motivation />
        <div className="divider" />
        <PersonalMessage />
        <div className="divider" />
        <SecretMessage />
        <div className="divider" />
        <Finale />
      </main>

      <AmbientAudioToggle />
      <Landing onOpen={() => setOpened(true)} />
    </SmoothScroll>
  );
}
