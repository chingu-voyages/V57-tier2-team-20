import Container from "../reusables/Container";
import Section from "../reusables/Section";

const Home = () => {
  return (
    <>
      <Hero />

      <SecondSection />

      <ThirdSection />
    </>
  );
};

const Hero = () => {
  return (
    <Section>
      <Container>
        {/* Contents
        
        The Container is already a div and can take different stylings*/}
      </Container>
    </Section>
  );
};

const SecondSection = () => {
  return (
    <Section>
      <Container>
        {/* Contents
        
        The Container is already a div and can take different stylings*/}
      </Container>
    </Section>
  );
};
const ThirdSection = () => {
  return (
    <Section>
      <Container>
        {/* Contents
        
        The Container is already a div and can take different stylings*/}
      </Container>
    </Section>
  );
};

export default Home;
