import DefaultLayout from "../../layout/DefaultLayout.jsx";

const Features = () => {
    return <DefaultLayout>
        <div className={"text-center text-5xl"}>
            <h3 className={"text-7xl font-bold"}>A little reminder</h3>
           <ul>
               <li>1. News category is for all user</li>
               <li>2. Live chart category is for all user</li>
               <li>3. Calender trade journal is for logged user cause I'll save them in DB</li>
               <li>4. Prediction category also required logged user to use!</li>
           </ul>
        </div>
    </DefaultLayout>
}

export default Features;