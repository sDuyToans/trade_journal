import AppRoutes from "./routes/app-routes.jsx";
import { AnimatePresence } from "framer-motion";
function App() {
    return <AnimatePresence mode={"wait"}>
        <AppRoutes/>
    </AnimatePresence>
}

export default App
