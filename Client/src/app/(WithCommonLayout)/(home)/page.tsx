import { CommunityStats } from "@/src/components/modules/home/CommunityStats";
import Landing from "@/src/components/modules/home/Landing";
import { Newsletter } from "@/src/components/modules/home/Newsletter";
import { TravelCategories } from "@/src/components/modules/home/TravelCategories";
import UserJourneyRoadmap from "@/src/components/modules/home/UserJourneyRoadmap";

export default function Home() {
  return (
    <>
      <Landing />
      <UserJourneyRoadmap />
      <TravelCategories />
      <CommunityStats />
      <Newsletter />
    </>
  );
}