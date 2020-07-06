# Graph Visualisation

Vue.js tree graph visualiser that uses Express.js backend with Neo4j database

## Backend Installation

- Create Neo4j database with

```
docker run \
    -p 7474:7474 -p 7687:7687 \
    --name graphdb \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    -e NEO4J_AUTH=neo4j/test \
    -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    -e NEO4JLABS_PLUGINS=\[\"apoc\"\] \
    -d \
    neo4j:4.0
```

- Run `npm install` in backend folder of the project
- Run `npm migrate` to add data to database
- Start the server with `npm run start`

## Frontend Installation

- Run `npm install` in frontend folder of the project
- Start sever with `npm run serve`

## Usage

- Open http://localhost:8080/ in your browser
- You see a tree of nodes:

<img width="581" alt="Screenshot 2020-07-07 at 01 33 59" src="https://user-images.githubusercontent.com/42918058/86667704-2ca19800-bff2-11ea-8008-1e7c2de6e84e.png">

- Click a node to see its details 
- Click 'x' to close the details
