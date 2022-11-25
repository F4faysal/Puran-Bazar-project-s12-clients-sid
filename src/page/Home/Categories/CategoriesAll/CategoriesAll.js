import { useQuery } from "@tanstack/react-query";
import React from "react";
import smartphone from "../../../../assets/smartphone.png";
import AllPageTopSection from "../../../../Components/AllPageTopSection/AllPageTopSection";
import ExpCard from "../../../../Components/Card/ExpCard";
const CategoriesAll = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const url = "http://localhost:5000/categories";
        // try cghat function handel to error
        const res = await fetch(
          url
          // ,         {
          //       headers: {
          //         // authorization: `bearer ${localStorage.getItem("accessToken")}`,
          //       },
          //     }
        );
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log("errorerror", error);
      }
    },
  });

  return (
    <div>
      <AllPageTopSection
        heding={
          <>
            SELL YOUR <br /> <span className="text-primary">SMARTPHONE</span>
            <br /> FOR QUICK CASH
          </>
        }
        matchPhonot={smartphone}
        serchTogol={true}
      ></AllPageTopSection>
      <hr />

      <div className="hero mb-10">
        <div className="hero-content lg:flex-col">
          <div className="hero-content flex-col lg:flex-row-reverse ">
            {categories.map((categorie, i) => (
              <ExpCard key={i} categorie={categorie}></ExpCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAll;