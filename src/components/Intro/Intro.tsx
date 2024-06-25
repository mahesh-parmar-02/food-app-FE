import { Button, Container, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const navigate = useNavigate();


  return (
    
    <section className='pt-16 bg-green-300/10'>
        <Container>
            <div className='mb-5 sm:grid flex flex-col gap-x-5'>
                {/* Text */}
                <div className='col pt-3.5 flex items-center'>
                    <div className='mb-4 xl:space-y-7 lg:space-y-6 md:space-y-4 sm:space-y-4 space-y-5 w-11/12 sm:tracking-normal tracking-wide'>
                        {/* title */}
                        <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl font-bold capitalize xl:tracking-wide'>
                            Make healthy life <br />
                            <div className='xl:my-2.5 lg:my-1.5 sm:my-0 md:my-0.5 my-1'>
                                with <span className='text-green-500'>
                                    fresh grocery
                                </span>
                            </div>
                            products
                        </h1>
                        {/* description */}
                        <p className='lg:text-base md:text-sm sm:text-xs text-sm'>
                            Get the best quality and most delicious grocery food in the world, you can get them our website. Fresh grocery every day to your family.
                        </p>

                        {/* Shop_now Btn */}
                        <Button
                            onClick={() => navigate('/products')}
                            sx={{ textTransform: 'capitalize' }}
                            variant='contained'
                            size={isMediumScreen ? 'medium' : 'large'}
                            color='success'>
                            Shop Now
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    </section>
  );
}

export default Intro;
