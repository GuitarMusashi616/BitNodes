const SERVER_COST_MULT = 1.85;
const SERVER_BASE_COST = 30000;
const SERVER_MAX = 100;

const LEVEL_BASE_COST = 1000;
const LEVEL_COST_MULT = 1.2;
const LEVEL_MAX = 30;

const RAM_BASE_COST = 10000;
const RAM_COST_MULT = 2.85;
const RAM_MAX = 64;

const CORE_BASE_COST = 5000;
const CORE_COST_MULT = 1.5;
const CORE_MAX = 24;

export function serverCost(numServers) {
    if (numServers >= SERVER_MAX) {
        return Infinity;
    }
    return SERVER_BASE_COST * Math.pow(SERVER_COST_MULT, numServers);
}

export function upgradeLevel(numLevels) {
    if (numLevels >= LEVEL_MAX) {
        return Infinity;
    }
    return LEVEL_BASE_COST * Math.pow(LEVEL_COST_MULT, numLevels);
}

export function upgradeRam(numRam) {
    if (numRam >= RAM_MAX) {
        return Infinity;
    }
    return RAM_BASE_COST * Math.pow(RAM_COST_MULT, numRam);
}

export function upgradeCore(numCore) {
    if (numCore >= CORE_MAX) {
        return Infinity;
    }
    return CORE_BASE_COST * Math.pow(CORE_COST_MULT, numCore);
}

export function moneyGainRate(levels, ram, cores) {
    return (levels * 100 * ram * cores);
}