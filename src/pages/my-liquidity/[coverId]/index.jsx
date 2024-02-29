import { useRouter } from "@/src/hooks/useRouter";

import { ComingSoon } from "@/common/ComingSoon";
import { LiquidityFormsProvider } from "@/common/LiquidityForms/LiquidityFormsContext";
import { Seo } from "@/common/Seo";
import { isFeatureEnabled } from "@/src/config/environment";
import { ProvideLiquidityToCover } from "@/src/modules/my-liquidity/details";
import { safeFormatBytes32String } from "@/utils/formatter/bytes32String";

const disabled = !isFeatureEnabled("liquidity");

export default function MyLiquidityCover({ pageContext: props }) {
  const { coverOrProductData, query } = props.data;
  const { coverId } = query;

  const coverKey = safeFormatBytes32String(coverId);
  const productKey = safeFormatBytes32String("");

  if (disabled) {
    return <ComingSoon />;
  }

  return (
    <main>
      <Seo />

      <LiquidityFormsProvider coverKey={coverKey}>
        <ProvideLiquidityToCover
          coverKey={coverKey}
          productKey={productKey}
          data={coverOrProductData}
        />
      </LiquidityFormsProvider>
    </main>
  );
}
