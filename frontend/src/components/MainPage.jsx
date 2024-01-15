import {Link} from "react-router-dom"

const MainPage = () => {
    return (
        <div>
            <Link to={"/admin"}>Opettaja</Link>
            <Link to={"/student"}>Oppilas</Link>
        </div>
    )
}

export default MainPage;