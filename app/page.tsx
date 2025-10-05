import Collection from "@/components/helpers/Collection";
import PageOne from "@/components/pages/pageOne";
import PageTwo from "@/components/pages/pageTwo";
import SectionOne from "@/components/pages/sectionOne";
import React from "react";

const Home = () => {
  return (
    <main className="relative overflow-hidden">
      <SectionOne />
      <PageOne />
      <PageTwo />
      {/* <Collection /> */}

      {/* <div className="h-screen bg-green-500"></div> */}
      {/* <div className="h-screen bg-red-500"></div> */}
    </main>
  );
};

export default Home;
