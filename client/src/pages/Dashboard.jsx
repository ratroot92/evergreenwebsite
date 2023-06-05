import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import CreateProduct from "./Product/CreateProduct";
import ListProducts from "./Product/ListProducts";
import CreateCategory from "./Category/CreateCategory";
import ListCategory from "./Category/ListCategory";
import { toast } from "react-toastify";

function Dashboard(props) {
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section></section>
      <section>
        {/* <CreateProduct />
        <ListProducts /> */}
        <CreateCategory />
        <ListCategory />
      </section>
    </>
  );
}

export default Dashboard;
