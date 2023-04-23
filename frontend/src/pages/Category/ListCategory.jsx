import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { FaEdit, FaListAlt, FaTrashAlt } from "react-icons/fa";
import { getCategories } from "../../features/category/categorySlice";
function ListCategory(props) {
  const { isSuccess, isError, isLoading, categories, message } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!categories.length && !isError) {
      dispatch(getCategories());
    }
  }, [isError, isLoading, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaListAlt /> List Categories
        </h1>
      </section>
      <table className="table  table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" width="100%">
              Desc
            </th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => {
            return (
              <tr key={category._id}>
                <th scope="row">{index++}</th>
                <td>{category.name}</td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "1rem",
                  }}
                >
                  {category.description}
                </td>
                <td>{category.price}</td>
                <td>{category.stock}</td>
                <td>
                  <Link to={`/category/${category._id}`}>
                    <FaEdit color={"green"} />
                  </Link>
                </td>
                <td>
                  <FaTrashAlt color={"red"} />
                  <Link to={`/category/${category._id}`}> </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListCategory;
