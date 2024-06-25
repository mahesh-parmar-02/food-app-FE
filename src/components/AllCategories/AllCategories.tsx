import { Container, Fade } from '@mui/material';

import CategoryCard from '../PopularCategories/CategoryCard';
import { allCategoriesList } from '../../common/app.constants';

const AllCategories = () => (
  <main className='min-h-screen space-y-5 pt-20 mb-9'>
            <Fade in={true}>
                <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
                    {/* Title */}
                    <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
                        All Categories
                    </h1>
                    {/* All Category Cards */}
                    <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                        {allCategoriesList.map(category => (
                            <CategoryCard
                                key={category.id}
                                shadow={true}
                                category={category} />
                        ))}
                    </section>
                </Container>
            </Fade>
        </main>
);

export default AllCategories;
