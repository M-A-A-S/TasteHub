import { Plus } from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import Modal from "../components/UI/Modal";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { read } from "../api/apiWrapper";
import CardView from "../components/MenuCategoriesPage/CardView";
import TableView from "../components/MenuCategoriesPage/TableView";
import AddEditCategoryModal from "../components/MenuCategoriesPage/AddEditCategoryModal";

const MenuCategoriesPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddEditCategoryModalOpen, setIsAddEditCategoryModalOpen] =
    useState(false);
  const [
    isDeleteCategoryConfirmModalOpen,
    setIsDeleteCategoryConfirmModalOpen,
  ] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { translations } = useLanguage();
  const { title, description, add_new_category, edit_category, empty_state } =
    translations.pages.categories_page;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await read("menu-categories");
      console.log("result", result);
      setCategories(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleDeleteCategory(category) {
    setSelectedCategory(category);
    setIsDeleteCategoryConfirmModalOpen(true);
    console.log("category -> ", category);
  }
  function handleEditCategory(category) {
    setSelectedCategory(category);
    setIsAddEditCategoryModalOpen(true);
    console.log("category -> ", category);
  }

  function handleAddCategory() {
    setSelectedCategory(null);
    setIsAddEditCategoryModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditCategoryModalOpen(false);
    setIsDeleteCategoryConfirmModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button>
            <Plus /> {add_new_category}
          </Button>
        }
      />
      <ViewSwitcher view={view} setView={setView} />
      {view == "card" && (
        <CardView
          categories={categories}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
      {view == "table" && (
        <TableView
          categories={categories}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
      <h1>MenuCategoriesPage</h1>
    </div>
  );
};
export default MenuCategoriesPage;
