import { useRouter } from "@/src/hooks/useRouter";

import { Seo } from "@/common/Seo";
import { DiversifiedCoverTermsPage } from "@/modules/cover/cover-terms/DiversifiedCoverTermsPage";
import { SingleCoverTermsPage } from "@/modules/cover/cover-terms/SingleCoverTermsPage";
import { useCoversAndProducts2 } from "@/src/context/CoversAndProductsData2";
import { safeFormatBytes32String } from "@/utils/formatter/bytes32String";

export default function CoverTermsPage({ pageContext: props }) {
  const { coverOrProductData, query } = props.data;
  const { coverId } = query;

  const { loading, getCoverByCoverKey, getProductsByCoverKey } =
    useCoversAndProducts2();

  const coverKey = safeFormatBytes32String(coverId);

  const coverData = getCoverByCoverKey(coverKey) || coverOrProductData;
  const isDiversified = coverData?.supportsProducts;

  return (
    <main>
      <Seo />

      <div className="px-8 pt-8 bg-white md:pt-14 sm:px-12 md:px-20 lg:px-36 xl:px-56 pb-14 text-000000">
        {isDiversified ? (
          <DiversifiedCoverTermsPage
            loading={loading}
            coverData={coverData}
            subProducts={getProductsByCoverKey(coverKey)}
          />
        ) : (
          <SingleCoverTermsPage
            loading={loading}
            coverOrProductData={coverData}
          />
        )}
      </div>
    </main>
  );
}
