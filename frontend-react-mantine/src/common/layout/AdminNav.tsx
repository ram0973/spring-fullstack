import {Link} from "react-router-dom";

export const AdminNav = () => {
  return (
    <><Link to={"/admin/users"}>Users</Link><Link to={"/admin/posts"}>Posts</Link></>
  );
};
