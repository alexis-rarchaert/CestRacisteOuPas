const natural = require('natural');
const express = require('express');
const fs = require('fs');

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

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
