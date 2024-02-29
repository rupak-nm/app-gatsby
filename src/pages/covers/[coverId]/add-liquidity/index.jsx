import { useRouter } from "@/src/hooks/useRouter";

import { ComingSoon } from "@/common/ComingSoon";
import { LiquidityFormsProvider } from "@/common/LiquidityForms/LiquidityFormsContext";
import { Seo } from "@/common/Seo";
import { isFeatureEnabled } from "@/src/config/environment";
import { CoverAddLiquidityDetailsPage } from "@/src/modules/cover/add-liquidity";
import { safeFormatBytes32String } from "@/utils/formatter/bytes32String";

const disabled = !isFeatureEnabled("liquidity");

export default function CoverAddLiquidityDetails({ pageContext: props }) {
  const { coverOrProductData, query } = props.data;
  const { coverId } = query;
  const coverKey = safeFormatBytes32String(coverId);

  if (disabled) {
    return <ComingSoon />;
  }

  return (
    <>
      <Seo />

      <LiquidityFormsProvider coverKey={coverKey}>
        <CoverAddLiquidityDetailsPage
          coverOrProductData={coverOrProductData}
          query={query}
        />
      </LiquidityFormsProvider>
    </>
  );
}
