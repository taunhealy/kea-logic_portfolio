import React from "react";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      Admin Page
      <h1>This is the admin page</h1>
      <div className="flex-center flex p-5">
        <Link href="/admin/posts">View Posts</Link>
      </div>
    </div>
  );
};

export default AdminPage;
