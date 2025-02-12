/* eslint-disable react-hooks/exhaustive-deps */
import debounce from "debounce";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { getPackages } from "../api/ApiRoutesFile";
import ApiFunction from "../api/apiFuntions";
import { handleError } from "../api/errorHandler";
import CreatePackage from "../dashboard/Package/CreatePackage";
import PackageCard from "../dashboard/PackageCard";
import { setPackages } from "../redux/pricingPackage";

export default function Package() {
  const [isLoading, setIsLoading] = useState(true);
  const { get } = ApiFunction();
  const [subscriptionPlan, setSubscriptionPlan] = useState("month");

  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.pricingPackage.packages);

  const getAllPackages = debounce(async () => {
    await get(getPackages)
      .then((result) => {
        if (result.success) {
          dispatch(setPackages(result.packages));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllPackages();
  }, []);

  const filteredPackages = allPackages
    ?.filter((pkg) => pkg.interval === subscriptionPlan)
    ?.sort((a, b) => {
      const amountA = parseInt(a.amount, 10);
      const amountB = parseInt(b.amount, 10);
      return amountA - amountB;
    }) || [];

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <div className="px-[1rem] md:px-5 py-4 bg_white border rounded-lg border-white w-full">
          <h4 className="inter_medium">Present Packages</h4>
          <p className="text-sm text-[#7F848D]">
            Using basic skills you can improve your business stuff with Around
          </p>
          <div className="rounded-xl max-w-sm m-auto bg-light p-0.5">
            <div className="relative grid grid-cols-[1fr,1fr] gap-x-0.5">
              <div
                className={`bg-white absolute left-0 top-0 h-full w-[calc((100%-2px)/2)] rounded-[10px] bg-primary transition-transform duration-500 ease-in-out shadow-[0px_4px_4px_-2px_rgba(24,_39,_75,_0.06),_0px_2px_4px_-2px_rgba(24,_39,_75,_0.02),0px_0px_2px_0px_#E0E0E0] ${subscriptionPlan === "year" ? "translate-x-[calc(100%+2px)]" : ""
                  }`}
              ></div>
              <button
                className={`isolate text-sm transition-colors duration-500 ease-emphasized-in-out rounded-[10px] px-4 py-2 ${subscriptionPlan === "month" ? "text-black" : "text-[#7F848D]"
                  }`}
                onClick={() => setSubscriptionPlan("month")}
              >
                Monthly
              </button>
              <button
                onClick={() => setSubscriptionPlan("year")}
                className={`isolate text-sm transition-colors duration-500 ease-emphasized-in-out rounded-[10px] px-4 py-2 ${subscriptionPlan === "year" ? "text-black" : "text-[#7F848D]"
                  }`}
              >
                Annual
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-5">
              <HashLoader  className="mx-auto"   color="#1857d2" size={25} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mx-auto">
              {filteredPackages.length > 0 ? (
                filteredPackages?.map((pkg) => (
                  <PackageCard key={pkg.id} packageData={pkg} />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No packages available for the selected plan.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <CreatePackage allPackages={allPackages} />
    </>
  );
}