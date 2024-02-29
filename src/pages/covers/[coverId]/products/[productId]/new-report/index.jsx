import { useRouter } from "@/src/hooks/useRouter";

import { ComingSoon } from "@/common/ComingSoon";
import { NewIncidentReportPage } from "@/modules/reporting/new";
import { isFeatureEnabled } from "@/src/config/environment";
import { safeFormatBytes32String } from "@/utils/formatter/bytes32String";

const disabled = !isFeatureEnabled("reporting");

export default function ReportingNewCoverPage({ pageContext: props }) {
  const { coverOrProductData, query } = props.data;
  const { coverId, productId } = query;

  const coverKey = safeFormatBytes32String(coverId);
  const productKey = safeFormatBytes32String(productId || "");

  if (disabled) {
    return <ComingSoon />;
  }

  return (
    <NewIncidentReportPage
      coverKey={coverKey}
      productKey={productKey}
      data={coverOrProductData}
    />
  );
}
