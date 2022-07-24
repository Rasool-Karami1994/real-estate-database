import AddCategory from "./pages/add-new-category/AddCategory";
import AddItem from "./pages/add-new-item/AddItem";
import MainPage from "./pages/main-page/MainPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/additem", element: <AddItem /> },
  { path: "/addcategory", element: <AddCategory /> },
];
export default routes;
