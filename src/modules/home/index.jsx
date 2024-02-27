import { BridgeModule } from "@/modules/bridge/BridgeModule";
import AnnouncementBanner from "@/modules/home/AnnouncementBanner";
import { AvailableCovers } from "@/modules/home/AvailableCovers";
import { Insights } from "@/modules/insights";
import { isFeatureEnabled } from "@/src/config/environment";
import { ChainConfig } from "@/src/config/hardcoded";
import { useNetwork } from "@/src/context/Network";

// const DynamicInsights = dynamic(() => { return import('@/modules/insights').then((mod) => { return mod.Insights }) }, {
//   loading: () => { return <InsightsSkeleton /> }
// })

export default function HomePage() {
  const { networkId } = useNetwork();

  const networkDetails = ChainConfig[networkId];

  const isCelerBridgeEnabled = isFeatureEnabled("bridge-celer");
  const isLayerZeroBridgeEnabled = isFeatureEnabled("bridge-layerzero");
  const bridgeEnabled = isCelerBridgeEnabled || isLayerZeroBridgeEnabled;

  if (bridgeEnabled && !networkDetails) {
    return <BridgeModule />;
  }

  if (!networkDetails) {
    return <></>;
  }

  return (
    <>
      <Insights />
      <hr className="border-b border-B0C4DB" />

      <AnnouncementBanner />

      <AvailableCovers />
    </>
  );
}
