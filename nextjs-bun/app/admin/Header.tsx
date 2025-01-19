import Link from "next/link";

export const Header = () => {
  return (
    <>
      <Link href={"/"}>Blog</Link>
      {<Link href={"/admin/persons"}>Admin</Link>}
      {<Link href={"/signup"}>Sign Up</Link>}
      {<Link href={"/signup"}>Login</Link>}
    </>
  );
};
