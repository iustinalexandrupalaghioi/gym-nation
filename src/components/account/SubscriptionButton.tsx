import {
  getCheckoutUrl,
  getPortalUrl,
} from "../../utilities/stripeSubscription";
import useUserStatusStore from "../../stores/userStore";

interface Props {
  setLoading: (value: boolean) => void;
  styleClass: string;
}

const SubscriptionButton = ({ setLoading, styleClass }: Props) => {
  const isPremium = useUserStatusStore((s) => s.userStatus.isPremium);

  // handle upgrade to premium function
  const upgradeToPremium = async () => {
    try {
      const priceId = "price_1PRWZeP64kuct9Hh0pd8XtP8";
      const checkoutUrl = await getCheckoutUrl(priceId);
      window.location.assign(checkoutUrl);
      setLoading(false);
    } catch (error: any) {
      console.error("Error upgrading to premium: ", error);
      alert(error.message);
    }
  };

  // handle manage subscription function
  const manageSubscription = async () => {
    try {
      const portalUrl = await getPortalUrl();
      window.location.assign(portalUrl);
      setLoading(false);
    } catch (error: any) {
      console.error("Error upgrading to premium: ", error);
      alert(error.message);
    }
  };

  const BtnText = isPremium
    ? "Modifică abonamentul"
    : "Actualizează la Premium";

  const btnFunction = isPremium ? manageSubscription : upgradeToPremium;

  return (
    <button
      className={styleClass}
      type="button"
      onClick={async () => {
        setLoading(true);
        await btnFunction();
      }}
    >
      {BtnText}
    </button>
  );
};

export default SubscriptionButton;
