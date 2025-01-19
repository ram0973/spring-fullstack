import {Link} from "react-router-dom";
import {useAuthContext} from "@/common/context/useAuthContext.tsx";

export const Header = () => {
  const context = useAuthContext();
  return (
    <>
    <Link to={"/"}>Blog</Link>
    {context?.user && <Link to={"/admin/persons"}>Admin</Link>}
    {!context?.user && <Link to={"/signup"}>Sign Up</Link>}
    {context?.user ? <Link to={"/signup"}>Login</Link> : <Link to={"/login"}>Login</Link>}
    </>
  );
};
