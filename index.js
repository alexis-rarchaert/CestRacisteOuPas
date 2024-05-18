const natural = require('natural');
const express = require('express');
const fs = require('node:fs');

const app = express();
const classifier = new natural.BayesClassifier();

const documents = JSON.parse(fs.readFileSync('db.json', 'utf8'));

for (const category in documents) {
    documents[category].forEach(doc => {
        classifier.addDocument(doc, category);
    });
}

classifier.train();

app.get('/getSentiment/:text', (req, res) => {
    const text = req.params.text;
    const classification = classifier.classify(text);

    let rep = {
        text: text,
        classification: classification
    }

    res.send(rep);
});

let doc = {
    "message": "Bienvenue sur une API de classification de termes",
    "author": {
        "name": "Alexis RARCHAERT",
        "email": "bonjour@alexis-rarchaert.fr",
        "website": "https://alexis-rarchaert.fr",
        "contributors": [
            {
                "name": "firminunderscore",
                "github": "https://github.com/firminunderscore"
            }
        ]
    },
    "version": "1.0.1",
    "data": {
        "dynamic": [
            {
                "name": "getSentiment",
                "description": "Permet de classifier (raciste ou non)",
                "method": "GET",
                "endpoint": "/getSentiment/:text",
            }
        ]
    }
}

app.get('/', (req, res) => {
    res.send(doc);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});