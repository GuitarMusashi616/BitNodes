import math

SERVER_COST_MULT = 1.85
SERVER_BASE_COST = 30000
SERVER_MAX = 100

LEVEL_BASE_COST = 1000
LEVEL_COST_MULT = 1.2
LEVEL_MAX = 30

RAM_BASE_COST = 10000
RAM_COST_MULT = 2.85
RAM_MAX = 64

CORE_BASE_COST = 5000
CORE_COST_MULT = 1.5
CORE_MAX = 24

def serverCost(numServers: int):
    if numServers >= SERVER_MAX:
        return math.inf
    return SERVER_BASE_COST * SERVER_COST_MULT ** numServers

def upgradeCost(numLevels: int):
    if numLevels >= LEVEL_MAX:
        return math.inf
    return LEVEL_BASE_COST * LEVEL_COST_MULT ** numLevels

def upgradeRam(numRam: int):
    if numRam >= RAM_MAX:
        return math.inf
    return RAM_BASE_COST * RAM_COST_MULT ** numRam

def upgradeCore(numCore: int):
    if numCore >= CORE_MAX:
        return math.inf
    return CORE_BASE_COST * CORE_COST_MULT ** numCore

def moneyGainRate(levels: int, ram: int, cores: int):
    return (levels * 100 * ram * cores)