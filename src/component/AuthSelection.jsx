import {motion} from "motion/react";
import {Link} from "react-router/internal/react-server-client";

const authVariant = {
    initial: {
        y: -60,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
        }
    }
}

const imgVariant = {
    animate: {
        y: [0, -30, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}


export default function AuthSelection() {
    return <motion.div className={"max-w-[900px] bg-white border opacity-75 mx-auto px-20 py-10"}
                       variants={authVariant} initial={"initial"} animate={"animate"}>
        <motion.img variants={imgVariant} animate={"animate"} src={"/images/logo.jpg"} alt={"logo"}/>
        <div className={"flex gap-2 items-center justify-center"}>
            <motion.div
                animate={{color: "rgb(252, 165, 165)"}}
                whileHover={{
                    scale: 1.2,
                    color: "#16a34a",
                    transition: {duration: 0.3}
                }}
            >
                <Link to={"/login"} className={"text-xl md:text-2xl lg:text-3xl"}>
                    SignIn
                </Link>
            </motion.div>
            <div className={"w-1 h-[30px] bg-gray-400"}/>
            <motion.a href={"/register"} className={"text-xl md:text-2xl lg:text-3xl"}
                      animate={{color: "rgb(252, 165, 165)"}}
                      whileHover={{
                          scale: 1.2,
                          color: "#16a34a",
                          transition: {duration: 0.3}
                      }}>
                SignUp
            </motion.a>
        </div>
    </motion.div>
}