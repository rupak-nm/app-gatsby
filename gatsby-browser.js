import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./lib/connect-wallet/utils/web3";
import { DEFAULT_VARIANT } from "./src/config/toast";
import "./src/styles/global.css";
import { NetworkProvider } from "./src/context/Network";
import { AppConstantsProvider } from "./src/context/AppConstants";
import { CoversAndProductsProvider2 } from "./src/context/CoversAndProductsData2";
import { UnlimitedApprovalProvider } from "./src/context/UnlimitedApproval";
import { ToastProvider } from "./lib/toast/provider";
import { TxPosterProvider } from "./src/context/TxPoster";
import { MainLayout } from "./src/layouts/main/MainLayout";
import { WalletDisclaimerPoup } from "./lib/connect-wallet/components/ConnectWallet/WalletDisclaimerPopup";
import { CookiesProvider } from "./src/context/Cookie";
import ErrorBoundary from "@/common/ErrorBoundary";
import { LocationProvider } from "@reach/router";

import { LanguageProvider } from "./src/i18n";

const Wrappers = ({ children }) => {
  return (
    <LocationProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <NetworkProvider>
          <AppConstantsProvider>
            <CoversAndProductsProvider2>
              <UnlimitedApprovalProvider>
                <ToastProvider variant={DEFAULT_VARIANT}>
                  <TxPosterProvider>
                    <MainLayout>{children}</MainLayout>
                    <WalletDisclaimerPoup />
                  </TxPosterProvider>
                </ToastProvider>
              </UnlimitedApprovalProvider>
            </CoversAndProductsProvider2>
          </AppConstantsProvider>
        </NetworkProvider>
      </Web3ReactProvider>
    </LocationProvider>
  );
};

export const wrapRootElement = ({ element }) => (
  <CookiesProvider>
    <ErrorBoundary>
      <LanguageProvider>
        <Wrappers>{element}</Wrappers>
      </LanguageProvider>
    </ErrorBoundary>
  </CookiesProvider>
);
