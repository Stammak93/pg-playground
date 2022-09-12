import type { NextPage } from 'next'
import CustomHead from '../components/CustomHead';
import MainContent from '../components/MainContent';

const Home: NextPage = () => {
  return (
    <>
      <CustomHead />
      <MainContent />
    </>
  );
};

export default Home;
