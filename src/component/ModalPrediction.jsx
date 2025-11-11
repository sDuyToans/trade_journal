
import CloseIcon from '@mui/icons-material/Close';
import {
    AppBar,
    Dialog,
    IconButton,
    Slide,
    Toolbar
} from "@mui/material";
import React from "react";
import ChartPage from "../pages/chart/ChartPage.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default  function ModalPrediction({ pair, setOpen, open, model }) {

    let fromPair = "";
    let toPair = "";

    if (pair !== ""){
        let arr_pairs = pair.split("/")
        fromPair = arr_pairs[0]
        toPair = arr_pairs[1]
    }

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };
    return <React.Fragment>
        {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
        {/*    Open full-screen dialog*/}
        {/*</Button>*/}
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            slots={{
                transition: Transition,
            }}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ChartPage from={fromPair} to={toPair} model={model}/>
        </Dialog>
    </React.Fragment>
}