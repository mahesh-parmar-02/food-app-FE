import React, { FC } from 'react';
import { Alert, Snackbar } from "@mui/material";
import Slide, { SlideProps } from '@mui/material/Slide';

const SuccessAlert:FC<any> = ({ massage, state }) => {
    const [open, setOpen] = state;

    // Handle close
    const handleClose = () => setOpen(!open)

    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert
                variant='filled'
                sx={{ width: '100%' }}
                onClose={handleClose}
                severity="success">
                {massage}
            </Alert>
        </Snackbar>
    );
};
// This sub_component will add a slide animation on snackBar
function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}
export default SuccessAlert;