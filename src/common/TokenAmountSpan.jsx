import { convertFromUnits } from "@/utils/bn";
import { formatCurrency } from "@/utils/formatter/currency";
import { useRouter } from "@/src/hooks/useRouter";

export const TokenAmountSpan = ({
  amountInUnits,
  symbol = undefined,
  className = null,
  decimals,
}) => {
  const router = useRouter();

  return (
    <span
      className={className}
      title={`${
        formatCurrency(
          convertFromUnits(amountInUnits, decimals).toString(),
          router.locale,
          symbol,
          typeof symbol !== "undefined"
        ).long
      }`}
      data-testid="token-amount-span"
    >
      {
        formatCurrency(
          convertFromUnits(amountInUnits, decimals).toString(),
          router.locale,
          symbol,
          typeof symbol !== "undefined"
        ).short
      }
    </span>
  );
};
