import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../features/product/productSlice";
import Spinner from "../../components/Spinner";
import { FaEdit, FaListAlt, FaTrashAlt } from "react-icons/fa";
function ListProducts(props) {
  const { isSuccess, isError, isLoading, products, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!products.length && !isError) {
      dispatch(getProducts());
    }
  }, [isError, isLoading, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaListAlt /> List Products
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
          {products?.map((product, index) => {
            return (
              <tr key={product._id}>
                <th scope="row">{index++}</th>
                <td>{product.name}</td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "1rem",
                  }}
                >
                  {product.description}
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <FaEdit color={"green"} />
                  </Link>
                </td>
                <td>
                  <FaTrashAlt color={"red"} />
                  <Link to={`/product/${product._id}`}> </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListProducts;
