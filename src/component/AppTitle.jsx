import React from 'react'
import {motion} from "motion/react";

export default function AppTitle() {
    const appTitle = "YOUR TRADING APP";
    const appTitleArr = [...appTitle]
    // const appTitleArr = appTitle.split(" ");
    const variants = {
        initial: {
            y: -50,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                staggerChildren: 0.7,
                type: "spring"
            }
        }
    }
    const wordVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
            }
        }
    }
    return (
        <motion.div className={"flex gap-3 justify-center mt-10"} variants={variants} initial={"initial"}
                    animate={"animate"}>
            {
                appTitleArr.map((t, i) => <motion.span key={i} variants={wordVariants}
                                                       className={"text-xl md:text-3xl lg:text-5xl text-center font-bold text-black"}>{t}</motion.span>)
            }
        </motion.div>
    )
}
