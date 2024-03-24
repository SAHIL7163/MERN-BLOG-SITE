import { useNavigate } from "react-router-dom";

const Unauthorized = () =>
{
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return(
        <section className="unauthorized d-flex flex-column justify-content-center align-items-center">
        <h1 className="">Unauthorized</h1>
        <br />
        <p className=" text-center fs-3">You do not have access to the requested page.</p>
        <div className="flex-grow">
            <button  className="btn btn-primary btn-lg"onClick={goBack}>Go Back</button>
        </div>
    </section> 
    )
    }

    
export default Unauthorized