import { Plus } from "lucide-react";
import Button from "../components/UI/Button";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { create, read, remove, update } from "../api/apiWrapper";
import CardView from "../components/MenuCategoriesPage/CardView";
import TableView from "../components/MenuCategoriesPage/TableView";
import AddEditCategoryModal from "../components/MenuCategoriesPage/AddEditCategoryModal";
import ConfirmModal from "../components/UI/ConfirmModal";
import { showFail, showSuccess } from "../utils/utils";
import SpinnerLoader from "../components/UI/SpinnerLoader";

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
    empty_state,
    delete_success,
    delete_fail,
    delete_category_title,
    delete_category_message,
    delete_label,
    add_success,
    add_fail,
    update_success,
    update_fail,
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

  function addEditCategory(payload) {
    if (selectedCategory) {
      updateCategory(payload);
    } else {
      addCategory(payload);
    }
  }

  async function addCategory(payload) {
    let result;
    try {
      result = await create(`menu-categories`, payload);
      setCategories((prev) => [...prev, result.data]);
      showSuccess(result?.code, add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, add_fail);
    } finally {
      closeModal();
    }
  }

  async function updateCategory(payload) {
    let result;
    try {
      result = await update(`menu-categories/${selectedCategory?.id}`, payload);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, update_fail);
    } finally {
      closeModal();
    }
  }

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

  if (loading) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <SpinnerLoader />
      </div>
    );
  }

  if (categories.length <= 0) {
    return <h2>{empty_state}</h2>;
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddCategory}>
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
      <AddEditCategoryModal
        show={isAddEditCategoryModalOpen}
        onClose={closeModal}
        onConfirm={addEditCategory}
        category={selectedCategory}
      />
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
