const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
const fs = require("fs");
// const path = require("path");

// current_dir = process.cwd();
// dotenv.config({path: path.join(current_dir, "..", "..", "..", "/.env")});

const path = "./.env";
if (fs.existsSync(path)) {
    dotenv.config();
} 
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

function searchForText(index=index, searchText) {
    return new Promise(resolve => {
        index.search(searchText).then((objects) => {
            resolve({
                "body": objects.hits,
                "statusCode": 200
            });
        })
    })
}

async function main(args){
    let searchText = args.search;
    try {
        const result = await searchForText(index, searchText);
        return result;
    } catch (e) {
        console.error(e);
        return {
            "body": {"error": "There was a problem searching for "},
            "statusCode": 500
        };
    }
}

module.exports.main = main;