from ns import moneyGainRate, serverCost, upgradeCore, upgradeCost, upgradeRam


class Server:
    def __init__(self, level, ram, core):
        self.level = level
        self.ram = ram
        self.core = core

    def upgrade(self, upgrade_type):
        if upgrade_type == 'level':
            self.level += 1
        elif upgrade_type == 'ram':
            self.ram += 1
        elif upgrade_type == 'core':
            self.core += 1

# replace the list of servers with your own
servers = [] 

def calculate_roi(cost, gain):
    return gain / cost

def choose_best_investment(servers):
    new_server_cost = serverCost(len(servers))
    new_server_gain = moneyGainRate(1,1,1)

    new_server_roi = calculate_roi(new_server_cost, new_server_gain)

    best_roi = new_server_roi
    best_action = ('buy', new_server_cost, None)

    upgrade_cost = None
    new_gain = None
    roi = None

    for server in servers:
        for upgrade_type in ['level', 'ram', 'core']:
            if upgrade_type == 'level':
                upgrade_cost = upgradeCost(server.level)
                new_gain = moneyGainRate(server.level + 1, server.ram, server.core)
            elif upgrade_type == 'ram':
                upgrade_cost = upgradeRam(server.ram)
                new_gain = moneyGainRate(server.level, server.ram + 1, server.core)
            else: # upgrade_type == 'core'
                upgrade_cost = upgradeCore(server.core)
                new_gain = moneyGainRate(server.level, server.ram, server.core + 1)
            
            roi = calculate_roi(upgrade_cost, new_gain - moneyGainRate(server.level, server.ram, server.core))

            if roi > best_roi:
                best_roi = roi
                best_action = (upgrade_type, upgrade_cost, server)

    display(best_action, new_server_gain, new_server_roi, new_gain, roi)
    return best_action


def display(best_action, new_server_gain, new_server_roi, new_gain, roi):
    action, cost, server = best_action
    if action == "buy":
        print(f"buying server for {cost} with a gain of ${new_server_gain}/sec with an ROI of {new_server_roi*100}%")
        return

    print(f"upgrading {action} for {cost} with a gain of ${new_gain}/sec with an ROI of {roi*100}%")


def invest(budget, servers):
    while True:
        action, cost, server = choose_best_investment(servers)
        if cost > budget:
            break

        budget -= cost
        if action == 'buy':
            servers.append(Server(1,1,1))
        else: # upgrade
            server.upgrade(action)

    return servers, budget

if __name__ == "__main__":
    # replace budget with your initial budget
    budget = 100000
    servers, remaining_budget = invest(budget, servers)
    print(f"Remaining budget: {remaining_budget}")
    for i, server in enumerate(servers):
        print(f"Server {i+1} stats: Level {server.level}, RAM {server.ram}, Core {server.core}")

