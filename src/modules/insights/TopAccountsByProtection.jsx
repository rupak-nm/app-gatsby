import { useRouter } from "@/src/hooks/useRouter";

import { renderHeader } from "@/common/Table/renderHeader";
import { Table, TableWrapper, TBody, THead } from "@/common/Table/Table";
import { TOP_ACCOUNTS_ROWS_PER_PAGE } from "@/src/config/constants";
import { classNames } from "@/utils/classnames";
import { formatCurrency } from "@/utils/formatter/currency";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const renderAccount = (row, { page }, rowIndex) => {
  const trueRowIndex = rowIndex + 1 + (page - 1) * TOP_ACCOUNTS_ROWS_PER_PAGE;

  return (
    <td className="flex items-center gap-2 px-6 py-4 text-sm whitespace-nowrap text-01052D">
      <div className="p-0.5">
        <span
          className={classNames(
            "w-5 h-5 rounded-full shrink-0 flex text-sm items-center justify-center",
            trueRowIndex < 4 ? "bg-4E7DD9 text-white" : "bg-DEEAF6 text-01052D"
          )}
        >
          {trueRowIndex}
        </span>
      </div>
      <span className="w-auto lg:w-[396px]">{row.onBehalfOf}</span>
    </td>
  );
};

const renderPolicies = (row) => {
  return (
    <td className="max-w-xs px-6 py-4.5 text-sm leading-5 text-right whitespace-nowrap text-01052D">
      {row.policies}
    </td>
  );
};

const renderProtection = (row, { locale }) => {
  return (
    <td
      className="max-w-xs px-6 py-4.5 text-sm leading-5 text-right whitespace-nowrap text-01052D"
      title={formatCurrency(row.protection, locale).long}
    >
      {formatCurrency(row.protection, locale).short}
    </td>
  );
};

/**
 * Returns an array of column objects for the proposals table.
 * Each object represents a column and contains properties such as id, name, alignment, and render functions.
 *
 * @param {import('@lingui/core').I18n} i18n - The I18n instance from Lingui library.
 * @returns {Array<{id: string, name: string, align: string, renderHeader: Function, renderData: (row: any, extraData: any, index: number) => React.JSX.Element}>} An array of column objects.
 */
const getColumns = (i18n) => {
  return [
    {
      id: "account",
      name: t(i18n)`account`,
      align: "left",
      renderHeader,
      renderData: renderAccount,
    },
    {
      id: "policies",
      name: t(i18n)`policies`,
      align: "right",
      renderHeader,
      renderData: renderPolicies,
    },
    {
      id: "protection",
      name: t(i18n)`protection`,
      align: "right",
      renderHeader,
      renderData: renderProtection,
    },
  ];
};

export const TopAccountsByProtection = ({
  userData = [],
  page = 1,
  loading,
}) => {
  const { locale } = useRouter();

  const paginatedData = userData.slice(
    (page - 1) * TOP_ACCOUNTS_ROWS_PER_PAGE,
    (page - 1) * TOP_ACCOUNTS_ROWS_PER_PAGE + TOP_ACCOUNTS_ROWS_PER_PAGE
  );

  const { i18n } = useLingui();
  const columns = getColumns(i18n);

  return (
    <TableWrapper className="mt-0">
      <Table>
        <THead columns={columns} />
        <TBody
          extraData={{
            page,
            locale,
          }}
          isLoading={loading}
          columns={columns}
          data={paginatedData}
        />
      </Table>
    </TableWrapper>
  );
};
