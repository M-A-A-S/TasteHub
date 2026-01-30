import { Pencil, PencilRuler, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import Table from "../UI/Table";

const TableView = ({
  menuItems,
  handleEditMenuItem,
  handleDeleteMenuItem,
  handleMenuItemSizes,
}) => {
  const { translations, language } = useLanguage();
  const {
    id,
    name,
    category,
    description,
    price,
    status,
    created,
    updated,
    actions,
  } = translations.pages.menu_page.table_headers;

  const { active, inactive } = translations.pages.menu_page;

  const onEdit = safeCall(handleEditMenuItem);
  const onDelete = safeCall(handleDeleteMenuItem);
  const hanldeSizes = safeCall(handleMenuItemSizes);

  /*
  category
: 
{id: 6, nameEn: "ddddddfadfaff", nameAr: "ddddddddfdasfff", descriptionEn: "ddddddddfafdaff",…}
createdAt
: 
"2026-01-24T14:14:52.8156616"
descriptionAr
: 
"dddddfffffdafaff"
descriptionEn
: 
"ddddddddfafdaff"
id
: 
6
menuItems
: 
null
nameAr
: 
"ddddddddfdasfff"
nameEn
: 
"ddddddfadfaff"
updatedAt
: 
"2026-01-25T09:26:47.1141856"
createdAt
: 
"2026-01-25T10:23:23.8764336"
descriptionAr
: 
"Test Description Test Description 1"
descriptionEn
: 
"Test Description Test Description 1"
id
: 
29
imageUrl
: 
"https://localhost:7141/Uploads/MenuItems/c1b1171c-ba5d-43d5-ae8c-f23e53244f0d.png"
isActive
: 
true
nameAr
: 
"Test Name 1"
nameEn
: 
"Test Name 1"
price
: 
0
updatedAt
: 
"2026-01-25T10:23:23.8765899"
  */

  return (
    <Table
      headers={[
        id,
        name,
        category,
        description,
        price,
        status,
        created,
        updated,
        actions,
      ]}
      data={menuItems?.map((menuItem) => ({
        id: <small>{menuItem.id}</small>,
        name: (
          <small>{language == "en" ? menuItem.nameEn : menuItem.nameAr}</small>
        ),
        category: (
          <small className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 w-fit">
            {language == "en"
              ? menuItem?.menuCategory?.nameEn
              : menuItem?.menuCategory?.nameAr}
          </small>
        ),
        description: (
          <small>
            {language == "en" ? menuItem.descriptionEn : menuItem.descriptionAr}
          </small>
        ),
        price: <small>{Number(menuItem?.price ?? 0).toFixed(2)}</small>,
        status: (
          <small
            className={`text-xs px-2 py-1 rounded-full ${
              menuItem?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {menuItem?.isActive ? active : inactive}
          </small>
        ),
        created: (
          <small>{new Date(menuItem.updatedAt).toLocaleDateString()}</small>
        ),
        updated: (
          <small>{new Date(menuItem.updatedAt).toLocaleDateString()}</small>
        ),
        actions: (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(menuItem)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(menuItem)}
              className="p-2 text-red-500 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => hanldeSizes(menuItem)}
              className="text-gray-500 p-2 rounded-lg 
          hover:text-orange-500 transition "
            >
              <PencilRuler size={18} />
            </button>
          </div>
        ),
      }))}
    />
  );
};
export default TableView;
