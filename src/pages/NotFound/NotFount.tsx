import { useRouteError } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();
    console.log(error);

    const errorMessage = (error as { statusText?: string; message?: string })?.statusText || (error as { message?: string })?.message || "Unknown error";

    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <p>{errorMessage}</p>
        </div>
    );
};

export default NotFound;
