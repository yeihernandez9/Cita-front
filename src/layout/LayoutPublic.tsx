
import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <div>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPublic;