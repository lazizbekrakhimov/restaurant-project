import { BookingSection, HeroSection, NewsSection, PopularMeals, WhyUsSection } from "@/modules"

const Home = () => {
  return (
    <>
      <HeroSection />
      <PopularMeals />
      <BookingSection />
      <WhyUsSection />
      <NewsSection />
    </>
  )
}

export default Home