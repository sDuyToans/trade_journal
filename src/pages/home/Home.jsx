import React from 'react'
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import transition from "../../transition.jsx";
import AppTitle from "../../component/AppTitle.jsx";
import {motion} from "motion/react";
import {Link} from "react-router";

const textVariants = {
    initial: {
        x: -500,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1
        }
    }
}


// const sliderVariants = {
//     initial: {
//         x: 0,
//         opacity: 0.5
//     },
//     animate: {
//         x: "-220%",
//         opacity: 0.1,
//         transition: {
//             duration: 80,
//             repeat: Infinity,
//             repeatType: "mirror"
//         }
//     }
// }

const Home = () => {
    return (
        <DefaultLayout>
            <div className={"flex flex-col lg:flex-row gap-8 items-center justify-center w-full "}>
                <div className={"block lg:hidden"}>
                    <AppTitle/>
                </div>
                <motion.div variants={textVariants} initial={"initial"} animate={"animate"} className={"flex flex-col gap-8 md:gap-12 lg:gap-16 w-full lg:w-1/2 flex-1 relative"}>
                    <motion.div variants={textVariants} className={"hidden lg:block"}>
                        <AppTitle/>
                    </motion.div>
                    <motion.p variants={textVariants} className={"text-lg md:text-2xl lg:text-3xl text-center"}>
                        Tired of Excel? Fed up with expensive trading journals?
                        We built one that’s simple, smart, and made for real traders.
                    </motion.p>
                    <motion.div variants={textVariants} className={"w-full flex justify-center"}>
                        <Link to={"/features"} className={"text-center hover:cursor-pointer w-full md:w-3/4 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"}>
                            Explore Features
                        </Link>
                    </motion.div>
                    {/*<motion.div variants={sliderVariants} initial={"initial"} animate={"animate"}*/}
                    {/*            className={"text-[50vh] absolute text-purple-300 whitespace-nowrap tracking-[10px] font-bold"}*/}
                    {/*>*/}
                    {/*    Consistency, Risk Management, Emotional Discipline, Edge (Strategy), Continuous Learning, Patience*/}
                    {/*</motion.div>*/}
                </motion.div>
                <div className={"flex-1 w-1/2"}>
                    <motion.div className="imageContainer" initial={{ opacity: 0}} animate={{opacity: 1}} transition={{ duration: 3}}>
                        <img src={"/images/journal.webp"} alt={"journal"} className={"w-full h-fit xl:w-[800px] xl:h-[600px]"}/>
                    </motion.div>
                </div>
            </div>
        </DefaultLayout>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default transition(Home);