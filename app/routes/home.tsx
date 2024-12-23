import type { MetaFunction } from "@remix-run/node";
import Footer from "~/common/footer";
import Header from "~/common/header";
import IndexDiscoverSection from "~/components/index/discover";
import IndexHero from "~/components/index/homepage";
import IndexReview from "~/components/index/review";
import IndexLogo from "~/components/index/sponsor";

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
    <IndexLogo />
    <Footer />
    </>
  );
}

