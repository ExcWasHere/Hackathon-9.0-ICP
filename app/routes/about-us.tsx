import Footer from "~/common/footer";
import Header from "~/common/header";
import AboutUsForeword from "~/components/about-us/foreword";
import AboutUsHero from "~/components/about-us/hero";
import AboutUsProducts from "~/components/about-us/products";

export default function LoginPage() {
  return (
    <>
      <Header/>
      <AboutUsHero/>
      <AboutUsForeword/>

      <AboutUsProducts/>
      <Footer/>
    </>
  );
}