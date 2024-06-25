import { Button, IconButton, Tooltip } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import { useContext } from 'react';
import { checkoutContext } from './Cart';

const GoBackButton = () => {
    const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext);
    return (
        <Button
            color='success'
            onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
            size='small'
            sx={{textTransform: 'capitalize'}}
            variant='outlined'
            startIcon={<ArrowBack fontSize='inherit' />}>
            Go Back
        </Button>
    );
};

export default GoBackButton;