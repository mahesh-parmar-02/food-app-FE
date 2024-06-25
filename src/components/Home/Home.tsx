import { FC } from 'react';
import Intro from '../Intro/Intro';
import PopularCategories from '../PopularCategories/PopularCategories';


interface HomeProps {}

const Home: FC<HomeProps> = () => (
   <>
    <Intro/>
    <PopularCategories/>
    </>
);

export default Home;
