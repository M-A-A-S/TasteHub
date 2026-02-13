import { translationsFiles } from "../locales/index.js";
import { formatMoney } from "./utils.jsx";

const getTranslations = () => {
  const language = localStorage.getItem("tastehub-language") || "en";
  return language === "en" ? translationsFiles.en : translationsFiles.ar;
};

const getLanguage = () => {
  return localStorage.getItem("tastehub-language") || "en";
};

export const printBill = (order) => {
  if (!order || !order.orderItems || order.orderItems.length === 0) {
    return;
  }

  const translations = getTranslations();
  const language = getLanguage();

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const align = isArabic ? "right" : "left";

  const { name, qty, price, billTitle, table, subtotal, tax, total } =
    translations.pages.point_of_sale_page.bill;

  let html = `
    <html dir="${dir}">
      <head>
        <title>${billTitle}</title>
        <style>
          body {
          font-family: Arial;
          padding: 20px;
          direction: ${dir};
          text-align: ${align};
        }
          table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 8px;
          border-bottom: 1px solid #ccc;
          text-align: ${align};
        }

        .extras {
          font-size: 12px;
          color: gray;
        }

        .total {
          font-weight: bold;
        }

        </style>
      </head>
      <body>
        <h3>${table || "Table"}: ${order.tableId}</h3>
        <table>
          <thead>
            <tr>
              <th>${name || "Item"}</th>
              <th>${qty || "Qty"}</th>
              <th>${price || "Price"}</th>
            </tr>
          </thead>
          <tbody>
  `;

  order.orderItems.forEach((item) => {
    let itemName = "";

    if (item.menuItemSize?.menuItem) {
      itemName = isArabic
        ? item.menuItemSize.menuItem.nameAr
        : item.menuItemSize.menuItem.nameEn;
    } else if (item.menuItem) {
      itemName = isArabic ? item.menuItem.nameAr : item.menuItem.nameEn;
    }

    const sizeName = item.menuItemSize?.size
      ? isArabic
        ? item.menuItemSize.size.nameAr
        : item.menuItemSize.size.nameEn
      : "";

    const lineTotal = formatMoney(item.lineTotal);

    html += `
      <tr>
        <td>${itemName} ${sizeName ? `(${sizeName})` : ""}</td>
        <td>${item.quantity}</td>
        <td>${lineTotal}</td>
      </tr>
    `;

    item.orderItemExtras?.forEach((orderItemExtra) => {
      const extraName =
        language === "en"
          ? orderItemExtra.extra?.nameEn
          : orderItemExtra.extra?.nameAr;
      html += `
        <tr class="extras">
          <td>+ ${extraName}</td>
          <td></td>
          <td>${formatMoney(orderItemExtra.price)}</td>
        </tr>
      `;
    });
  });

  html += `
        </tbody>
      </table>
      <p class="total">${subtotal || "Subtotal"}: ${formatMoney(order.subtotalAmount)}</p>
      <p class="total">${tax || "Tax"}: ${formatMoney(order.taxAmount)}</p>
      <p class="total">${total || "Total"}: ${formatMoney(order.grandTotal)}</p>
    </body>
    </html>
  `;

  const printWindow = window.open("", "", "width=600,height=800");
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};
