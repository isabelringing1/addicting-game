import { useState } from "react";
import CardPack from "./CardPack";
import PackShopEntry from "./PackShopEntry";
import Timer from "./Timer";

import packData from "./json/packs.json";

export default function PackShop(props) {
  const {
    packShopState,
    packShopEntriesUnlocked,
    setPackShopEntriesUnlocked,
    openPack,
    bigNumberQueue,
    cardShopEntries,
    setShopEntries,
    setDiamonds,
    setShowDiamonds,
    diamonds,
    unlockShopEntry,
    generatePackShopEntry,
  } = props;
  const [currentPack, setCurrentPack] = useState(null);

  const UNLOCK_ENTRY_COST = 200;
  const REFRESH_ENTRY_BASE_COST = 200;

  const buyPack = (shopEntry) => {
    var pack = packData.packs[shopEntry.id];
    setDiamonds(diamonds - pack.cost);
    setShowDiamonds(diamonds - pack.cost);
    setCurrentPack(packData.packs[shopEntry.id]);
    var newShopEntries = [...cardShopEntries];

    for (var i = 0; i < cardShopEntries.length; i++) {
      if (
        cardShopEntries[i] &&
        cardShopEntries[i].id == shopEntry.id &&
        cardShopEntries[i].creation == shopEntry.creation
      ) {
        newShopEntries[i] = {
          nextRefreshTime: Date.now() + 60000,
        };
        break;
      }
    }

    setShopEntries(newShopEntries);

    setTimeout(() => {
      var container = document.getElementById("card-pack-container");
      container.classList.add("bounce-in");
    }, 100);

    setTimeout(() => {
      var container = document.getElementById("card-pack-container");
      container.classList.remove("bounce-in");
      container.style.transform = "translateY(0px)";
    }, 750);
  };

  const trashPack = (shopEntry) => {
    var newShopEntries = [...cardShopEntries];
    for (var i = 0; i < cardShopEntries.length; i++) {
      if (
        cardShopEntries[i] &&
        cardShopEntries[i].id == shopEntry.id &&
        cardShopEntries[i].creation == shopEntry.creation
      ) {
        newShopEntries[i] = {
          nextRefreshTime: Date.now() + 60000,
        };
        break;
      }
    }
    setShopEntries(newShopEntries);
  };

  const hidePack = () => {
    var container = document.getElementById("card-pack-container");
    container.classList.add("bounce-out");

    setTimeout(() => {
      container.classList.remove("bounce-out");
      container.style.transform = "translateY(100vh)";
      setCurrentPack(null);
    }, 750);
  };

  const canUnlockShopEntry = () => {
    return diamonds >= UNLOCK_ENTRY_COST;
  };

  const canBuyRefreshEntry = (entry) => {
    return diamonds > getRefreshEntryCost(entry);
  };

  const getRefreshEntryCost = (entry) => {
    return REFRESH_ENTRY_BASE_COST; // todo - implement scaling logic
  };

  return (
    <div className="pack-shop-container">
      {currentPack && (
        <CardPack
          pack={currentPack}
          openPack={openPack}
          hidePack={hidePack}
          bigNumberQueue={bigNumberQueue}
        />
      )}

      <div className="pack-shop">
        <div className="shop-title">PACK SHOP</div>
        <div className="pack-shop-packs">
          {cardShopEntries.map((shopEntry, i) => {
            return packShopEntriesUnlocked[i] && shopEntry ? (
              shopEntry.nextRefreshTime ? (
                <div
                  key={"pack-shop-pack-" + i}
                  className="locked-entry pack-shop-entry blank"
                >
                  <div className="pack-shop-entry-locked">
                    New Pack in{" "}
                    <Timer
                      endTime={shopEntry.nextRefreshTime}
                      onTimerEnd={() => generatePackShopEntry(1, [i])}
                    />
                  </div>
                  <div className="pack-shop-entry-unlock-button-container">
                    Refresh Early
                    <br />
                    <button
                      onClick={() => {
                        if (canBuyRefreshEntry(shopEntry)) {
                          generatePackShopEntry(1, [i]);
                        }
                      }}
                      className="pack-shop-entry-unlock-button"
                      disabled={!canBuyRefreshEntry(shopEntry)}
                    >
                      ♦ {getRefreshEntryCost()}
                    </button>
                  </div>
                </div>
              ) : (
                <PackShopEntry
                  buyPack={buyPack}
                  shopEntry={shopEntry}
                  pack={packData.packs[shopEntry.id]}
                  key={"pack-shop-pack-" + i}
                  diamonds={diamonds}
                  trashPack={trashPack}
                />
              )
            ) : (
              <div
                className="locked-entry pack-shop-entry"
                key={"pack-shop-pack-" + i}
              >
                <div className="pack-shop-entry-locked">LOCKED</div>
                <div className="pack-shop-entry-unlock-button-container">
                  <button
                    onClick={() => unlockShopEntry(i)}
                    className="pack-shop-entry-unlock-button"
                    disabled={!canUnlockShopEntry(i)}
                  >
                    ♦ {UNLOCK_ENTRY_COST}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
