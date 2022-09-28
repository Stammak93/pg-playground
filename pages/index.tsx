import type { NextPage } from 'next'
import CustomHead from '../components/CustomHead';
import MainContent from '../components/MainContent';

const Home: NextPage = () => {
  return (
    <>
      <CustomHead />
      <MainContent />
      <div id="modal" className='disabled'></div>
    </>
  );
};

export default Home;
