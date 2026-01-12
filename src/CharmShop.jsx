import CharmShopEntry from "./CharmShopEntry";
import { getCharmById } from "./Util";

export default function CharmShop(props) {
  const {
    diamonds,
    setDiamonds,
    setShowDiamonds,
    setTimeMultiplier,
    maxHearts,
    setMaxHearts,
    hearts,
    setHearts,
    purchasedCharms,
    setPurchasedCharms,
    charmShopEntries,
    generateCharmShopEntry,
  } = props;

  const buyCharm = (shopEntry, index = 0) => {
    setDiamonds(diamonds - shopEntry.cost);
    setShowDiamonds(diamonds - shopEntry.cost);
    var newPurchasedCharms = [...purchasedCharms, shopEntry.id];
    console.log("bought " + shopEntry.id);
    console.log(shopEntry, shopEntry.category);
    if (shopEntry.category == "speed-up") {
      setTimeMultiplier(shopEntry.new_time_multiplier);
    } else if (shopEntry.category == "heart-upgrade") {
      setMaxHearts(maxHearts + shopEntry.heart_upgrade);
      setHearts(hearts + shopEntry.heart_upgrade);
    }
    generateCharmShopEntry([index], newPurchasedCharms);
    setPurchasedCharms(newPurchasedCharms);
  };

  return (
    <div className="charm-shop-container">
      <div className="charm-shop">
        <div className="shop-title">CHARM SHOP</div>
        <div className="charm-shop-entries">
          {charmShopEntries.map((id, i) => {
            var charm = getCharmById(id);
            return charm ? (
              <CharmShopEntry
                index={i}
                key={"charm-shop-entry-" + i}
                shopEntry={charm}
                buyCharm={buyCharm}
                diamonds={diamonds}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
