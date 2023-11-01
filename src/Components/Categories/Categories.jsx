/* eslint-disable react/prop-types */
// import products from '../../Data/products.json';
// import "./Categories.css";

// function Categories({ onCategorySelect }) {

//   const uniqueCategories = ["Todas", ...new Set(products.map(product => product.category))];

//   return (
//     <div className="categories">
//       {uniqueCategories.map(category => (
//         <div
//           key={category}
//           className="category-item"
//           onClick={() => onCategorySelect(category === "Todas" ? null : category)}
//         >
//           {category}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Categories;
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../Data/firebaseApp";
import "./Categories.css";

function Categories({ onCategorySelect }) {
  const [categories, setCategories] = useState(["Todas"]);

  useEffect(() => {
    const fetchCategories = async () => {
      const db = getFirestore(app);
      const productsCol = collection(db, "menu");

      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map((doc) => doc.data());
      console.log(productList);
      
      // Extraer las categorías únicas
      const uniqueCategories = [
        "Todas",
        ...new Set(productList.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories">
      {categories.map((category) => (
        <div
          key={category}
          className="category-item"
          onClick={() =>
            onCategorySelect(category === "Todas" ? null : category)
          }
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default Categories;
