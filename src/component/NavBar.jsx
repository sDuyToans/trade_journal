import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useDropDown } from "../context/useDropDown.jsx";
import { useAuth } from "../context/useAuth.jsx";
import { useLogoutMutation } from "../api/authApi.js";
import DropDown from "./DropDown.jsx";

const variants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, type: "spring" } },
};

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="w-full px-4 py-2">
            {/* Desktop Navbar */}
            <div className="hidden md:flex justify-center">
                <SlideTabs />
            </div>

            {/* Mobile Navbar */}
            <div className="flex md:hidden justify-between items-center">
                <Link to="/" className="font-bold text-lg text-black">
                    Your Trade Journal
                </Link>

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="p-2 border border-black rounded-md"
                >
                    {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col mt-2 space-y-3 text-center text-black bg-amber-50 rounded-lg p-4 md:hidden"
                    >
                        <MobileLinks />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

/* ----------------------- DESKTOP NAV ----------------------- */
function SlideTabs() {
    const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
    const { open, setOpen } = useDropDown();
    const { isLoggedIn, data, logoutClient, refetchAuth } = useAuth();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            logoutClient();
            await refetchAuth();
        } catch (e) {
            console.log("Error during logout:", e);
        }
    };

    return (
        <motion.ul
            variants={variants}
            initial="initial"
            animate="animate"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
            className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
        >
            <Tab setPosition={setPosition} to="/">Home</Tab>
            <Tab setPosition={setPosition} to="/price">Pricing</Tab>

            <Tab setPosition={setPosition}>
                <div
                    className="flex items-center gap-2 relative"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <span>Features</span>
                    <FiChevronDown />
                </div>
            </Tab>

            {open && <DropDown />}

            <Tab setPosition={setPosition} to="/live-chart">Live Chart</Tab>

            {!isLoggedIn && <Tab setPosition={setPosition} to="/auth">Auth</Tab>}

            {isLoggedIn && (
                <>
                    <Tab setPosition={setPosition} to="#">
                        {data.username}
                    </Tab>
                    <Tab setPosition={setPosition} to="#" onClick={handleLogout}>
                        Log out
                    </Tab>
                </>
            )}

            <Cursor position={position} />
        </motion.ul>
    );
}

function Tab({ children, setPosition, to = "#", onClick = null }) {
    const ref = React.useRef(null);

    return (
        <Link
            to={to}
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => {
                if (!ref.current) return;
                const { width } = ref.current.getBoundingClientRect();
                setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
        >
            {children}
        </Link>
    );
}

function Cursor({ position }) {
    return (
        <motion.li
            animate={{ ...position }}
            className="absolute z-0 h-7 md:h-12 rounded-full bg-black"
        />
    );
}

/* ----------------------- MOBILE NAV ----------------------- */
function MobileLinks() {
    const { isLoggedIn, data, logoutClient, refetchAuth } = useAuth();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            logoutClient();
            await refetchAuth();
        } catch (e) {
            console.log("Logout error:", e);
        }
    };

    return (
        <>
            <Link to="/" className="block py-2 text-lg hover:text-indigo-600">Home</Link>
            <Link to="/price" className="block py-2 text-lg hover:text-indigo-600">Pricing</Link>
            <Link to="/live-chart" className="block py-2 text-lg hover:text-indigo-600">Live Chart</Link>
            <Link to="/features" className="block py-2 text-lg hover:text-indigo-600">Features</Link>

            {!isLoggedIn && (
                <Link to="/auth" className="block py-2 text-lg hover:text-indigo-600">Auth</Link>
            )}

            {isLoggedIn && (
                <>
          <span className="block py-2 text-lg font-medium text-gray-700">
            {data.username}
          </span>
                    <button
                        onClick={handleLogout}
                        className="block py-2 text-lg text-red-600 font-semibold hover:text-red-800"
                    >
                        Log out
                    </button>
                </>
            )}
        </>
    );
}