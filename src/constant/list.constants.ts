const LIMIT_LIST = [
	{ label: "8", value: 8 },
	{ label: "12", value: 12 },
	{ label: "16", value: 16 },
];

const DELAY = 1000;
const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = LIMIT_LIST[0].value;
const LIMIT_BANNER = 5;
const LIMIT_EVENT = 4;
const LIMIT_CATEGORY = 8;

export enum CONDITION {
	GOOD = "Baik",
	FAIR = "Kurang Baik",
	DAMAGED = "Rusak Berat",
}

export { LIMIT_LIST, DELAY, PAGE_DEFAULT, LIMIT_DEFAULT, LIMIT_BANNER, LIMIT_EVENT, LIMIT_CATEGORY };
