import DefaultLayout from "../../../layout/DefaultLayout.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import {useState} from "react";
import CustomModal from "../../../component/common/CustomModal";
import TradeInfo from "../../../component/TradeInfo";
import {Alert, Snackbar} from "@mui/material";
import {useGetTradesQuery, useSaveTradeMutation} from "../../../api/tradeApi";
import {useAuth} from "../../../context/useAuth";

const Calendar = () => {
    const {data} = useGetTradesQuery();
    const [openModel, setOpenModel] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [openToast, setOpenToast] = useState(false);
    const [toastType, setToastType] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [saveTrade] = useSaveTradeMutation();
    const { isLoggedIn } = useAuth();


    const groupRecords = data?.reduce((acc, trade) => {
        const dateStr = trade.tradeDate;
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(trade);
        return acc;
    }, {}) || {};

    // @ts-ignore
    const handleSave = async (date, type, amount, note) => {
        // save to that date record
        // now we need to implement db
        const tradeRequest = {
            userId: 1,
            type: type,
            amount: amount,
            note: note
        }

        try {
            const result = await saveTrade(tradeRequest).unwrap(); // unwrap for real response
            // console.log(result)
            // display a toast for success and fail color based on amount
            if (amount > 0){
                setToastType("success")
            } else{
                setToastType("error");
            }
            setOpenToast(true)

            setOpenModel(false)
        } catch (e){
            console.log("Error saving trade :", e)
        }
    }

    const handleClickCell = (info) => {
        // Fix only allows user loggedIn to click on the cell
        if (!isLoggedIn) {
            setAlertMessage("Please log in first");
            setAlert(true);

            // redirect after 1s
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
            return;
        }

        const clickedDate = info.dateStr;

        // if the click cell date is not today date
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + String(today.getMonth() + 1)).slice(-2);
        const date = ('0' + String(today.getDate())).slice(-2);
        const todayStr = `${year}-${month}-${date}`

        const isToday = clickedDate === todayStr;

        if (!isToday) {
            // display alert box
            setAlertMessage("Can only choose current date")
            setAlert(true);
        } else {
            setOpenModel(true);
            setSelectedDate(clickedDate);
        }
    }

    // Helper to get total for a given date
    const getTotal = (dateStr) => {
        const entries = groupRecords[dateStr] || [];

        return entries.reduce((sum, e) => sum + e.amount, 0);
    };



    return <DefaultLayout defaultbg={"bg-white"} dH={"h-dvh lg:h-full"}>
        <Snackbar open={alert} autoHideDuration={1000} onClose={() =>setAlert(false)}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert
                onClose={() =>setAlert(false)}
                severity={"error"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
        <Snackbar open={openToast} autoHideDuration={3000} onClose={() =>setOpenToast(false)}>
            <Alert
                onClose={() =>setOpenToast(false)}
                severity={toastType}
                variant="filled"
                sx={{ width: '100%' }}
            >
                { toastType === "success" ? "Well done!" : "So sorry to hear that!"}
            </Alert>
        </Snackbar>
        <h1 className={"text-7xl text-black text-center my-5"}>Your Calendar</h1>
        <FullCalendar
            key={JSON.stringify(data)}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={'dayGridMonth'}
            dateClick={handleClickCell}
            dayCellDidMount={(arg) => {

                const cellDate = arg.date;
                const today = new Date();
                const dateStr = arg.date.toISOString().split("T")[0];
                const trades = groupRecords[dateStr] || [];
                const total = getTotal(dateStr);

                // color today cell by total
                if (total > 0) {
                    arg.el.style.backgroundColor = "rgba(134,239,172,0.43)";
                } else if (total < 0) {
                    arg.el.style.backgroundColor = "rgba(252,165,165,0.43)";
                }

                // Add total number in the center
                const content = arg.el.querySelector(".fc-daygrid-day-frame");

                // Remove existing total if re-rendered
                const oldTotal = content.querySelector(".custom-total");
                if (oldTotal) oldTotal.remove();

                // Create new total element
                if (groupRecords[dateStr]) {
                    const totalDiv = document.createElement("div");
                    totalDiv.className =
                        "custom-total absolute inset-0 flex items-center justify-center font-bold text-sm md:text-lg lg:text-xl total-res";
                    totalDiv.style.color = total > 0 ? "#166534" : total < 0 ? "#991b1b" : "#374151"; // green/red/gray text
                    totalDiv.textContent = total + "$";
                    content.appendChild(totalDiv);
                }

            }}
        />
        <CustomModal
            open={openModel}
            setOpen={setOpenModel}
            modalTitle={"Trade Taken Info"}>
            <TradeInfo onSave={(data) => handleSave(selectedDate, data.type, data.amount, data.note)}/>
        </CustomModal>
    </DefaultLayout >
}

export default Calendar;