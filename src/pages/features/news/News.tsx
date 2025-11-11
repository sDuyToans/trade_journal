import DefaultLayout from "../../../layout/DefaultLayout.jsx";
import { useGetForexNewsQuery } from "../../../api/newsApi";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CircularProgress} from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const normalizeDates = (data = []) => {
    let currentDate = "";
    return data.map(item => {
        if (item.date && item.date.trim() !== "") {
            currentDate = item.date.trim();
            return item;
        }
        return { ...item, date: currentDate };
    })
}

const groupByDate = (data = []) => {
    const groups = {};
    data.forEach((item) => {
        const dataKey = item.date || "No Date";
        if (!groups[dataKey]) groups[dataKey] = [];
        groups[dataKey].push(item);
    })
    return groups;
}

const News = () => {
    const { data, isLoading } = useGetForexNewsQuery();
    const normalized = normalizeDates(data);
    const grouped = groupByDate(normalized);

    const impactImage = (impactLevel) => {
        switch (impactLevel) {
            case "Holiday":
                return "https://resources.faireconomy.media/images/sprites/ff-impact-ora.png";
            case "High":
                return "https://resources.faireconomy.media/images/sprites/ff-impact-red.png";
            case "Medium":
                return "https://resources.faireconomy.media/images/sprites/ff-impact-ora.png";
            case "Low":
                return "https://resources.faireconomy.media/images/sprites/ff-impact-yel.png";
            default:
                return ""
        }
    }
    if (isLoading) {
        return <DefaultLayout>
            <div className={"flex justify-center items-center"}>
                <CircularProgress />;
            </div>
        </DefaultLayout>
    }

    return <DefaultLayout>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell >Time</StyledTableCell>
                        <StyledTableCell >Currency</StyledTableCell>
                        <StyledTableCell >Event</StyledTableCell>
                        <StyledTableCell >Impact</StyledTableCell>
                        <StyledTableCell >Actual</StyledTableCell>
                        <StyledTableCell >ForeCast</StyledTableCell>
                        <StyledTableCell >Previous</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(grouped).map(([date, events]) => events.map((item, index) => (
                        <StyledTableRow key={`${date}-${index}`}>
                            <StyledTableCell >{index === 0 ? date : ""}</StyledTableCell>
                            <StyledTableCell >{item.time}</StyledTableCell>
                            <StyledTableCell >{item.currency}</StyledTableCell>
                            <StyledTableCell >{item.event}</StyledTableCell>
                            <StyledTableCell align={"center"}>
                                {
                                    item.impact !== "None" && <img src={impactImage(item.impact)} alt={"impact image"}/>
                                }
                            </StyledTableCell>
                            <StyledTableCell >{item.actual}</StyledTableCell>
                            <StyledTableCell >{item.forecast}</StyledTableCell>
                            <StyledTableCell >{item.previous}</StyledTableCell>
                        </StyledTableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    </DefaultLayout>
}

export default News;