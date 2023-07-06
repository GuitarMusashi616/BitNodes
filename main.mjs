import {moneyGainRate, serverCost, upgradeLevel, upgradeRam, upgradeCore} from "./ns.mjs"

class Server {
    constructor(level, ram, core) {
        this.level = level;
        this.ram = ram;
        this.core = core;
    }

    upgrade(upgradeType) {
        if (upgradeType === 'level') {
            this.level += 1;
        } else if (upgradeType === 'ram') {
            this.ram += 1;
        } else if (upgradeType === 'core') {
            this.core += 1;
        }
    }
}

let servers = [];

function calculateROI(cost, gain) {
    return gain / cost;
}

function chooseBestInvestment(servers) {
    let newServerCost = serverCost(servers.length);
    let newServerGain = moneyGainRate(1, 1, 1);

    let bestROI = calculateROI(newServerCost, newServerGain);
    let bestAction = ['buy', newServerCost, null];

    let upgradeCost, newGain;

    servers.forEach((server, index) => {
        ['level', 'ram', 'core'].forEach(upgradeType => {
            if (upgradeType === 'level') {
                upgradeCost = upgradeLevel(server.level);
                newGain = moneyGainRate(server.level + 1, server.ram, server.core);
            } else if (upgradeType === 'ram') {
                upgradeCost = upgradeRam(server.ram);
                newGain = moneyGainRate(server.level, server.ram + 1, server.core);
            } else { // upgradeType === 'core'
                upgradeCost = upgradeCore(server.core);
                newGain = moneyGainRate(server.level, server.ram, server.core + 1);
            }
            
            let roi = calculateROI(upgradeCost, newGain - moneyGainRate(server.level, server.ram, server.core));

            if (roi > bestROI) {
                bestROI = roi;
                bestAction = [upgradeType, upgradeCost, index];
            }
        });
    });

    display(bestAction, newServerGain, newGain)
    return bestAction;
}

function display(bestAction, newServerGain, newGain) {
    let [action, cost, serverIndex] = bestAction;

    if (action === "buy") {
        console.log(`buying server for ${cost} with a gain of $${newServerGain}/sec with an ROI of ${(newServerGain/cost)*100}%`);
        return;
    }

    console.log(`upgrading ${action} for ${cost} with a gain of $${newGain}/sec with an ROI of ${(newGain/cost)*100}%`)
}

function invest(budget, servers) {
    while (true) {
        let [action, cost, serverIndex] = chooseBestInvestment(servers);
        if (cost > budget) {
            break;
        }

        budget -= cost;
        if (action === 'buy') {
            servers.push(new Server(1, 1, 1));
        } else { // upgrade
            servers[serverIndex].upgrade(action);
        }
    }

    return {servers, budget};
}

function main() {
    // replace with your initial budget
    let budget = 100000;
    let result = invest(budget, servers);
    console.log(`Remaining budget: ${result.budget}`);
    result.servers.forEach((server, i) => {
        console.log(`Server ${i+1} stats: Level ${server.level}, RAM ${server.ram}, Core ${server.core}`);
    });
}

main()
