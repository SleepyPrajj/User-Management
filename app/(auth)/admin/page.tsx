import React from "react";
import { deleteUser } from "@/lib/actions/delete";
import { fetchUsers } from "@/lib/actions/get";
import Pagination from "@/components/dashboard/Pagination";
import styles from "./users.module.css"
import Image from "next/image";
import Link from "next/link";
import Search  from "./search";
import { getSession, signIn, signOut } from "next-auth/react";

async function getServerSideProps() {
  const session = await getSession();

  if (session && session.user.Role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: true, // Set to true for permanent redirection
      },
    };
  }
}

const AdminsPage = async (
  {searchParams}:{
    searchParams?:{
      query?:string;
      page?:number;
    }
  }
) => 
{
  const q  = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  return (
    <section className=" mt-32 h-full w-100">
      <div className={`${styles.top} fixed`}>
        {/* <Search placeholder="Search for a user..." /> */}
        {/* <Search /> */}
        <h2>Welcome Admin</h2>
        <Search />
        <Link href="/admin/add">
          <button type="button" className="btn-primarypy-3 p-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">Create New User</button>
        </Link>
      </div>
      <div className={`${styles.container} containerScrollable containerRelative`}>
        
        <div className="overflow-auto">
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Created At</td>
                <td>Role</td>
                <td>Organization</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="m-16">
                  <td>
                    <div className={styles.user}>
                      <Image
                        src={user.image || "https://i.pinimg.com/564x/e6/d5/7d/e6d57d498cdcf7c6b921bb368c54ccfa.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.createdAt?.toString().slice(4, 16)}</td>
                  <td>{user.role==="user" ? "Client":"Manager"}</td>
                  <td>
                    {
                      user.tenant.map((item: any) => {
                        return <p  key={item._id}>{item.tenantName + " : "+ item.role}</p>;
                      }
                      )
                    }
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/admin/view-user/?id=${user._id}`}>
                        <button className="btn-primarypy-3 p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                      Edit
                        </button>
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={(user.id)} />
                        <button className="btn-primarypy-3 p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                      Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination count={count} />
      </div>
    </section>
  )
}

export default AdminsPage;
