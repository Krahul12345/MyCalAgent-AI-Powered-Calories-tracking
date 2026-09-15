import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import UpcomingFeatures from "@/components/UpcomingFeatures";

export const metadata: Metadata = {
  title: "Upcoming Features",
  description: "Explore concepts under consideration for MyCalAgent: Cali voice, movement, meditation, and optional glucose trend summaries. Availability is not guaranteed.",
  alternates: { canonical: "https://www.mycalagent.com/features/upcoming" },
};

export default function UpcomingFeaturesPage() {
  return <><Navigation /><UpcomingFeatures /><Footer /></>;
}
