import { get } from "svelte/store";
import { getRes } from "../../assets/image";
import { makeGrabbableEquip, makeGrabbableProp } from "./equip";
import { maxWater, waterCount } from "./pot";
import { addProps, attachedTag } from "./prop";

export function makeBucket() {
  const justBucket = makeGrabbableEquip(
    getRes("prop_houseprop"),
    [326, 454, 20, 21],
    [0, 3, 30, 30],
    {},
    {
      onWheelUp: () => {
        if (attachedTag("pond")) {
          return waterBucket;
        }
        return true;
      }
    }
  );
  const waterBucket = makeGrabbableEquip(
    getRes("prop_houseprop"),
    [294, 454, 20, 21],
    [0, 3, 30, 30],
    {},
    {
      onWheelDown: () => {
        if (attachedTag("pot")) {
          waterCount.set(Math.min(maxWater, get(waterCount) + 1));
          return justBucket;
        }
        return true;
      }
    }
  );
  const bucketProp = makeGrabbableProp(
    getRes("prop_houseprop"),
    [326, 454, 20, 21],
    [210, 180, 30, 30],
    [0, 3, 30, 30],
    {},
    {
      onWheelUp: (state) => {
        if (attachedTag("pond")) {
          return waterBucket;
        }
        return true;
      }
    }
  );
  addProps(bucketProp);
}