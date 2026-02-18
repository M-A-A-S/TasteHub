import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import CardView from "../components/IngredientBatchesPage/CardView";
import TableView from "../components/IngredientBatchesPage/TableView";

const IngredientBatchesPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [ingredientBatches, setIngredientBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const { translations } = useLanguage();
  const { title, description } = translations.pages.ingredient_batches_page;
  const { empty_state, loading_error } = translations.common;

  const fetchIngredientBatches = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("ingredient-batches");
      console.log("result", result);
      setIngredientBatches(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredientBatches();
  }, []);

  return (
    <div>
      <PageHeader title={title} description={description} />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : ingredientBatches?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && <CardView ingredientBatches={ingredientBatches} />}
          {view == "table" && (
            <TableView ingredientBatches={ingredientBatches} />
          )}
        </>
      )}
    </div>
  );
};
export default IngredientBatchesPage;
