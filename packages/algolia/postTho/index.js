const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

function searchForText(index=index, searchText) {
    return new Promise(resolve => {
        index.search(searchText, {
            getRankingInfo: true,
            advancedSyntax: true
        }).then((objects) => {
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