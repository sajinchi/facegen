"use client";

import Authorization from "@/hocs/withAuth.hoc";

const Home = () => {
  return (
    <Authorization>
      <div>
        Home Page
      </div>
    </Authorization>
  );
}
export default Home;