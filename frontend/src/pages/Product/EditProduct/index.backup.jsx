// /* eslint-disable jsx-a11y/alt-text */
// import React from "react";
// import {
//   getProductById,
//   resetSelectedProduct,
//   uploadProductAvatar,
//   updateProductDetails,
// } from "../../features/product/productSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Spinner from "../../components/Spinner";
// import { toast } from "react-toastify";

// function EditProduct(props) {
//   const { _id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { selectedProduct, isLoading, isError } = useSelector(
//     (state) => state.products
//   );
//   const [avatar, setAvatar] = React.useState(null);
//   const [productDetails, setProductDetails] = React.useState({
//     name: "",
//     description: "",
//     stock: "",
//     price: "",
//   });

//   React.useEffect(() => {
//     if (_id && selectedProduct === null) {
//       dispatch(getProductById(_id));
//     }
//     if (isError) {
//       console.log("error");
//       navigate("/");
//     }
//     if (selectedProduct) {
//       setProductDetails({
//         _id: selectedProduct._id,
//         name: selectedProduct.name,
//         description: selectedProduct.description,
//         price: selectedProduct.price,
//         stock: selectedProduct.stock,
//       });
//       setAvatar(selectedProduct.avatar.url);
//     }
//   }, [_id, dispatch, isError, navigate, selectedProduct]);

//   React.useEffect(() => {
//     return () => dispatch(resetSelectedProduct());
//   }, [dispatch]);

//   function uploadAvatar(e) {
//     e.preventDefault();
//     if (_id) {
//       const fd = new FormData();
//       fd.append("avatar", avatar, "avatar");
//       fd.append("_id", _id);
//       dispatch(uploadProductAvatar(fd));
//       toast.success("Success");
//     } else {
//       toast.error("Product id is not defined");
//     }
//   }

//   function updateDetails(e) {
//     e.preventDefault();
//     if (_id) {
//       console.log("productDetails", productDetails);
//       dispatch(updateProductDetails(productDetails));
//       toast.success("Success");
//     } else {
//       toast.error("Product id is not defined");
//     }
//   }

//   if (isLoading || selectedProduct === null) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       <section className="heading">Upload Details</section>

//       <section className="form">
//         <form onSubmit={updateDetails}>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               className="form-control"
//               required={true}
//               _id="name"
//               name="name"
//               value={productDetails.name}
//               placeholder="Update product name"
//               onChange={(e) =>
//                 setProductDetails({ ...productDetails, name: e.target.value })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Price</label>
//             <input
//               type="text"
//               className="form-control"
//               required={true}
//               _id="price"
//               name="price"
//               value={productDetails.price}
//               placeholder="Update product price"
//               onChange={(e) =>
//                 setProductDetails({ ...productDetails, price: e.target.value })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Stock</label>
//             <input
//               type="number"
//               className="form-control"
//               required={true}
//               _id="stock"
//               name="stock"
//               value={productDetails.stock}
//               placeholder="Update product stock"
//               onChange={(e) =>
//                 setProductDetails({ ...productDetails, stock: e.target.value })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               id="description"
//               name="description"
//               className="form-control"
//               required={true}
//               rows="4"
//               cols="50"
//               onChange={(e) =>
//                 setProductDetails({
//                   ...productDetails,
//                   description: e.target.value,
//                 })
//               }
//               value={productDetails.description}
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <button className="btn btn-block" type="submit">
//               Update Product Details
//             </button>
//           </div>
//         </form>
//       </section>

//       <section className="heading">Upload Avatar</section>

//       <section className="form">
//         <img
//           src={`${process.env.REACT_APP_API_URL}${selectedProduct.avatar.url}`}
//           height={400}
//           width={400}
//           className="img-fluid"
//         />
//         <form onSubmit={uploadAvatar}>
//           <div className="form-group">
//             <label>Avatar</label>
//             <input
//               type="file"
//               className="form-control"
//               required={true}
//               _id="avatar"
//               name="avatar"
//               // value={avatar.avatar}
//               placeholder="Enter your avatar"
//               onChange={(e) => setAvatar(e.target.files[0])}
//             />
//           </div>

//           <div className="form-group">
//             <button className="btn btn-block" type="submit">
//               Update Avatar
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default EditProduct;
