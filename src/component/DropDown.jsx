import {FiEdit, FiPlusSquare, FiShare, FiTrash} from "react-icons/fi";
import {motion} from "motion/react";
import React, {useEffect, useRef} from "react";
import {useDropDown} from "../context/useDropDown.jsx";
import {Link} from "react-router";

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: {scale: 1, y: 0},
    closed: {scale: 0, y: -7},
};

const DropDown = () => {
    const dropDownRef = useRef(null);
    const { open, setOpen } = useDropDown();

    // handle click outside the dropdown -> close it
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)){
                if (open) setOpen(false);
            }
        }
        // add function when mount
        document.addEventListener('mousedown', handleClickOutSide, true);
        return () => {
            // unmount function when leave page
            document.removeEventListener('mousedown', handleClickOutSide, false);
        }
    }, [open, setOpen]);
    return <motion.ul
        ref={dropDownRef}
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex z-50 flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[103%] left-[50%] w-30 overflow-hidden"
    >
        <Option setOpen={setOpen} to={"/features"} text="All"/>
        <Option setOpen={setOpen} to={"/calendar"}  text="Calendar"/>
        <Option setOpen={setOpen} text="News" to={"/news"}/>
        <Option setOpen={setOpen}  text="Predict" to={"/predict"}/>
    </motion.ul>
}


const Option = ({text, to = "#", setOpen}) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="z-50 flex items-center justify-center w-full p-2 text-sm md:text-md font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <Link to={to} className={"text-center"}>{text}</Link>
        </motion.li>
    );
};

export default DropDown;