import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { create, read } from "../api/apiWrapper";
import { SORTING_TERMS } from "../utils/constants";
import FiltersContainer from "../components/PointOfSalePage/FiltersContainer";
import CardView from "../components/PointOfSalePage/CardView";
import Pagination from "../components/UI/Pagination";
import { useLanguage } from "../hooks/useLanguage";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { loadCart, saveCart } from "../utils/cartStorage";
import Cart from "./Cart";
import AddToCardModal from "../components/PointOfSalePage/AddToCardModal";
import { showFail, showSuccess } from "../utils/utils";
import { toast } from "../utils/toastHelper";
import { printBill } from "../utils/printBill";

// const carItems = [
//   {
//     id: 1,
//     name: "Tiramisu",
//     size: "Large",
//     price: 71.0,
//     quantity: 2,
//     extras: ["Whipped Cream", "Extra Chocolate"],
//   },
//   {
//     id: 2,
//     name: "Chocolate Cake",
//     size: "Large",
//     price: 55.0,
//     quantity: 1,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 3,
//     name: "Cupcake",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 4,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 5,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 6,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 7,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 8,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 9,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
//   {
//     id: 10,
//     name: "www",
//     size: "Large",
//     price: 25.0,
//     quantity: 3,
//     extras: ["Sprinkles", "Caramel Drizzle"],
//   },
// ];

const PointOfSalePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => loadCart() || []);
  const [tableNumber, setTableNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Items per page

  const debouncedSearch = useDebounce(searchText, 500);

  const { translations } = useLanguage();

  const { loading_error, empty_state } = translations.common;
  const { create_order_success, create_order_fail, empty } =
    translations.pages.point_of_sale_page;

  const fetchMenuItems = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      const queryParams = new URLSearchParams();

      queryParams.append("pageNumber", currentPage);
      queryParams.append("pageSize", pageSize);

      if (debouncedSearch?.trim() !== "") {
        queryParams.append("searchTerm", debouncedSearch.trim());
      }

      queryParams.append("sortBy", sortBy || SORTING_TERMS.NEWEST);

      if (categoryId > 0) {
        queryParams.append("categoryId", parseInt(categoryId));
      }

      const url = `menu-items?${queryParams.toString()}`;
      result = await read(url);
      setMenuItems(result?.data?.items || []);
      setTotalMenuItems(result?.data?.total || 0);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setErrorCode(result?.code);
      setMenuItems([]);
      setTotalMenuItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const storedCart = loadCart();
    if (storedCart?.length > 0) {
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [debouncedSearch, categoryId, sortBy, currentPage, pageSize]);

  const handleSearchInputChange = (e) => {
    console.log("search -> ", e.target.value);
    setSearchText(e.target.value);
    setSortBy(SORTING_TERMS.NEWEST);
    setCurrentPage(1);
  };

  const handleSortByChange = (e) => {
    console.log("Sorting Term -> ", e.target.value);
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSortBy("");
    setCurrentPage(1);
  };

  const handleAddToCart = (menuItem) => {
    if (
      menuItem?.menuItemSizes?.length > 0 ||
      menuItem?.menuItemExtras?.length > 0
    ) {
      setSelectedMenuItem(menuItem);
      setIsAddToCartModalOpen(true);
    } else {
      addToCart(menuItem);
    }
  };

  const addToCart = (menuItem, menuItemSize = null, extras = []) => {
    console.log("menuItem -> ", menuItem);
    console.log("menuItemSize -> ", menuItemSize);
    console.log("extras -> ", extras);

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.menuItem.id === menuItem.id &&
          item.menuItemSize?.id === menuItemSize?.id &&
          JSON.stringify(item.extras.map((e) => e.id).sort()) ===
            JSON.stringify(extras.map((e) => e.id).sort()),
      );

      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...prev,
        {
          menuItem: menuItem,
          menuItemSize: menuItemSize ? menuItemSize : null,
          extras: extras ? extras : [],
          quantity: 1,
        },
      ];
    });
  };

  const handleQuantityChange = (menuItemId, menuItemSizeId, extrasIds, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) {
        return prev.filter(
          (item) =>
            !(
              item.menuItem.id === menuItemId &&
              item.menuItemSize?.id === menuItemSizeId &&
              JSON.stringify(item.extras.map((e) => e.id).sort()) ===
                JSON.stringify(extrasIds.sort())
            ),
        );
      }

      return prev.map((item) =>
        item.menuItem.id === menuItemId &&
        item.menuItemSize?.id === menuItemSizeId &&
        JSON.stringify(item.extras.map((e) => e.id).sort()) ===
          JSON.stringify(extrasIds.sort())
          ? { ...item, quantity: qty }
          : item,
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmit = () => {
    if (cartItems?.length == 0) {
      toast.error(empty);
      return;
    }

    console.log("Submitting order for table:", tableNumber);
    console.log("Cart Items:", cartItems);

    // const payload = {
    //   tableId: 0, // for test
    //   items: cartItems.map((item) => ({
    //     menuItemId: item?.menuItem?.id,
    //     menuItemSizeId: item?.menuItemSize?.id,
    //     extrasIds: item?.extras?.map((extra) => extra.id),
    //     quantity: item.quantity,
    //   })),
    // };
    const payload = {
      items: cartItems.map((item) => ({
        menuItemId: item?.menuItem?.id,
        menuItemSizeId: item?.menuItemSize?.id,
        extrasIds: item?.extras?.map((extra) => extra.id),
        quantity: item.quantity,
      })),
    };
    console.log("Payload to API:", payload);

    createOrder(payload);
  };

  async function createOrder(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`orders`, payload);
      console.log("createOrder result -> ", result);
      showSuccess(result?.code, create_order_success);
      printBill(result.data);
      // clearCart();
      setCartItems([]);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, create_order_fail);
    } finally {
      setActionLoading(false);
    }
  }

  const closeModal = () => {
    setSelectedMenuItem(null);
    setIsAddToCartModalOpen(false);
  };

  return (
    // <div className="flex h-full gap-2 relative">
    <div className="flex flex-col lg:flex-row h-full gap-2 relative">
      <div className="flex-1">
        <FiltersContainer
          searchText={searchText}
          handleSearchInputChange={handleSearchInputChange}
          sortBy={sortBy}
          categoryId={categoryId}
          handleCategoryChange={handleCategoryChange}
          handleSortByChange={handleSortByChange}
          handleClearFilters={handleClearFilters}
          tableNumber={tableNumber}
          handleTableNumberChange={setTableNumber}
          className="flex-1 p-3"
        />
        {loading ? (
          <div className="grid place-items-center h-[60vh]">
            <SpinnerLoader />
          </div>
        ) : errorCode ? (
          <div className="grid place-items-center h-[60vh] text-red-500">
            {translations.server_codes[errorCode] || loading_error}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="grid place-items-center h-[60vh] text-gray-500">
            {empty_state}
          </div>
        ) : (
          <>
            <Pagination
              currentPage={currentPage}
              totalItems={totalMenuItems}
              onPageChange={handlePageChange}
              pageSize={pageSize}
            />

            <CardView menuItems={menuItems} onAddToCart={handleAddToCart} />

            <Pagination
              currentPage={currentPage}
              totalItems={totalMenuItems}
              onPageChange={handlePageChange}
              pageSize={pageSize}
            />
          </>
        )}
      </div>

      <Cart
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        tableNumber={tableNumber}
        onClearCart={handleClearCart}
        onSubmit={handleSubmit}
        actionLoading={actionLoading}
      />
      <AddToCardModal
        show={isAddToCartModalOpen}
        onClose={closeModal}
        menuItem={selectedMenuItem}
        addToCart={addToCart}
      />
    </div>
  );
};
export default PointOfSalePage;
