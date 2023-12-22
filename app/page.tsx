"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DownArrows from "@/components/DownArrows";
import WatchIcon from "@/components/WatchIcon";

async function getKillCount() {
  let playerData = await fetch(
    "https://api.wiseoldman.net/v2/players/moo shu pork",
    { headers: { "Content-Type": "application/json" } }
  );
  playerData = await playerData.json();

  //@ts-ignore
  return await playerData.latestSnapshot.data.bosses.giant_mole.kills;
}

async function getMoleRank() {
  let playerData = await fetch(
    "https://api.wiseoldman.net/v2/players/moo shu pork",
    { headers: { "Content-Type": "application/json" } }
  );
  playerData = await playerData.json();

  //@ts-ignore
  return await playerData.latestSnapshot.data.bosses.giant_mole.rank;
}

function calculateDryRate(killCount: number) {
  return ((1 - 1 / 3000) ** killCount * 100).toFixed(2);
}

function calculateHoursWasted(killCount: number) {
  return killCount / 70;
}

function calculateProfit(killCount: number) {
  return ((killCount * 25561.89) / 1000000).toFixed(2);
}

export default function Home() {
  const [killCount, setKillCount] = useState("...");
  const [noDropRate, setNoDropRate] = useState("...");
  const [hoursWasted, setHoursWasted] = useState("...");
  const [profit, setProfit] = useState("...");
  const [moleRank, setMoleRank] = useState("...");

  useEffect(() => {
    const fetchData = async () => {
      const count = await getKillCount();
      //@ts-ignore
      setKillCount(count);
      setNoDropRate(calculateDryRate(count));
      const hoursAtMole = calculateHoursWasted(await count).toFixed(2);
      //@ts-ignore
      setHoursWasted(hoursAtMole);
      const profit = calculateProfit(count);
      //@ts-ignore
      setProfit(profit);
      const moleRank = await getMoleRank();
      setMoleRank(moleRank);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="-mt-8 flex flex-col justify-between items-center text-center w-full h-screen">
        <div></div>
        <div>
          <div className="flex flex-col w-full items-center">
            <div className="flex justify-center mt-16 mb-16">
              <Image src="/baby_mole.webp" alt="" height={200} width={200} />
            </div>
            <div className="flex justify-center text-4xl">
              Moo has a mole kill count of {killCount}
            </div>
            <div className="flex mt-2 font-light text-xl justify-center">
              The chance that Moo has gotten this unlucky is {noDropRate}%
            </div>
            <div className="flex mt-8 font-bold text-xl justify-center">
              Rank {moleRank} btw
            </div>
          </div>
        </div>
        <DownArrows />
      </div>
      <div className="flex flex-col justify-center items-center text-center w-full h-[200vh] space-y-4">
        <div>
          <div className="text-xl font-light mb-2">
            <div className="flex w-full justify-center mb-16">
              <div className="w-[200px] h-[200px]">
                <WatchIcon />
              </div>
            </div>
            Moo usually gets about 70 kills per hour, which means that he has
            spent
          </div>
          <div className="text-4xl">{hoursWasted} hours at mole</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center w-full h-screen space-y-4">
        <Image
          className="mb-16"
          src="/coins.webp"
          alt=""
          width={200}
          height={200}
        />
        <div>
          <div className="text-xl font-light mb-2">
            At least it&apos;s not all bad though, throughout this grind Moo has
            made
          </div>
          <div className="text-4xl">{profit} M in loot</div>
        </div>
      </div>
    </div>
  );
}
