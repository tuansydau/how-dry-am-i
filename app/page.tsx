"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

async function getKillCount() {
  // Using hardcoded number for now because I'm getting rate limited
  let playerData = await fetch(
    "https://api.wiseoldman.net/v2/players/moo shu pork",
    { headers: { "Content-Type": "application/json" } }
  );
  playerData = await playerData.json();

  //@ts-ignore
  return await playerData.latestSnapshot.data.bosses.giant_mole.kills;
  // return 7061;
}

function calculateDryRate(killCount: number) {
  // Drop rate formula
  // If the drop rate is 1 in k, then the probability of getting the drop in n attempts is:
  // p = 1-(1-1/k)**n
  // !p = (1-1/k)**n
  // Mole drop rate is 1/3000

  return ((1 - 1 / 3000) ** killCount * 100).toFixed(2);
}

export default function Home() {
  const [killCount, setKillCount] = useState("...");
  const [noDropRate, setNoDropRate] = useState("...");

  useEffect(() => {
    const fetchData = async () => {
      const count = await getKillCount();
      //@ts-ignore
      setKillCount(count);
      setNoDropRate(calculateDryRate(count));
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-screen space-y-2">
      <div className="flex justify-center mb-16">
        <Image src="/baby_mole.webp" alt="" height={200} width={200} />
      </div>
      <div className="flex justify-center text-4xl">
        Moo has a mole kill count of {killCount}
      </div>
      <div className="flex justify-center">
        The chance that Moo has gotten this unlucky is {noDropRate}%
      </div>
    </div>
  );
}
