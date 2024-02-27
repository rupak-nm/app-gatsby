import { useRouter } from "@/src/hooks/useRouter";

import { Alert } from "@/common/Alert/Alert";
import { BreadCrumbs } from "@/common/BreadCrumbs/BreadCrumbs";
import { ComingSoon } from "@/common/ComingSoon";
import { Container } from "@/common/Container/Container";
import { Hero } from "@/common/Hero";
import { HeroStat } from "@/common/HeroStat";
import { HeroTitle } from "@/common/HeroTitle";
import { Loading, NoDataFound } from "@/common/Loading";
import { Seo } from "@/common/Seo";
import { Routes } from "@/src/config/routes";
import { useAppConstants } from "@/src/context/AppConstants";
import { useCoversAndProducts2 } from "@/src/context/CoversAndProductsData2";
import { isValidProduct } from "@/src/helpers/cover";
import { useActivePoliciesByCover } from "@/src/hooks/useActivePoliciesByCover";
import { useFetchReportsByKeyAndDate } from "@/src/hooks/useFetchReportsByKeyAndDate";
import { usePagination } from "@/src/hooks/usePagination";
import { ClaimCxTokensTable } from "@/src/modules/my-policies/ClaimCxTokensTable";
import { convertFromUnits } from "@/utils/bn";
import { formatCurrency } from "@/utils/formatter/currency";
import { Trans } from "@lingui/macro";

export const ClaimDetailsPage = ({
  disabled,
  coverKey,
  productKey,
  timestamp,
}) => {
  const router = useRouter();
  const { page, limit, setPage } = usePagination();

  const {
    loading: dataLoading,
    getProduct,
    getCoverByCoverKey,
  } = useCoversAndProducts2();
  const isDiversified = isValidProduct(productKey);
  const coverOrProductData = isDiversified
    ? getProduct(coverKey, productKey)
    : getCoverByCoverKey(coverKey);
  const projectOrProductName = isDiversified
    ? coverOrProductData?.productInfoDetails?.productName
    : coverOrProductData?.coverInfoDetails.coverName ||
      coverOrProductData?.coverInfoDetails.projectName;

  const { data, hasMore } = useActivePoliciesByCover({
    coverKey,
    productKey,
    page,
    limit,
  });
  const { data: reports, loading: loadingReports } =
    useFetchReportsByKeyAndDate({
      coverKey,
      incidentDate: timestamp,
    });
  const { liquidityTokenDecimals } = useAppConstants();

  if (dataLoading) {
    return <Loading />;
  }
  if (!coverOrProductData) {
    return <NoDataFound />;
  }

  if (disabled) {
    return <ComingSoon />;
  }

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque a nesciunt
      voluptas, repellendus tempora maxime accusamus similique consequuntur
      nulla hic provident iure! Necessitatibus rerum dolore doloribus dolorem
      obcaecati nostrum ex.
    </p>
  );
};
