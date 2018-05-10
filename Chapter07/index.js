function div() {
    console.log('---------------------');
}

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from)
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        //if we can't travel from place to destination return, not a valid move
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                //parcels to pick up
                if (p.place != this.place) return p;
                //picked up parcels travel with a robot
                return {
                    place: destination,
                    address: p.address
                };
                //filter out delivered parcels
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    'Post Office', [{
        place: 'Post Office',
        address: "Alice's House"
    }]
);
let next = first.move("Alice's House");

console.log(next.place);

console.log(next.parcels);

console.log(first.place)
//
//memory is really a list of planned steps where robot will move.
//robot is a function that takes VillageState object and returns the name of a nearby place
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        
        
        //count number of moves and stop when all parcels are delivered
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        // returns direction robot wants to move and rest of the planned steps
        let action = robot(state, memory);
        //move robot in direction
        state = state.move(action.direction);
        
        memory = action.memory;//update memory
        console.log(`Moved to ${action.direction}`);

    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {
        direction: randomPick(roadGraph[state.place])
    }
}
//generate 5 random parcels by default
VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let place;
        let address = randomPick(Object.keys(roadGraph))
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address)
        parcels.push({
            place,
            address
        })
    }
    return new VillageState("Post Office", parcels)
}

// const par = VillageState.random.parcels;
// console.log(par);



const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

//returns next address for robot and rest of addresses for the route
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {
        direction: memory[0],
        memory: memory.slice(1)
    }
}

//runRobot(new VillageState.random, routeRobot, [])

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if(place == to) return route.concat(place);
            if(!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place)});
            }
        }
    }
}


// {place,  parcels}
function goalOrientedRobot({place, parcels}, route)