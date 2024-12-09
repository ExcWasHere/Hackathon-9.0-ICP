import type { MetaFunction } from "@remix-run/node";
import Footer from "~/common/footer";
import Header from "~/common/header";
import IndexDiscoverSection from "~/components/discover";
import IndexHero from "~/components/homepage";
import IndexReview from "~/components/review";

export const meta: MetaFunction = () => {
  return [
    { title: "CodeFest" },
    { name: "description", content: "Welcome to E-Bus!" },
  ];
};

export default function Index() {
  return (
    <>
    <Header />
    <IndexHero />
    <IndexDiscoverSection />
    <IndexReview />
    <Footer />
    </>
  );
}

