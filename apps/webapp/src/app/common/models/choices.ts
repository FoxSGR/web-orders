import { WOItemMap } from '../wo-common.types';

const shoeSizeMin = 345;
const shoeSizeMax = 500;

export const shoeSizeChoices: WOItemMap = {};
for (let i = shoeSizeMin; i <= shoeSizeMax; i += 5) {
  shoeSizeChoices[i / 10] = {
    label: (i / 10).toString(10),
  };
}
