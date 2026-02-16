import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import CardView from "../components/IngredientsPage/CardView";
import TableView from "../components/IngredientsPage/TableView";
import AddEditIngredientModal from "../components/IngredientsPage/AddEditIngredientModal";
import ConfirmModal from "../components/UI/ConfirmModal";
import { IngredientUnits } from "../utils/constants";

const IngredientsPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditIngredientModalOpen, setIsAddEditIngredientModalOpen] =
    useState(false);
  const [
    isDeleteIngredientConfirmModalOpen,
    setIsDeleteIngredientConfirmModalOpen,
  ] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_ingredient,
    edit_ingredient,

    ingredient_add_success,
    ingredient_add_fail,

    ingredient_update_success,
    ingredient_update_fail,
    ingredient_delete_success,
    ingredient_delete_fail,
    ingredient_delete_modal_title,
    ingredient_delete_modal_message,
    ingredient_delete_modal_confirm,
  } = translations.pages.ingredients_page;

  const { cancel, empty_state, loading_error } = translations.common;

  const fetchIngredients = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("ingredients");
      console.log("result", result);
      setIngredients(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  function handleDeleteIngredient(Ingredient) {
    setSelectedIngredient(Ingredient);
    setIsDeleteIngredientConfirmModalOpen(true);
    console.log("Ingredient -> ", Ingredient);
  }
  function handleEditIngredient(Ingredient) {
    setSelectedIngredient(Ingredient);
    setIsAddEditIngredientModalOpen(true);
    console.log("Ingredient -> ", Ingredient);
  }

  function handleAddIngredient() {
    setSelectedIngredient(null);
    setIsAddEditIngredientModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditIngredientModalOpen(false);
    setIsDeleteIngredientConfirmModalOpen(false);
    setSelectedIngredient(null);
    // toast.success("Success! Operation completed.");
    // toast.error("Error! Something went wrong.");
    // toast.warning("Warning! Check this out.");
    // toast.default("Default info message.");
  };

  function addEditIngredient(payload) {
    if (selectedIngredient) {
      updateIngredient(payload);
    } else {
      addIngredient(payload);
    }
  }

  async function addIngredient(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`ingredients`, payload);
      setIngredients((prev) => [...prev, result.data]);
      showSuccess(result?.code, ingredient_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, ingredient_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateIngredient(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`ingredients/${selectedIngredient?.id}`, payload);
      setIngredients((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, ingredient_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, ingredient_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteIngredient() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`ingredients/${selectedIngredient.id}`);

      setIngredients((prev) =>
        prev.filter((cat) => cat.id != selectedIngredient.id),
      );

      showSuccess(result?.code, ingredient_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, ingredient_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  function getUnitName(unit) {
    const unitObj = IngredientUnits.find((u) => u?.value === unit);
    if (!unitObj) {
      return unit;
    }
    return translations.ingredient_units?.[unitObj?.key] ?? unit;
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddIngredient}>
            <Plus /> {add_new_ingredient}
          </Button>
        }
      />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : ingredients?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              ingredients={ingredients}
              handleEditIngredient={handleEditIngredient}
              handleDeleteIngredient={handleDeleteIngredient}
              getUnitName={getUnitName}
            />
          )}
          {view == "table" && (
            <TableView
              ingredients={ingredients}
              handleEditIngredient={handleEditIngredient}
              handleDeleteIngredient={handleDeleteIngredient}
              getUnitName={getUnitName}
            />
          )}
        </>
      )}

      <AddEditIngredientModal
        show={isAddEditIngredientModalOpen}
        onClose={closeModal}
        onConfirm={addEditIngredient}
        ingredient={selectedIngredient}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteIngredientConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteIngredient}
        title={ingredient_delete_modal_title}
        message={ingredient_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={ingredient_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default IngredientsPage;
