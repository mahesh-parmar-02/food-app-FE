import { Button, Container } from '@mui/material';
import { ArrowForward } from "@mui/icons-material";
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import './swiper.css'
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { allCategoriesList } from '../../common/app.constants';

const PopularCategories = () => {
   // Media Query
   const navigate = useNavigate();

   return (
       <Container>
           <section className='space-y-7'>
               <header className='flex justify-between items-center'>
                   {/* Title */}
                   <h1 className='pb-0 md:text-2xl text-xl font-semibold capitalize'>
                       Popular Categories
                   </h1>
                   {/* See all Categories Btn */}
                   <Button
                       size={'medium'}
                       color='success'
                       variant='outlined'
                       onClick={()=> navigate('/categories')}
                       sx={{ textTransform: 'capitalize' }} endIcon={
                           <ArrowForward fontSize='large' />}>
                       See All
                   </Button>
               </header>

               {/* Categories */}
               <Categories />
           </section>
       </Container>
   );
};

// Categories Carousel
const Categories = () => {

   return (
       <Swiper
           breakpoints={
               {
                   // Extra_Small Screen
                   0: {
                       slidesPerView: 2,
                       spaceBetween: 20
                   },
                   //Medium Screen
                   768: {
                       slidesPerView: 3,
                       spaceBetween: 30
                   },
                   //Large Screen
                   1060: {
                       slidesPerView: 4.25,
                       spaceBetween: 25
                   }
               }
           }
           navigation={true}
           className="mySwiper">
           {
               allCategoriesList.map(category => (
                   // Category_card 
                   <SwiperSlide key={category.id}>
                       <CategoryCard category={category} />
                   </SwiperSlide>
               ))
           }
       </Swiper>
   )
}

export default PopularCategories;
