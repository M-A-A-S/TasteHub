import { Plus } from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import Modal from "../components/UI/Modal";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { read, remove } from "../api/apiWrapper";
import CardView from "../components/MenuCategoriesPage/CardView";
import TableView from "../components/MenuCategoriesPage/TableView";
import AddEditCategoryModal from "../components/MenuCategoriesPage/AddEditCategoryModal";
import ConfirmModal from "../components/UI/ConfirmModal";
import { toast } from "../utils/toastHelper";
import { showFail, showSuccess } from "../utils/utils";

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
  const {
    title,
    description,
    add_new_category,
    edit_category,
    empty_state,
    delete_success,
    delete_fail,
    delete_category_title,
    delete_category_message,
    delete_label,
  } = translations.pages.categories_page;

  const { cancel } = translations.common;

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
    // toast.success("Success! Operation completed.");
    // toast.error("Error! Something went wrong.");
    // toast.warning("Warning! Check this out.");
    // toast.default("Default info message.");
  };

  async function deleteCategory() {
    let result;
    try {
      result = await remove(`menu-categories/${selectedCategory.id}`);

      setCategories((prev) =>
        prev.filter((cat) => cat.id != selectedCategory.id),
      );

      showSuccess(result?.code, delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, delete_fail);
    } finally {
      closeModal();
    }
  }

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
      <ConfirmModal
        show={isDeleteCategoryConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteCategory}
        title={delete_category_title}
        message={delete_category_message}
        cancelLabel={cancel}
        confirmLabel={delete_label}
      />
    </div>
  );
};
export default MenuCategoriesPage;
